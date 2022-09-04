import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async findByEmail(req: Request, res: Response) {
        const userService = new UserService();

        const {email} = req.params;

        try {
            const user = await userService.findByEmail(email);
            return res.json(user);            
        } catch (error) {
            return res.status(400).json({ message: "user cannot be find" });
        }
    }
    
    async create(req: Request, res: Response) {
        const userService = new UserService();
        
        const {name, cpf, imageUrl, email, password} = req.body;

        try {
            const user = await userService.create(name, cpf, email, password, imageUrl);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ message: "user cannot be created" });
        }
    }

    async update(req: Request, res: Response) {
        const userService = new UserService();
        
        const { name, imageUrl, email, password } = req.body;
        const { id } = req.params;

        try {
            const user = await userService.update(id, name, email, password, imageUrl);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ message: "user cannot be updated" });
        }
    }

    async delete(req: Request, res: Response) {
        const userService = new UserService();
        
        const { id } = req.params;

        try {
            const user = await userService.delete(id);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({ message: "user cannot be deleted" });
        }
    }
}

export { UserController };