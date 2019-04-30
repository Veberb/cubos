//eslint-disable
const { superstruct } = require('superstruct')
const boom = require('boom')
const glob = require('glob')
const config = require('../config')
// Load superstruct custom schemas
const customSchema = { types: {} }
const structs = glob.sync(`${config.path}/**/*Struct.js`)

structs.forEach(structPath => {
	customSchema.types = {
		...customSchema.types,
		...require(`${structPath}`)
	}
})

/* eslint-enable */
// All structs files are loaded here
exports.struct = global.$struct = superstruct(customSchema)

/**
 * Validates req.params based on schema.
 */
exports.validateParams = schema => (req, res, next) => {
	return exports.validate({ req, next, schema, reference: req.params })
}

/**
 * Validates req.body based on schema.
 */
exports.validateBody = schema => (req, res, next) => {
	return exports.validate({ req, next, schema, reference: req.body })
}

/**
 * Validates req.query based on schema.
 */
exports.validateQuery = schema => (req, res, next) => {
	return exports.validate({ req, next, schema, reference: req.query })
}

/**
 * Validates req.query, req.body and req.params based on schema.
 */
exports.validate = global.$validate = ({ req, next, schema, reference }) => {
	try {
		const struct = getStructSchema(schema)

		let args
		if (reference) {
			args = buildArgs({ schema, reference })
		} else {
			args = buildArgs({
				schema,
				reference: { ...req.query, ...req.body, ...req.params }
			})
		}

		req.validData = {
			...req.validData,
			...struct(args)
		}
		return next()
	} catch (error) {
		next(boom.boomify(error, { statusCode: 400 }))
	}
}

function getStructSchema(schema) {
	let structSchema
	if (schema instanceof Function) {
		structSchema = schema()
	} else {
		structSchema = { ...schema }
	}
	return exports.struct.partial(structSchema)
}

function buildArgs({ schema, reference }) {
	const args = {}
	Object.keys(schema).forEach(field => {
		if (Object.prototype.hasOwnProperty.call(reference, field))
			args[field] = reference[field]
	})
	return args
}
