const dataManager = require('../data')
// const type = ['day', 'weekly', 'daily']

exports.create = ({ type, intervals, day, weeklyDay }) => {
	console.log(type)
	console.log(intervals)
	console.log(day)
	console.log(weeklyDay)
	dataManager.create({ type, intervals, day, weeklyDay })
}
