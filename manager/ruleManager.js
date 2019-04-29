// const dataManager = require('../data')
const validation = require('../utils/validation')
// const type = ['day', 'weekly', 'daily']

exports.create = ({ type, intervals, day, weeklyDays }) => {
	validation.validateRule({ type, intervals, day, weeklyDays })
	// dataManager.create({ type, intervals, day, weeklyDay })
}
