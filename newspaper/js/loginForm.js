import * as $ from 'jquery'
import md5 from 'md5'
import { renderArticleForm } from './articleForm'
import { getArticles } from './articles'

function login(token) {
    sessionStorage.setItem('token', token)
    $('.auth-user').css('display', 'block')
    $('.user').css('display', 'none')
    // Redirect to create new article
    const baseUrl = window.location.href.split('#')[0]
    window.location.href = `${baseUrl}#ArticleForm`
    renderArticleForm()
}

export function logout() {
    sessionStorage.removeItem('token')
    $('.auth-user').css('display', 'none')
    $('.user').css('display', 'block')
    // Redirect to home page
    const baseUrl = window.location.href.split('#')[0]
    window.location.href = `${baseUrl}#Home`
    getArticles()
}

export function renderLoginForm() {
    const content = $('#content')

    const loginFormHtml = `
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-8">
                <form id="login-form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" class="form-control" name="username" id="username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="input-group">
                            <input type="password" class="form-control" name="password" id="password">
                            <div class="input-group-append">
                                <button class="input-group-text" id="see-password">👁</button>
                            </div>
                        </div>
                    </div>
                    <button id="login-submit" class="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </div>
    `

    content.html(loginFormHtml)

    $('#see-password').on('click', event => {
        event.preventDefault()
        const password = $('#password')
        if (password.attr('type') === 'password') {
            password.attr('type', 'text')
        } else {
            password.attr('type', 'password')
        }
    })

    $('#login-submit').on('click', function(event) {
        event.preventDefault()
        const username = $('#username').val()
        const password = $('#password').val()
        const token = btoa(`${username}:${md5(password)}`)

        $.post({
            url: '/api/login',
            headers: {
                'Authorization': `Basic ${token}`
            },
            contentType: 'application/json',
            dataType: 'json'
        }).then(response => {
            if (response.status === 'SUCCESS') {
                login(token)
            } else {
                const alertHtml = `
                    <div class="alert alert-danger alert-dismissable fade show" role="alert">
                        <strong>Invalid login!</strong> Please check your username and password.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `
                content.prepend(alertHtml)
            }
        })

        // redirect to the article edit page.
    })
}