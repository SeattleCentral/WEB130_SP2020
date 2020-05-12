import _ from 'lodash'

import { sendWarning } from './alert'

function component() {
    const domElement = document.createElement('div')

    domElement.innerHTML = _.join(
        ['Hello', 'class', 'and', 'how', 'are', 'you', 'feeling', 'today?'],
        '-'
    )

    return domElement
}

setTimeout(sendWarning, 1000);

// document.body.appendChild(component())