export const lojaData = [
    {
        id: 1,
        name: 'kabum',
        url: 'https://www.kabum.com.br/busca/',
        cardSelector: '.productCard',
        imageSelector: '.imageCard',
        nameSelector: '.nameCard',
        priceSelector: '.priceCard',
        lojaHost: 'https://www.kabum.com.br'
    }, {
        id: 2,
        name: 'pichau',
        url: 'https://www.pichau.com.br/search?q=',
        cardSelector: 'a[data-cy="list-product"]',
        imageSelector: '.MuiPaper-root > div > div > div > img',
        nameSelector: 'h2.MuiTypography-root',
        priceSelector: '.MuiCardContent-root > div > div:nth-child(1) > div > div:nth-child(3)',
        lojaHost: 'https://www.pichau.com.br'
    }, {
        id: 3,
        name: 'gkInfostore',
        url: 'https://www.gkinfostore.com.br/buscar?q=',
        cardSelector: '.secao-principal .listagem-item',
        imageSelector: '.imagem-produto > img:first-child',
        nameSelector: 'a.nome-produto',
        priceSelector: '.desconto-a-vista',
        lojaHost: ''
    }
]