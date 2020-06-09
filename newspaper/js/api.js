const auth = require('basic-auth')
const compare = require('tsscmp')

const username = 'editor'
const password = '4b9908ceedd7f65e7ddb2f99e0181d8c'

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

exports.postLogin = postLogin