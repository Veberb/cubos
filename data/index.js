const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid')

const adapter = new FileSync('db.json')
const db = low(adapter)

exports.create = ({ type, intervals, day, weeklyDay }) => {
	const ruleId = db
		.get('rules')
		.push({ id: shortid.generate(), type, intervals, day, weeklyDay })
		.write().id
	console.log(ruleId)
}

exports.defaults = () => {
	if (!db.has('rules').value()) db.set('rules', []).write()
}

exports.defaults()
