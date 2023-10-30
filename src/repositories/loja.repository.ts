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

export const incrementRating = async (rating: number, loja: number) => {
    await prisma.loja.update({
        where: {
            id: loja,
        },

        data: {
            ratingCount: {increment: 1},
            rating: {increment: rating}
        }
    })
}