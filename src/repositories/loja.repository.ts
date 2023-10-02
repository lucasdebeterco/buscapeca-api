import { prisma } from '../services/prisma'

export const createLoja = async (data: any) => {
    console.log('data', data)
    const loja = await prisma.loja.create({
        data
    })

    return loja
}