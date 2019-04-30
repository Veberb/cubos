const errorDict = {
	pt: {}
}

exports.err = function({ code, pt }) {
	errorDict.pt[code] = pt
	return code
}

// may be used to translate error codes into messages
exports.errorDict = errorDict

// this project is not internationalized, there is only the portuguese locale
exports.getLocalizedMsg = key => {
	return errorDict.pt[key] || ''
}
