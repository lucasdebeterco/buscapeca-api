import { findLojas, incrementRating, deleteLojaQuery } from '../repositories/loja.repository'

export const getLojas = async (req: any, res: any) => {
    try {
        const loja = await findLojas()
        res.status(200).send(loja)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const deleteLoja = async (req: any, res: any) => {
    try {
        await deleteLojaQuery(req.body.loja)
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
}

export const addRating = async (req: any, res: any) => {
    try {
        await incrementRating(req.body.loja)
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
}