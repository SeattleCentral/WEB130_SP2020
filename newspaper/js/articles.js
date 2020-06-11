import * as $ from 'jquery'

const api = 'https://api-us-west-2.graphcms.com/v2/ckag37xtg0gz801xl0w40eaa7/master'

export function getArticles(category) {
    let filter = '(orderBy: publishedAt_DESC)'
    if (category) {
        filter = `(orderBy: publishedAt_DESC, where: {category: ${category}})`
    }
    $.post(api, JSON.stringify({
        operationName: 'GetArticles',
        query: `
        query GetArticles {
            articles${filter} {
                title
                content {
                    html
                }
                category
                publishedAt
            }
        }`,
        variables: null
    })).then(function(response) {
        const articles = response.data.articles
        const content = $('#content')

        // Print to console for debugging.
        console.log(articles);

        let articleListHtml = '<div class="row">'

        articles.forEach((article, index) => {
            if (index % 3 === 0) {
                articleListHtml += '</div><div class="row">'
            }
            
            articleListHtml += `
                <article class="col">
                    <h3>${article.title}</h3>
                    <small>Published: ${article.publishedAt}</small
                    <section>
                        ${article.content.html}
                    </section>
                </article>
            `
        })

        articleListHtml += '</div>'

        content.html(articleListHtml)
    })
}