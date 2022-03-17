"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_1 = require("../models/user");
const JWTStrategy = passport_jwt_1.default.Strategy;
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new GoogleStrategy({
    clientID: '38852361546-bdnfn6p686a8mcp1v9ie4kjnnp95vr3p.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback',
}, function (accessToken, refreshToken, profile, callback) {
    user_1.User.findOne({ googleId: profile.id }, function (err, user) {
        return callback(err, user);
    });
}));
const secret = process.env.JWT_SECRET;
const cookieExtractor = (req) => {
    let jwt = null;
    if (req && req.cookies) {
        jwt = req.cookies['jwt'];
    }
    return jwt;
};
passport_1.default.use('jwt', new JWTStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: secret,
}, (jwtPayload, done) => {
    const { expiration } = jwtPayload;
    if (Date.now() > expiration) {
        done('Unauthorized', false);
    }
    done(null, jwtPayload);
}));
