import * as yup from "yup";
import { prisma } from "../database/prismaClient";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";

class SessionService {
    async create(email: string, password: string) {
        const schema = yup.object().shape({
            email: yup.string().email("Email is not valid").required("Email is required"),
            password: yup.string().required("Password is required")
        });

        await schema.validate({ email, password });

        const user = await prisma.user.findUnique({ where: { email }});

        if (!user || !(compareSync(password, user.password))) {
            throw new Error("Password or email incorrect");
        }

        const token = jwt.sign(
            {id: user.id, name: user.name, email: user.email},
            process.env.TOKEN_SECRET as string,
            { expiresIn: 60 * 60 * 24 * 30 }
        );

        return token;
    }
}

export { SessionService }