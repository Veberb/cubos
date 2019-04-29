const express = require('express')
const manager = require('./timeManager')

const router = express.Router({ mergeParams: true })

module.exports = app => {
	app.use('/api/times', router)
}

router.get('/avaiable', (req, res, next) => {
	try {
		res.json(manager.getAvaiableTimes(req.query))
	} catch (error) {
		next(error)
	}
})
