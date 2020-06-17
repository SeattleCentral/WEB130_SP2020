import * as $ from 'jquery'

export function renderCats() {
    var api = "https://api.thecatapi.com/v1/images/search?limit=9"

    $.get(api).then(function (response) {
        let catHtml = '<div id="cats" class="d-flex align-content-stretch flex-wrap">'
        for (let cat of response) {
            catHtml += `
                <img src="${cat.url}" alt="cat" />
            `
        }
        catHtml += '</div>'

        const content = $('#content')
        content.html(catHtml)
        const title = $('#page-title')
        title.html('Lé Cats')
    })
}
