import * as $ from 'jquery'

import { Category } from './categories'
import { getArticles } from './articles'

export function renderArticleForm(data = { content: {}}) {
    const content = $('#content')

    const articleFormHtml = `
        <div class="row justify-content-center">
            <div class="col-lg-10">
                <form id="article-form">
                    <input type="hidden" name="id" id="id" value="${data.id || ''}">
                    <div class="form-group">
                        <label for="title">Title</label>
                        <input class="form-control" type="text" name="title" id="title" value="${data.title || ''}">
                    </div>
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select class="form-control" id="category" name="category">
                            ${renderCategoryOptions(data)}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="content_html">Article Content</label>
                        <textarea class="form-control" id="content_html" name="content_html">${data.content.html || ''}</textarea>
                    </div>
                    <button id="article-submit" class="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </div>
    `

    content.html(articleFormHtml)

    CKEDITOR.replace('content_html')

    $('#article-submit').on('click', (event) => {
        event.preventDefault()
        const title = $('#title').val()
        const category = $("#category").val()
        const content_html = CKEDITOR.instances.content_html.getData()
        const data = {
            title,
            category,
            content_html
        }
        const token = sessionStorage.getItem('token')

        console.log('Submitting article...', data)

        $.post({
            url: '/api/article',
            headers: {
                'Authorization': `Basic ${token}`
            },
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data)
        }).then(response => {
            if (response.status === 'SUCCESS') {
                $('#create-article-success').modal('show')
                $('#continue-editing').on('click', event => {
                    document.getElementById('article-form').reset()
                    CKEDITOR.instances.content_html.setData('')
                })
                $('#go-to-home').on('click', event => {
                    getArticles()
                })
            } else {
                $('#create-article-failure').modal('show')
            }
        }).fail(error => {
            $('#create-article-failure').modal('show')
        })
    })

    // Form submit event listeners
}

function renderCategoryOptions(data) {
    let categoryOptionsHtml = ''
    for (const category of Object.keys(Category)) {
        let selected = ''
        if (data.category === category) {
            selected = `selected="selected"`
        }
        categoryOptionsHtml += `
            <option value="${category}" ${selected}>${category}</option>
        `
    }
    return categoryOptionsHtml
}