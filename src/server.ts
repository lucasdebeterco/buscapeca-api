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


    await getProducts(
        lojaData[0].url,
        lojaData[0].cardSelector,
        lojaData[0].imageSelector,
        lojaData[0].nameSelector,
        lojaData[0].priceSelector,
        lojaData[0].id,
        lojaData[0].lojaHost
    ).then((productsResponse) => {
        productsResponse.map(product => {
            products.push(product)
        })
    })

    await getProducts(
        lojaData[1].url,
        lojaData[1].cardSelector,
        lojaData[1].imageSelector,
        lojaData[1].nameSelector,
        lojaData[1].priceSelector,
        lojaData[1].id,
        lojaData[1].lojaHost,
    ).then((productsResponse) => {
        productsResponse.map(product => {
            products.push(product)
        })
    })

    await getProducts(
        lojaData[2].url,
        lojaData[2].cardSelector,
        lojaData[2].imageSelector,
        lojaData[2].nameSelector,
        lojaData[2].priceSelector,
        lojaData[2].id,
        lojaData[2].lojaHost,
    ).then((productsResponse) => {
        productsResponse.map(product => {
            products.push(product)
        })
    })

    console.log(products)

    products.sort((a: IProduct, b: IProduct) => a.price > b.price ? 1: -1)

    res.send(products)
});

routes(app)

app.listen(3000);