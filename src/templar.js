module.exports = {
	getElementBindings: getElementBindings,
	isAttribute: isAttribute,
	getElementsWithBindings: getElementsWithBindings,
	transform: transform
}

var bindRegex = /^(?:(?:\[(.+)\])|(text)\#)?(.+)$/i

function getElementBindings(elem){
	return elem.dataset.bind.split(" ")
}

function isAttribute(binding) {
	return !!getAttributeFromBind(binding)
}

function getElementsWithBindings(tmpl){
	return tmpl.querySelectorAll('[data-bind]')
}

function getAttributeFromBind(bind) {
	return bind.match(bindRegex)[1]
}

function getContextNameFromBind(bind) {
	return bind.match(bindRegex)[3]
}

function getDataFromContext(name, context) {
	return context.hasOwnProperty(name) ? context[name] : ""
}

function bindElementToContext(elem, context) {
	var binds = getElementBindings(elem)

	binds.forEach(function(bind) {
		var contextName = getContextNameFromBind(bind)
		var data = getDataFromContext(contextName, context)

		if(isAttribute(bind)) {
			elem.setAttribute(
				getAttributeFromBind(bind),
				data
			)
		}
		else {
			elem.textContent = data
		}
	})
}


function transform(tmpl, context) {
	var cleanTmpl = tmpl.cloneNode(true)
	var boundElem = getElementsWithBindings(cleanTmpl)

	Array.prototype.forEach.call(boundElem, function(elem){
		bindElementToContext(elem, context)
	})

	return cleanTmpl
}
