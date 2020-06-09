import * as $ from 'jquery'

import { Category } from './categories'
import { getArticles } from './articles'
import { renderLoginForm, logout } from './loginForm'
import { renderArticleForm } from './articleForm'

export function renderNav() {
    // Home links
    $('a[href="#Home"]').on('click', function() {
        getArticles()
    })

    // Category links
    renderCategoryDropdown()

    // Editor links
    $('a[href="#Login"]').on('click', function() {
        renderLoginForm()
    })
    $('a[href="#Logout"]').on('click', function() {
        logout()
    })
    $('a[href="#ArticleForm"]').on('click', function() {
        renderArticleForm()
    })

    // Only applies to Bootstrap navbar. For looks only.
    $('.nav-link').on('click', function(event) {
        $('.nav-link').removeClass('active')
        const thisNavItem = $(event.target)
        thisNavItem.addClass('active')
    })

    // Render logged in user nav if token is set
    if (sessionStorage.getItem('token')) {
        $('.auth-user').css('display', 'block')
        $('.user').css('display', 'none')
    }
}

function renderCategoryDropdown() {
    const categoryMenuItems = $('#category-menu-items')
    for (const category of Object.keys(Category)) {
        const categoryItemHtml = `
            <a class="dropdown-item" href="#${category}">${category}</a>
        `
        // category = "World"
        // <a class="dropdown-item" href="#World">World</a>
        categoryMenuItems.append(categoryItemHtml)
    }

    categoryMenuItems.find('a').on('click', function(event) {
        let clickedEl = $(event.target)
        let category = clickedEl.attr('href').replace('#', '')
        if (Category.hasOwnProperty(category)) {
            getArticles(category)
        }
    })
}
