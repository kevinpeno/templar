var templar = require("../src/templar")
var utils = require("./utils")
var expect = require("unexpected")

describe("templar", function() {
	it("can return all space separated bindings from a given DOM node", function() {
		var testEl = utils.createTestElement(document, "span", "test test")
		var toTest = templar.getElementBindings(testEl.firstChild)

		expect(toTest.length, 'to equal', 2)
	})

	it("can determine if the binding is an attribute", function() {
		var testEl = utils.createTestElement(document, "span", "[attr]#test")
		var binds = templar.getElementBindings(testEl.firstChild)
		var toTest = templar.isAttribute(binds[0])

		expect(toTest, 'to equal', true)
	})

	it("can find all bindings in supplied template", function() {
		var testEl = utils.createTestElement(document, "span", "test")
		var subEl = utils.createBoundElement(document, "span", "test")

		testEl.appendChild(subEl)

		var toTest = templar.getElementsWithBindings(testEl)

		expect(toTest instanceof NodeList, 'to equal', true)
		expect(toTest.length, 'to equal', 2)
	})

	it("can return a document fragment with context applied to bindings", function() {
		var testEl = utils.createTestElement(document, "span", "test")
		var context = {
			test: "test"
		}

		var result = templar.transform(testEl, context)
		var toTest = result.firstChild.innerHTML

		expect(toTest, 'to equal', context.test)
	})

	it("can return a function that accepts data context as an argument")
})
