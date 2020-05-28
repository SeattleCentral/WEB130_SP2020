import * as $ from 'jquery'

const api = 'https://api-us-west-2.graphcms.com/v2/ckag37xtg0gz801xl0w40eaa7/master'

export function getArticles() {
    $.post(api, JSON.stringify({
        operationName: 'GetArticles',
        query: `
        query GetArticles {
            articles {
                title
                content {
                    html
                }
                category
            }
        }`,
        variables: null
    })).then(function(response) {
        console.log(response.data.articles)
    })
}