import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

import { load } from 'cheerio'
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
    const method  = req.method
    const searchItem = req.query.searchItem && req.query.searchItem.toString()
    const products: IProduct[] = []

    const promisses = lojaData.map(async (loja) => {
        return await getProducts(
            loja.url + slugify(searchItem ? searchItem : ''),
            loja.cardSelector,
            loja.imageSelector,
            loja.nameSelector,
            loja.priceSelector,
            loja.id,
            loja.lojaHost
        )
    })

    res.header("Access-Control-Allow-Origin", "*")

    Promise.all(promisses).then((promissesResult) => {
        promissesResult.map((targetResults) => targetResults.map(targetResult => {
            products.push(targetResult)
        }))

        products.sort((a: IProduct, b: IProduct) => a.price > b.price ? 1: -1)
        res.send(products)
    })
});

routes(app)

app.listen(3000);