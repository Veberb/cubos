const { err } = require('./error/error')

module.exports = {
	rule_type_required: err({
		code: 'rule_type_required',
		pt: 'Tipo da regra é obrigatório.'
	}),
	rule_type_invalid: err({
		code: 'rule_type_invalid',
		pt: 'Tipo da regra é inválido.'
	}),
	weekly_days_required: err({
		code: 'weekly_days_required',
		pt: 'Dia da semana é obrigatório.'
	}),
	weekly_days_invalid: err({
		code: 'weekly_days_invalid',
		pt: 'Dia da semana é invalido.'
	})
}
