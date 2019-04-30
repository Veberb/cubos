const errors = require('./genericStructErrors')
//ruleType ['day', 'daily', 'weekly'])
const avaiableDays = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday'
]

module.exports = {
	ruleType: v => {
		if (!v) return errors.rule_type_required
		if (!['day', 'daily', 'weekly'].includes(v)) return errors.rule_type_invalid
		return true
	},
	weeklyDays: v => {
		if (!v) return errors.weekly_days_required
		if (
			!v.every(value => {
				return avaiableDays.includes(value)
			})
		)
			return errors.weekly_days_invalid
		return true
	}
}
