import { prisma } from "../database/prismaClient";

class UserService {
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { id: true, name: true, email: true, cpf: true }
        });

        return user;
    }

    async create(name: string, cpf: string, email: string, password: string, imageUrl?: string) {
        const user = await prisma.user.create({
            data: { name, cpf, imageUrl, email, password }
        });
        
        return user;
    }

    async update(id: string, name?: string, email?: string, password?: string, imageUrl?: string) {
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

export {UserService};