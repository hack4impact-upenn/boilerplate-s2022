"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const createServer = () => {
    const app = (0, express_1.default)();
    // sets the port for the app
    app.set('port', process.env.PORT || 4000);
    // gives express the ability to parse requests with JSON and turn the JSON into objects
    app.use(express_1.default.json());
    // gives express the ability to parse urlencoded payloads
    app.use(express_1.default.urlencoded({
        extended: true,
    }));
    // gives express the ability accept origins outside its own to accept requests from
    app.use((0, cors_1.default)());
    // Serving static files
    if (process.env.NODE_ENV === 'production') {
        const root = path_1.default.join(__dirname, '..', 'client', 'build');
        app.use(express_1.default.static(root));
        app.get('*', (_, res) => {
            res.sendFile('index.html', { root });
        });
    }
    return app;
};
exports.default = createServer;
