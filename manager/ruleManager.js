const dataManager = require('../data')
const validation = require('../utils/validation')
const Boom = require('boom')
// const type = ['day', 'weekly', 'daily']

exports.create = ({ type, intervals, day, weeklyDays }) => {
	validation.validateRule({ type, intervals, day, weeklyDays })
	// dataManager.create({ type, intervals, day, weeklyDays })
}

exports.remove = ({ id }) => {
	if (!dataManager.get({ id }))
		throw Boom.badRequest('Não foi encontrada regra com o id informado')

	dataManager.remove({ id })
}

exports.list = () => dataManager.list({})
