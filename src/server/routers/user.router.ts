import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { User, IUser } from '../models/user';
import login from '../auth/login'

const router = express.Router();
var expirationtimeInMs: string;
var secret: string;
if (process.env.JWT_EXPIRATION_TIME) {
    expirationtimeInMs = process.env.JWT_EXPIRATION_TIME
}

if (process.env.JWT_SECRET) {
    secret = process.env.JWT_SECRET;
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;

    if (await User.findOne({ email })) {
        res.status(400).send({
            success: false,
            message: `User with email: ${email} already has an account.`
        });
    };

    const newUser = new User({
        email,
        password
    });

    return newUser
        .save()
        .then(() => res.status(200).send({ success: true }))
        .catch((e) => res.status(400).send({ errorMessage: e}));
});

router.post('/login',
    login,
    async (req, res) => {
        let user;

        if (res.locals.user) {
            user = res.locals.user;
        } else {
            res.status(400).json({
                error: 'user not found'
            });
        };

        const payload = {
            username: user.username,
            expiration: Date.now() + parseInt(expirationtimeInMs)
        };

        const token = jwt.sign(JSON.stringify(payload), secret);

        res
        .cookie('jwt',
            token, {
                httpOnly: true,
                secure: false //--> TODO: SET TO TRUE ON PRODUCTION
            }
        )
        .status(200)
        .json({
            message: 'You have logged in :D'
        });
    }
);

router.get('/logout', (req, res) => {
    if (req.cookies['jwt']) {
        res
        .clearCookie('jwt')
        .status(200)
        .json({
            message: 'You have logged out'
        })
    } else {
        res.status(401).json({
            error: 'Invalid jwt'
        })
    }
});

router.get('/protected', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.send(200).json({
            message: 'welcome to the protected route!'
        })
    }
);

export { router as userRouter }