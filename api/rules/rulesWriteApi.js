const express = require('express')
const manager = require('./ruleManager')
const { validateBody } = require('../../utils/struct')

const router = express.Router({ mergeParams: true })

module.exports = app => {
	app.use('/api/rules', router)
}

router.post(
	'/',
	validateBody({
		day: 'string?',
		type: 'ruleType',
		intervals: 'array',
		weeklyDays: 'weeklyDays?'
	}),
	(req, res, next) => {
		try {
			manager.create(req.body)
			res.json('Horário cadastrado com sucesso!')
		} catch (error) {
			next(error)
		}
	}
)

router.delete('/:id', (req, res, next) => {
	try {
		manager.remove(req.params)
	} catch (error) {
		next(error)
	}
})
