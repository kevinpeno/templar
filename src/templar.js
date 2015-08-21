export default function Templar(dom, tmpl, context) {
	let node = dom.importNode(tmpl.content, true)
	let dataPoints = [...node.querySelectorAll('[data-bind]')]

	function bindToElem(elem) {
		let binds = [...elem.dataset.bind.split(" ")]
		let attrReg = /^\[(.+)\]\:(.+)$/i

		binds.forEach((v) => {
			let matches = v.match(attrReg)

			// Attr binding?
			if(matches) {
				if( elem.hasAttribute(matches[1]) ) {
					let data = getData(matches[2], context)
					elem.setAttribute(matches[1], data)
				}
			}
			else {
				elem.textContent = getData(v, context)
			}
		})
	}

	function getData(name, context) {
		if( context.hasOwnProperty(name) )
			return context[name]
		else
			return ""
	}

	dataPoints.forEach(bindToElem)

	return node
}
