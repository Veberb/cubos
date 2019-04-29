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
}

exports.validateWeekly = ({ rule, day, type, intervals, weeklyDays }) => {
	const dateRule = day ? moment(day, 'DD-MM-YYYY') : moment()

	for (let index = 0; index < rule.weeklyDays.length; index++) {
		const weeklyDay = rule.weeklyDays[index]
		if (['day', 'daily'].includes(type)) {
			if (
				dateRule.isoWeekday() ===
				moment()
					.day(weeklyDay)
					.isoWeekday()
			) {
				exports.checkIntervals({
					toIntervals: intervals,
					ruleIntervals: rule.intervals
				})
				continue
			}
		}
		weeklyDays.forEach(toWeeklyDay => {
			if (
				moment()
					.day(weeklyDay)
					.isoWeekday() ===
				moment()
					.day(toWeeklyDay)
					.isoWeekday()
			) {
				exports.checkIntervals({
					toIntervals: intervals,
					ruleIntervals: rule.intervals
				})
			}
		})
	}
}

exports.validateRule = ({ intervals, type, day, weeklyDays }) => {
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
			exports.validateWeekly({ rule, day, type, intervals, weeklyDays })
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
