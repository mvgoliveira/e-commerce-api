import { Request, Response } from "express";
import { SessionService } from "../services/sessionService";

class SessionController {
    async create(req: Request, res: Response) {
        const sessionService = new SessionService();
        const {email, password} = req.body; 

        try {
            const token = await sessionService.create(email, password);
            return res.json(token);            
        } catch (error: any) {
            return res.status(401).json({ message: error.message});
        }
    }
}

export { SessionController };