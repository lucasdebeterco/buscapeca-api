import express from 'express'
import { load } from 'cheerio'
import cors from 'cors'
import { IProduct } from '../types/Product.types'
import { slugify } from '../utils/slugify'
import fs from 'fs'

const file = fs.readFileSync('./E38BE8D6275B3E0CF1C0F00D0EEA1595.txt')

const { Builder, Browser } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const app = express();
app.use(cors())
app.options('*', cors());

app.get('/products', async function(req, res) {
    const method  = req.method
    const searchItem = req.query.searchItem && req.query.searchItem.toString()
    const products: IProduct[] = []

    const kabumUrl = `https://www.kabum.com.br/busca/${slugify(searchItem ? searchItem : '')}`
    const pichauUrl = `https://www.pichau.com.br/search?q=${slugify(searchItem ? searchItem : '')}`
    const gkUrl = `https://www.gkinfostore.com.br/buscar?q=${slugify(searchItem ? searchItem : '')}`

    await getProducts(
        kabumUrl,
        '.productCard',
        '.imageCard',
        '.nameCard',
        '.priceCard',
        1
    )

    await getProducts(
        gkUrl,
        '.listagem-item',
        '.imagem-produto > img:first-child',
        'a.nome-produto',
        '.desconto-a-vista',
        3
    )

    await getProducts(
        pichauUrl,
        'a[data-cy="list-product"]',
        '.MuiPaper-root > div > div > div > img',
        'h2.MuiTypography-root',
        '.MuiCardContent-root > div > div:nth-child(1) > div > div:nth-child(3)',
        2
    )

    products.sort((a: IProduct, b: IProduct) => parseFloat(a.price.split('R$ ')[1]) > parseFloat(b.price.split('R$ ')[1]) ? 1: -1)
    res.header("Access-Control-Allow-Origin", "*")
    res.send(products)

    async function getProducts(
        searchUrl: any,
        selector: string,
        imageSelector:string,
        titleSelector: string,
        priceSelector: string,
        idLoja: number
    ) {
        let options = new firefox.Options();
        options.addArguments("-headless");
        options.binary_location = '/firefox/firefox-bin'

        let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();

        try {
            await driver.get(searchUrl);

            await driver.getPageSource().then((html: any) => {
                const $ = load(html)

                $(selector).each((i, el) => {
                    const image = $(imageSelector, el).attr('src')
                    const title = $(titleSelector, el).text()
                    const price = $(priceSelector, el).text()
                    const link = 'https://www.kabum.com.br' + $('> a',el).attr('href')

                    products.push({
                        lojaId: idLoja, image, title, price, link
                    })
                })
            })
        } finally {
            await driver.quit();
        }
    }
});

app.get('/.well-known/pki-validation/E38BE8D6275B3E0CF1C0F00D0EEA1595.txt', (req, res) => {
    res.sendFile('/home/node/app/E38BE8D6275B3E0CF1C0F00D0EEA1595.txt')
})

app.get('/test', (req, res) => {
    res.send('working!')
})

app.listen(3000);