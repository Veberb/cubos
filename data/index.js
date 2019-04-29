const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')
const adapter = new FileSync('db.json')
const db = low(adapter)

exports.create = ({ type, intervals, day, weeklyDay }) => {
	const obj = {
		id: shortid.generate(),
		type,
		intervals
	}

	if (day) obj.day = day
	if (weeklyDay) obj.weeklyDay = weeklyDay
	db
		.get('rules')
		.push(obj)
		.write().id
}

exports.list = ({ day, types = [], weeklyDays = [] }) => {
	return db
		.get('rules')
		.filter(
			rule =>
				rule.day === day ||
				types.includes(rule.type) ||
				weeklyDays.includes(rule.type)
		)
		.value()
}

exports.defaults = () => {
	if (!db.has('rules').value()) db.set('rules', []).write()
}

exports.defaults()
