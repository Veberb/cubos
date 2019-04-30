const dataManager = require('../../data')
const validation = require('../../utils/validation')
const Boom = require('boom')

exports.create = ({ type, intervals, day, weeklyDays }) => {
	const checkDates = rule => {
		switch (rule.type) {
		case 'day':
		case 'daily':
			validation.checkIntervals({
				toIntervals: intervals,
				ruleIntervals: rule.intervals
			})
			break
		default:
			validation.validateWeekly({ rule, day, type, intervals, weeklyDays })
			break
		}
	}
	const rules = dataManager.list({
		day,
		types: ['daily', 'weekly'],
		weeklyDays
	})
	rules.forEach(checkDates)
	return dataManager.create({ type, intervals, day, weeklyDays })
}

exports.remove = ({ id }) => {
	if (!dataManager.get({ id }))
		throw Boom.badRequest('Não foi encontrada regra com o id informado')

	dataManager.remove({ id })
}

exports.list = () => dataManager.list({})
