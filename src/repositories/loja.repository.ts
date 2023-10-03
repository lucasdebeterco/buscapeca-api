import { prisma } from '../services/prisma'

export const findLojas = async () => {
    const lojas = await prisma.loja.findMany()

    return lojas
}

export const incrementLike = async (loja: number) => {
    await prisma.loja.update({
        where: {
            id: loja,
        },
        data: {
            likes: { increment: 1 },
        },
    })
}