const express = require('express')
const manager = require('./ruleManager')

const router = express.Router({ mergeParams: true })

module.exports = app => {
	app.use('/api/rules', router)
}

router.post('/', (req, res, next) => {
	try {
		manager.create(req.body)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', (req, res, next) => {
	try {
		manager.remove(req.params)
	} catch (error) {
		next(error)
	}
})
