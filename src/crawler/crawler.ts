import { load } from 'cheerio'
import { IProduct } from '../../types/Product.types'

const { Builder, Browser } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')

export async function getProducts(
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
    let products: IProduct[]  = []

    try {
        await driver.get(searchUrl);

        await driver.getPageSource().then((html: any) => {
            const $ = load(html)

            $(selector).each((i, el) => {
                const image = $(imageSelector, el).attr('src')
                const title = $(titleSelector, el).text()
                const price = $(priceSelector, el).text()
                const link = String($('> a',el).attr('href'))

                if(price !== null) {
                    products.push({
                        lojaId: idLoja, image, title, price, link
                    })
                }
            })
        })
    } finally {
        await driver.quit();

        return products
    }
}