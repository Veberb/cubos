const rulesManager = require('../../api/rules/ruleManager')
const moment = require('moment')

exports.getAvaiableTimes = ({ start, end }) => {
	const rulesList = rulesManager.list({})
	const pattern = 'DD-MM-YYYY'
	let currentDate = moment(start, pattern)
	const dateEnd = moment(end, pattern)

	const avaiableDays = []

	while (currentDate.isSameOrBefore(dateEnd)) {
		const intervalsToPush = []
		rulesList.forEach(rule => {
			switch (rule.type) {
			case 'day':
				if (rule.day === currentDate.format('DD-MM-YYYY'))
					intervalsToPush.push(...rule.intervals)
				break
			case 'daily':
				intervalsToPush.push(...rule.intervals)
				break

			default:
				rule.weeklyDays.forEach(day => {
					if (
						moment()
							.day(day)
							.isoWeekday() === moment(currentDate).isoWeekday()
					)
						intervalsToPush.push(...rule.intervals)
				})
				break
			}
		})
		if (intervalsToPush.length) {
			intervalsToPush.sort((a, b) => (a.start > b.start ? 1 : -1))
			avaiableDays.push({
				day: currentDate.format('DD-MM-YYYY'),
				intervals: intervalsToPush
			})
		}

		currentDate.add(1, 'day')
	}
	return avaiableDays
}
