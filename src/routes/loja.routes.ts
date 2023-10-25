import { getLojas, addRating } from '../controllers/loja.controller'

const lojaRoutes = (app: any) => {
    app.get('/lojas', getLojas)

    app.put('/addRating', addRating)

    app.get('/test', (req: any, res: any) => {
        res.send('working!')
    })
}

export default lojaRoutes