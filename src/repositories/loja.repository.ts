import { prisma } from '../services/prisma'

export const findLojas = async () => {
    const lojas = await prisma.loja.findMany()

    return lojas
}

export const deleteLojaQuery = async (loja: number) => {
    await prisma.loja.delete({
        where: {
            id: loja
        }
    })
}

export const incrementRating = async (loja: number) => {
    await prisma.loja.update({
        where: {
            id: loja,
        },
        data: {
            rating: { increment: 1 },
        },
    })
}