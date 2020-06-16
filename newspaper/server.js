const path = require('path')
const express = require('express')
const { postLogin, postArticle } = require('./js/api')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/dist', express.static('dist'))
app.use('/img', express.static('img'))

app.post('/api/login', postLogin)
app.post('/api/article', postArticle)

app.listen(8080, '0.0.0.0', () => console.log('Server running on port 8080.'))