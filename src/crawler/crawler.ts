import { load } from 'cheerio'
import { IProduct } from '../../types/Product.types'
const scrollToBottom = require("scroll-to-bottomjs")

const { Builder, Browser, JavascriptExecutor } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')

export async function getProducts(
    searchUrl: any,
    selector: string,
    imageSelector:string,
    titleSelector: string,
    priceSelector: string,
    idLoja: number,
    lojaHost: string
) {
    let options = new firefox.Options();
    options.addArguments("-headless");
    options.binary_location = '/firefox/firefox-bin'

    let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    let products: IProduct[]  = []

    try {
        await driver.get(searchUrl)

        // prevenção de lazyload nos targets
        await driver.sleep(1000);
        driver.executeScript("window.scroll({top: 2500, behavior: 'smooth'});")
        await driver.sleep(1000);
        driver.executeScript("window.scroll({top: 5000, behavior: 'smooth'});")
        await driver.sleep(2000);

        await driver.getPageSource().then((html: any) => {
            const $ = load(html)

            $(selector).each((i, el) => {
                const image = $(imageSelector, el).attr('src')
                const title = $(titleSelector, el).text()
                const price = parseFloat($(priceSelector, el).text().split('R$')[1].split('via Pix')[0])
                const link =  lojaHost + String($('> a',el).attr('href'))

                if(price) {
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