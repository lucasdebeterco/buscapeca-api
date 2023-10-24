import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

import { load } from 'cheerio'
import { IProduct } from '../types/Product.types'
import { slugify } from '../utils/slugify'
import { getProducts } from './crawler/crawler'

dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())
app.options('*', cors());

app.get('/products', async function(req, res) {
    const method  = req.method
    const searchItem = req.query.searchItem && req.query.searchItem.toString()
    const products: IProduct[] = []

    lojaData.map(async (loja) => {
        products.concat(await getProducts(
            loja.url + slugify(searchItem ? searchItem : ''),
            loja.cardSelector,
            loja.imageSelector,
            loja.nameSelector,
            loja.priceSelector,
            loja.id
        ))
    })

    products.sort((a: IProduct, b: IProduct) => parseFloat(a.price.split('R$ ')[1]) > parseFloat(b.price.split('R$ ')[1]) ? 1: -1)
    res.header("Access-Control-Allow-Origin", "*")
    res.send(products)
});

routes(app)

app.listen(3000);