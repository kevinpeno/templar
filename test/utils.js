module.exports = {
	createTestElement: createTestElement,
	createBoundElement: createBoundElement
}

function createTestElement(document, name, bindings) {
	var tmpl = document.createDocumentFragment()
	tmpl.appendChild(
		createBoundElement(document, name, bindings)
	)

	return tmpl
}

function createBoundElement(document, name, bindings) {
	var el = document.createElement(name)

	el.dataset['bind'] = bindings || ""

	return el
}
