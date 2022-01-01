import { Request, Response, Router } from 'express';
import { url } from 'inspector';
import { title } from 'process';
import Posts from '../models/Posts';
import PostSchema from '../models/Posts'

class PostRoutes {
    router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    async getPosts(req: Request, res: Response) {
        const posts = await PostSchema.find();
        res.json(posts);
    }

    async getPost() {

    }

    async createPost(req: Request, res: Response) {
        const {title, url, content, Image} = req.body;
        const newPost = new Posts({title, url, content, Image});
        await newPost.save();
        res.json({data: newPost});
    }

    async updatePost() {

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
export default postRoutes.router;