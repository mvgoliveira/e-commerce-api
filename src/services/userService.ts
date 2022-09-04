import { prisma } from "../database/prismaClient";
import { hashSync } from "bcryptjs";
import * as yup from "yup";

class UserService {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, name: true, email: true, cpf: true }
        });

        return user;
    }

    async create(name: string, cpf: string, email: string, password: string, imageUrl?: string) {
        const schema = yup.object().shape({
            name: yup.string().required("Name is required"),
            cpf: yup.string().min(14, "CPF malformed").required("CPF is required"),
            email: yup.string().email("Email is not valid").required("Email is required"),
            password: yup.string().required("Password is required"),
            imageUrl: yup.string()
        });

        await schema.validate({ name, cpf, email, password, imageUrl });

        const passwordHash = hashSync(password, 10);
        
        const user = await prisma.user.create({
            data: { name, cpf, imageUrl, email, password: passwordHash }
        });
        
        return user;
    }

    async update(id: string, name?: string, email?: string, password?: string, imageUrl?: string) {
        const schema = yup.object().shape({
            name: yup.string(),
            email: yup.string(),
            password: yup.string(),
            imageUrl: yup.string()
        });

        await schema.validate({ name, email, password, imageUrl });
        
        const user = await prisma.user.update({
            where: { id },
            data: { name, email, password, imageUrl }
        })

        return user;
    }

    async delete(id: string) {
        const user = await prisma.user.delete({
            where: {id},
            select: { id: true, name: true, email: true, cpf: true }
        });
        return user;
    }
}

export { UserService };