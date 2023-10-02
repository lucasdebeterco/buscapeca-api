import { createLoja } from '../repositories/loja.repository'

export const create = async (req: any, res: any) => {
    try {
        const loja = await createLoja(req.body)
        res.status(200).send(loja)
    } catch (e) {
        res.status(400).send(e)
    }
}