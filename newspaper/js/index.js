// Required for Bootstrap
import * as $ from 'jquery'
import * as popper from 'popper.js'
import * as bootstrap from 'bootstrap'
export { $, popper, bootstrap }

import { renderCats } from './cats'
import { getArticles } from './articles'
import { renderNav } from './nav'
import { renderLoginForm } from './loginForm'
import { renderArticleForm } from './articleForm'
import { Category } from './categories'

// renderCats()
renderNav()

const page = window.location.href.split('#')[1]

console.log('Rendering page...', page)

switch (page) {
    case 'Home':
        getArticles()
        break
    case 'Login':
        renderLoginForm()
        break
    case 'ArticleForm':
        // For testing purposes only
        let data = {
            "title": "The Cow Jumped Over the Moon.",
            "content": {
                "html": "\u003cp\u003eThe quick brown fox jumped over the the lazy dog.\u003c/p\u003e\u003cp\u003e\u003c/p\u003e\u003cp\u003eThis prompted the cow to jump over the moon as pigs flew in the background. \u003c/p\u003e"
            },
            "category": "World",
            "publishedAt": "2020-05-21T01:45:48.151112+00:00"
        };

        renderArticleForm()
        break
    case Category.Community:
        getArticles(Category.Community)
        break
    case Category.Opinion:
        getArticles(Category.Opinion)
        break
    case Category.Sports:
        getArticles(Category.Sports)
        break
    case Category.World:
        getArticles(Category.World)
        break
    default:
        getArticles()
}
