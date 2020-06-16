const auth = require('basic-auth')
const compare = require('tsscmp')
const htmlToAST = require('./htmlToAST')
const { JSDOM } = require('jsdom')
const window = new JSDOM().window
const $ = require('jquery')(window)


// Use env variables for a production server
const { username, password, apiUrl, apiKey } = require('./env')


function postLogin(req, res) {
    const credentials = auth(req)
    console.log(credentials)

    if (credentials && credentials.name === username && compare(credentials.pass, password)) {
        res.end(JSON.stringify({
            status: 'SUCCESS'
        }))
    } else {
        res.end(JSON.stringify({
            status: 'ERROR'
        }))
    }
}

function postArticle(req, res) {
    const credentials = auth(req)

    if (credentials && credentials.name === username && compare(credentials.pass, password)) {
        console.log(req.body)

        // Convert the req body to a GraphCMS variables object.a
        const variables = {
            title: req.body.title,
            category: req.body.category,
            content: {
                children: htmlToAST(req.body.content_html)
            }
        }

        // Post to GraphCMS
        const createArticleQuery = `
            mutation CreateArticle($title: String!, $content: RichTextAST!, $category: Category!) {
                __typename
                createArticle(data: {title: $title, content: $content, category: $category}) {
                    id,
                    title,
                    category,
                    content {
                        html
                    }
                }
            }
        `
        $.post({
            url: apiUrl,
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                operationName: 'CreateArticle',
                query: createArticleQuery,
                variables: variables
            })
        })
        .then(response => {
            console.log(response)

            const publishArticleQuery = `
                mutation PublishArticle($id: ID) {
                    __typename
                    publishArticle(where: {id: $id}, to: PUBLISHED) {
                        content {
                            html
                        }
                        id
                        title
                        stage
                    }
                }
            `
            const variables = {
                "id": response.data.createArticle.id
            }
            
            // Publish the article we just created.
            $.post({
                url: apiUrl,
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                },
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    operationName: 'PublishArticle',
                    query: publishArticleQuery,
                    variables: variables
                })
            }).then(response => {
                res.end(JSON.stringify({
                    status: 'SUCCESS'
                }))
            }).fail(error => {
                res.end(JSON.stringify({
                    status: 'ERROR',
                    message: 'Failed to publish article.'
                }))
            })
        }).fail(error => {
            res.end(JSON.stringify({
                status: 'ERROR',
                message: 'Failed to create article.'
            }))
        })

    } else {
        res.end(JSON.stringify({
            status: 'ERROR',
            message: 'Invalid credentials'
        }))
    }

}

exports.postLogin = postLogin
exports.postArticle = postArticle