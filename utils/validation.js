const moment = require('moment')
const dataManager = require('../data')
const Boom = require('boom')

exports.checkIntervals = ({ toIntervals, ruleIntervals }) => {
	const pattern = 'hh:mm'
	ruleIntervals.forEach(ruleInterval => {
		toIntervals.forEach(element => {
			if (
				moment(ruleInterval.start, pattern).isBetween(
					moment(element.start, pattern),
					moment(element.end, pattern)
				) ||
				moment(ruleInterval.end, pattern).isBetween(
					moment(element.start, pattern),
					moment(element.end, pattern)
				)
			) {
				throw Boom.badRequest(
					'Já existe uma regra cadastrada para o horário informado'
				)
			}
		})
	})
	return true
}

exports.validateWeekly = () => {}

exports.validateRule = ({ intervals, day, weeklyDays }) => {
	const checkDates = rule => {
		switch (rule.type) {
		case 'day':
		case 'daily':
			exports.checkIntervals({
				toIntervals: intervals,
				ruleIntervals: rule.intervals
			})
			break
		default:
			exports.validateWeekly({ rule, intervals, weeklyDays })
			break
		}
	}

	const rules = dataManager.list({
		day,
		types: ['daily', 'weekly'],
		weeklyDays
	})
	rules.forEach(checkDates)
}
