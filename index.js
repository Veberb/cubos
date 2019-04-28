const express = require('express')
const Boom = require('boom')
const glob = require('glob')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('./config')

const app = express()
app.use(cors('*'))
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }))

const apis = glob.sync(`${config.path}/**/*Api.js`)

apis.forEach(apiPath => {
	require(`${apiPath}`)(app)
})

app.use((err, req, res) => {
	const error = Boom.isBoom(err) ? err : Boom.boomify(err)
	res
		.status(error.output.statusCode)
		.json({ message: error.message, error: error.output.payload.error })
})

app.listen(3000)