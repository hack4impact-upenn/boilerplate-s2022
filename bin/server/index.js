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
const createServer_1 = __importDefault(require("./config/createServer"));
const database_1 = __importDefault(require("./config/database"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const user_router_1 = require("./routers/user.router");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // listen for termination
    process.on('SIGTERM', () => process.exit());
    yield database_1.default.open();
    // creater server on designated port
    const app = (0, createServer_1.default)();
    app.listen(app.get('port'), () => {
        console.log(`Listening on port ${app.get('port')} 🚀`);
        console.log('  Press Control-C to stop\n');
    });
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(passport_1.default.initialize());
    app.use(user_router_1.userRouter);
    const port = process.env.PORT || 8000;
    app.get('/', (req, res) => {
        res.json({
            message: "Node Cookie JWT Service"
        });
    });
});
let a = 2;
// instantiate app
main();
