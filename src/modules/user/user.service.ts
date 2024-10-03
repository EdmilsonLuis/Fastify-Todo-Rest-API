import { hashPassword } from "../../utils/hash";
import { CreateUserInput } from './user.schema';
import prisma from "../../utils/prisma";

export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input;
    const { hash, salt } = hashPassword(password)
    const user = await prisma.user.create({
        data: { ...rest, salt, password: hash }
    })

    return user;
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email }
    });
}

// not implemented
export async function findUsers() {
    return await prisma.user.findMany({
        select: {
            name: true,
            email: true,
            id: true
        }
    })
}

