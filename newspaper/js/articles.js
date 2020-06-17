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
                id
                title
                content {
                    html
                }
                category
                publishedAt
            }
        }`,
        variables: null
    })).then(function (response) {
        const articles = response.data.articles

        // Print to console for debugging.
        console.log(articles);

        let articleListHtml = '<div class="row">'

        articles.forEach((article, index) => {
            let colNumber = 4
            if (index === 0) {
                colNumber = 8
            }
            const date = new Date(article.publishedAt)
            const dateString = `
                ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}
                at ${date.getHours()}:${date.getMinutes()}
            `
            articleListHtml += `
                <article class="col-lg-${colNumber} list">
                    <div>
                        <section>
                            <h3>${article.title}</h3>
                            <small>Published: ${dateString}</small>
                        
                            ${article.content.html}
                        </section>
                        <a class="article-link" href="#Article_${article.id}">Read more...</a>
                    </div>
                </article>
            `
        })

        articleListHtml += '</div>'

        const content = $('#content')
        content.html(articleListHtml)
        const title = $('#page-title')
        if (category) {
            title.html(`${category} Articles`)
        } else {
            title.html('Latest Articles')
        }

        $('.article-link').on('click', (event) => {
            const link = $(event.target)
            const id = link.attr('href').split('_')[1]
            getArticle(id)
        })
    })
}

export function getArticle(id) {
    $.post(api, JSON.stringify({
        operationName: 'GetArticle',
        query: `
        query GetArticle($id: ID) {
                article(where: { id: $id }) {
                    id
                    title
                    content {
                        html
                    }
                    category
                    publishedAt
                }
            }`,
        variables: {
            id: id
        }
    })).then(function (response) {
        const article = response.data.article

        const articleHtml = `
            <div class="row">
                <article class="col detail">
                    <h2>${article.title}</h3>
                    <small>Published: ${article.publishedAt}</small>
                    <section>
                        ${article.content.html}
                    </section>
                </article>
            </div >
        `

        const content = $('#content')
        content.html(articleHtml)
        const title = $('#page-title')
        title.html('Article Details')
    })
}