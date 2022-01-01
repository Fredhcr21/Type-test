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
const express_1 = require("express");
const Posts_1 = __importDefault(require("../models/Posts"));
const Posts_2 = __importDefault(require("../models/Posts"));
class PostRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Posts_2.default.find();
            res.json(posts);
        });
    }
    getPost() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, url, content, Image } = req.body;
            const newPost = new Posts_1.default({ title, url, content, Image });
            yield newPost.save();
            res.json({ data: newPost });
        });
    }
    updatePost() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    deletePost() {
    }
    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}
const postRoutes = new PostRoutes();
exports.default = postRoutes.router;
