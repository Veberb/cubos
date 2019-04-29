const express = require('express')
const manager = require('../manager/ruleManager')

const router = express.Router({ mergeParams: true })

module.exports = app => {
	app.use('/api/rules', router)
}

router.get('/', (req, res, next) => {
	try {
		res.json(manager.list(req.body))
	} catch (error) {
		next(error)
	}
})
