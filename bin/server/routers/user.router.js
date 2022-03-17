"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const user_1 = require("../models/user");
const router = express_1.default.Router();
exports.userRouter = router;
const saltRounds = 10;
var expirationtimeInMs;
var secret;
process.env.JWT_EXPIRATION_TIME &&
    (expirationtimeInMs = process.env.JWT_EXPIRATION_TIME);
process.env.JWT_SECRET && (secret = process.env.JWT_SECRET);
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { password } = req.body;
    if (yield user_1.User.findOne({ email })) {
        res.status(400).send({
            success: false,
            message: `User with email: ${email} already has an account.`,
        });
    }
    // hash + salt password
    return (0, bcrypt_1.hash)(password, saltRounds, (err, hashedPassword) => {
        if (err) {
            res.status(400).send({
                success: false,
                message: err.message,
            });
        }
        console.log(hashedPassword);
        const newUser = new user_1.User({
            email,
            password: hashedPassword,
        });
        return newUser
            .save()
            .then(() => res.status(200).send({ success: true }))
            .catch((e) => res.status(400).send({ errorMessage: e }));
    });
}));
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/login' }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const { password } = req.body;
    let user;
    user_1.User.findOne({ email: email }, function (err, userObj) {
        if (err) {
            console.log(err);
            res.status(400).send({
                success: false,
                message: err.message,
            });
        }
        else if (userObj) {
            user = userObj;
            // ************************************************************
            return (0, bcrypt_1.compare)(password, user.internalAccount.password, (err, result) => {
                if (err) {
                    res.status(400).send({
                        success: false,
                        message: err.message,
                    });
                }
                if (result) {
                    // password matched
                    const payload = {
                        username: user,
                        expiration: Date.now() + parseInt(expirationtimeInMs),
                    };
                    secret = 'somethingrandom';
                    const token = jsonwebtoken_1.default.sign(JSON.stringify(payload), secret);
                    res
                        .cookie('jwt', token, {
                        httpOnly: true,
                        secure: false, //--> TODO: SET TO TRUE ON PRODUCTION
                    })
                        .status(200)
                        .json({
                        message: 'You have logged in :D',
                    });
                }
            });
            // ******************************************************************
        }
        else {
            res.status(400).send({
                success: false,
                message: `User with email ${email} not found.`,
            });
        }
    });
    console.log('user object found');
}));
router.get('/logout', (req, res) => {
    if (req.cookies['jwt']) {
        res.clearCookie('jwt').status(200).json({
            message: 'You have logged out',
        });
    }
    else {
        res.status(401).json({
            error: 'Invalid jwt',
        });
    }
});
router.get('/protected', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.send(200).json({
        message: 'welcome to the protected route!',
    });
});
