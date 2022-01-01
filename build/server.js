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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const PostsRoutes_1 = __importDefault(require("./routes/PostsRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            const URI = 'mongodb://localhost/API-REST';
            mongoose_1.default.connect(URI, function (error) {
                // if error is truthy, the initial connection failes
                console.log(error);
            });
            //settings
            this.app.set('port', process.env.PORT || 3001);
            //Midlewares
            this.app.use((0, morgan_1.default)('dev'));
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: false }));
            this.app.use((0, helmet_1.default)());
            this.app.use((0, compression_1.default)());
            this.app.use((0, cors_1.default)());
        });
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/posts', PostsRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("server on port 3001", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
