"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = exports.GoogleUserSchema = exports.InternalUserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const GoogleUserSchema = new mongoose_1.default.Schema({
    googleId: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.GoogleUserSchema = GoogleUserSchema;
const InternalUserSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
exports.InternalUserSchema = InternalUserSchema;
const UserSchema = new mongoose_1.default.Schema({
    accountType: {
        type: String,
        required: true,
    },
    internalAccount: {
        type: InternalUserSchema,
    },
    googleAccount: {
        type: GoogleUserSchema,
    },
});
exports.UserSchema = UserSchema;
UserSchema.pre('validate', function (next) {
    console.log(this);
    if (this.accountType !== 'internal' || this.accountType !== 'google') {
        next(new Error('Account type is not internal or google.'));
    }
    if ((this.accountType === 'internal' && !this.internalAccount) ||
        (this.accountType === 'google' && !this.googleAccount)) {
        next(new Error('Account type must match account info provided.'));
    }
    else {
        next();
    }
});
const User = mongoose_1.default.model('User', UserSchema);
exports.User = User;
