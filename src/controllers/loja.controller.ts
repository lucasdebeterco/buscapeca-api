import { findLojas, incrementLike } from '../repositories/loja.repository'

export const getLojas = async (req: any, res: any) => {
    try {
        const loja = await findLojas()
        res.status(200).send(loja)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const addLike = async (req: any, res: any) => {
    try {
        await incrementLike(req.body.loja)
        res.status(200).send()
    } catch (e) {
        res.status(400).send(e)
    }
}