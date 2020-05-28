import * as $ from 'jquery'

export function renderCats() {
    var api = "https://api.thecatapi.com/v1/images/search?limit=9"

    $.get(api).then(function(response) {
        console.log(response)
        for (let cat of response) {
            var catImg = `
                <p>
                    <img src="${cat.url}" alt="cat" />
                </p>
            `;
            $('body').append(catImg)
        }
    })
}
