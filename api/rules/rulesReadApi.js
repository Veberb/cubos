const express = require('express')
const manager = require('./ruleManager')

const router = express.Router({ mergeParams: true })

module.exports = app => {
	app.use('/api/rules', router)
}

router.get('/', (req, res, next) => {
	try {
		res.json(manager.list())
	} catch (error) {
		next(error)
	}
})
