import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

import { IProduct } from '../types/Product.types'
import { slugify } from '../utils/slugify'
import { getProducts } from './crawler/crawler'
import { lojaData } from './data/lojaData'

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())
app.options('*', cors());

app.get('/products', async function(req, res) {
    res.header("Access-Control-Allow-Origin", "*")
    const method  = req.method
    const searchItem = req.query.searchItem && req.query.searchItem.toString()
    const products: IProduct[] = []

    await Promise.all(lojaData.map(async (loja) => {
        await getProducts(
            loja.url + slugify(searchItem ? searchItem : ''),
            loja.cardSelector,
            loja.imageSelector,
            loja.nameSelector,
            loja.priceSelector,
            loja.id,
            loja.lojaHost
        ).then((productsResponse) => {
            productsResponse.map(res => {
                products.push(res)
            })
        })
    }))

    products.sort((a: IProduct, b: IProduct) => a.price > b.price ? 1: -1)

    res.send(products)
});

routes(app)

app.listen(3000);