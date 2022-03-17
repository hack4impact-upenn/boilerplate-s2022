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
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
/* uncomment for database logger */
// mongoose.set('debug', process.env.DEBUG !== 'production');
// options for the mongodb connection
const opts = {
    // keepAlive is a feature true by default in MongoDB which allows for long TCP connections which allows for long running applications.
    // keepAliveInitialDelay causes keepAlive to start after 300000 milliseconds to prevent excessive network traffic 
    keepAliveInitialDelay: 300000,
    // serverSelectionTimeoutMS sets the amount of time in milliseconds Mongoose will spend attempting to connect to a valid server.
    serverSelectionTimeoutMS: 5000,
    // socketTimeoutMS details how long mongoose will wait after opening a socket 
    // (which is more or less an indiviual network connection with with the database) before closing it due to inactivity.
    // This prevents sockets from remaining open during operations that take more than 45 seconds and hence prevents infinite loops and/or excessive connections.
    // This should be set to 2x-3x the slowest operation.
    socketTimeoutMS: 45000,
};
class MongoConnection {
    static getInstance() {
        if (!MongoConnection._instance) {
            MongoConnection._instance = new MongoConnection();
        }
        return MongoConnection._instance;
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // If the environment is test, create a new MongoDB server using mongodb-memory-server. This server allows us to store data in memory,
                // preventing database pollution with testing and allowing for quicktesting. If the environment is not test, we attempt to connect to the db.
                if (process.env.NODE_ENV === 'test') {
                    console.log('Connecting to In-Memory MongoDB');
                    this._mongoServer = new mongodb_memory_server_1.MongoMemoryServer();
                    const mongoUrl = yield this._mongoServer.getUri();
                    yield mongoose_1.default.connect(mongoUrl, opts);
                }
                else {
                    console.log('Connecting to MongoDB...');
                    // const uri = process.env.ATLAS_URI || 'mongodb+srv://NO:CONNECTION@STRING.FOUND.mongodb.net/FAILURE?retryWrites=true&w=majority';
                    const uri = 'mongodb+srv://hack4impact:boilerplate@cluster0.4jd7b.mongodb.net/Boilerplate?retryWrites=true&w=majority';
                    mongoose_1.default.connect(uri, opts).catch((e) => console.error(`Connection to MongoDB failed at: ${uri}. Please check your env file to ensure you have the correct link. ${e}`));
                }
                mongoose_1.default.connection.on('connected', () => {
                    console.log('MongoDB: Connected ✅');
                });
                mongoose_1.default.connection.on('disconnected', () => {
                    console.log('MongoDB: Disconnected 🛑');
                });
                mongoose_1.default.connection.on('error', (err) => {
                    console.log(`ERROR MongoDB:  ${String(err)}`);
                    if (err.name === 'MongoNetworkError') {
                        setTimeout(() => mongoose_1.default.connect(process.env.ATLAS_URI || 'mongodb://localhost:27017/myproject', opts), 5000);
                    }
                });
            }
            catch (err) {
                console.log(`ERROR db.open: ${err}`);
                throw err;
            }
        });
    }
    // close connection to db and 
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.disconnect();
                if (process.env.NODE_ENV === 'test') {
                    // ! at end indicates to typescript that mongoServer cannot be null or undefined
                    yield this._mongoServer.stop();
                }
            }
            catch (err) {
                console.log(`db.open: ${err}`);
                throw err;
            }
        });
    }
}
exports.default = MongoConnection.getInstance();
