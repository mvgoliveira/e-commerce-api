import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface IUser {
    id: String
}

class AuthMiddleware {
    auth(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
    
        if (!authHeader) {
            return res.status(401).json({ error: "Token not provided" });
        }
    
        const parts = authHeader.split(' ');
    
        if (parts.length !== 2) {
            return res.status(401).json({ error: "Token invalid" });
        }
    
        const [ scheme, token ] = parts;
    
        if(!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: "Token malformed" });
        }
    
        jwt.verify(token, process.env.TOKEN_HASH as string, (error) => {
            if (error) {
                return res.status(401).json({ error: "Token invalid" });
            }
    
            return next();
        });
    }

    user(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        
        const authHeader = req.header('authorization');
    
        if (!authHeader) {
            return res.status(401).json({ error: "Token not provided" });
        }
    
        const parts = authHeader.split(' ');
    
        if (parts.length !== 2) {
            return res.status(401).json({ error: "Token invalid" });
        }
    
        const [ scheme, token ] = parts;
    
        if(!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: "Token malformed" });
        }
        
        try {
            const user: any = jwt.verify(token, process.env.TOKEN_SECRET as string);

            if (user.id !== id) {
                return res.status(401).json({ error: "User does not allowed" });
            }

            return next();
        } catch (error) {
            return res.status(401).json({ error: "Token invalid" })
        }
    }
}

export {AuthMiddleware}