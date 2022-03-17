"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login = (req, res, next) => {
    try {
        const { username, password } = req.body;
        let user = {
            username,
            password
        };
        if (username === process.env.USER) {
            if (password === process.env.PASSWORD) {
                res.locals.user = user;
                next();
            }
            else {
                res.status(400).json({
                    error: 'Incorrect username or password'
                });
            }
        }
        else {
            res.status(400).json({
                error: 'Incorrect username or password'
            });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
exports.default = login;
