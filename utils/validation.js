const moment = require('moment')
const Boom = require('boom')

exports.checkIntervals = ({
	toIntervals,
	ruleIntervals
}) => {
	const pattern = 'hh:mm'
	ruleIntervals.forEach(ruleInterval => {
		toIntervals.forEach(element => {
			if (
				moment(ruleInterval.start, pattern).isBetween(
					moment(element.start, pattern),
					moment(element.end, pattern), null, '[]'
				) ||
				moment(ruleInterval.end, pattern).isBetween(
					moment(element.start, pattern),
					moment(element.end, pattern), null, '[]'
				)
			) {
				throw Boom.badRequest(
					'Já existe uma regra cadastrada para o horário informado'
				)
			}
		})
	})
}

exports.validateWeekly = ({
	rule,
	day,
	type,
	intervals,
	weeklyDays
}) => {
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
			}
			continue
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