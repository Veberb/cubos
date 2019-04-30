const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')

const dbPath = process.env.NODE_ENV === 'test' ? 'db-test.json' : 'db.json'

const adapter = new FileSync(dbPath)

const db = low(adapter)

exports.create = ({
	type,
	intervals,
	day,
	weeklyDays
}) => {
	const obj = {
		id: shortid.generate(),
		type,
		intervals
	}

	if (day) obj.day = day
	if (weeklyDays) obj.weeklyDays = weeklyDays
	db
		.get('rules')
		.push(obj)
		.write().id
}

exports.list = ({
	day,
	types = [],
	weeklyDays = []
}) => {
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

exports.remove = ({
	id
}) => {
	db.get('rules')
		.remove({
			id
		})
		.write()
}

exports.get = ({
	id
}) =>
	db
		.get('rules')
		.find({
			id
		})
		.value()

exports.defaults = () => {
	if (!db.has('rules').value()) db.set('rules', []).write()
}

exports.reset = () => {
	db.set('rules', []).write()
}

exports.defaults()