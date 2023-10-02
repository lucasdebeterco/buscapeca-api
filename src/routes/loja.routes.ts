import { create } from '../controllers/loja.controller'

const lojaRoutes = (app: any) => {
    app.get('/novaLoja', create)
}

export default lojaRoutes