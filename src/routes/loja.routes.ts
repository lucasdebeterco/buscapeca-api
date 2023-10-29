import { getLojas, addRating, deleteLoja } from '../controllers/loja.controller'

const lojaRoutes = (app: any) => {
    app.get('/lojas', getLojas)

    app.delete('/deleteLoja', deleteLoja)

    app.put('/addRating', addRating)

    app.get('/test', (req: any, res: any) => {
        res.send('working!')
    })
}

export default lojaRoutes