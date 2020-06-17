import * as $ from 'jquery'

import { Category } from './categories'
import { getArticles } from './articles'
import { renderCats } from './cats'
import { renderLoginForm, logout } from './loginForm'
import { renderArticleForm } from './articleForm'

export function renderNav() {
    // Category links
    renderCategoryDropdown()

    // Home links
    $('a[href="#Home"]').on('click', function () {
        getArticles()
    })

    // Cats links
    $('a[href="#Cats"]').on('click', function () {
        renderCats()
    })

    // Editor links
    $('a[href="#Login"]').on('click', function () {
        renderLoginForm()
    })
    $('a[href="#Logout"]').on('click', function () {
        logout()
    })
    $('a[href="#ArticleForm"]').on('click', function () {
        renderArticleForm()
    })

    // Only applies to Bootstrap navbar. For looks only.
    $('.nav-link, .navbar-brand').on('click', (event) => {
        const href = $(event.target).attr('href')
        renderSelectedNav(href)
    })

    // Render logged in user nav if token is set
    if (sessionStorage.getItem('token')) {
        $('.auth-user').css('display', 'block')
        $('.user').css('display', 'none')
    }
}

export function renderSelectedNav(href) {
    $('.nav-link, .dropdown-item').removeClass('active')
    $(`.nav-link[href="${href}"]`).addClass('active')
    const submenuSelected = $(`.dropdown-item[href="${href}"]`)
    if (submenuSelected && submenuSelected[0]) {
        submenuSelected.addClass('active')
        submenuSelected[0]  // DOM element from jQuery
            .parentElement  // Dropdown wrapper
            .parentElement  // Categories <li>
            .firstElementChild.classList.add('active')  // <a> tag
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

    categoryMenuItems.find('a').on('click', function (event) {
        let clickedEl = $(event.target)
        let category = clickedEl.attr('href').replace('#', '')
        if (Category.hasOwnProperty(category)) {
            getArticles(category)
        }
    })
}
