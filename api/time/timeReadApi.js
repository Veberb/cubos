const express = require('express')
const manager = require('./timeManager')

const router = express.Router({ mergeParams: true })

module.exports = app => {
	app.use('/api/times', router)
}

router.get('/avaiable', (req, res, next) => {
	try {
		res.json(manager.list())
	} catch (error) {
		next(error)
	}
})
