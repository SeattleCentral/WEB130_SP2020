import _ from 'lodash'

function component() {
    const domElement = document.createElement('div')

    domElement.innerHTML = _.join(
        ['Hello', 'class', 'and', 'how', 'are', 'you', 'feeling', 'today?'],
        '-'
    )

    return domElement
}

document.body.appendChild(component())