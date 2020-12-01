let switcher = 1;

// first aspect of the library

class Gi {

	static selector(selector) {
		const element = document.querySelector(selector);
		return element;
	}

	static selectorAll(selector) {
		const element = document.querySelectorAll(selector);
		return element
	}

	static style (selector, object) {
		let prop = Object.keys(object), css = [],
			value = Object.values(object);
			css.push(prop, value)

		for(let i in css[0]){
			s(css[0][i], css[1][i])
		}

		function s(prop, value) {
			return typeof(selector) === "string" ? document.querySelector(selector).style.setProperty(prop, value)
			: selector.style.setProperty(prop, value);
		}
	}


	static styleAll(selector, object) {
		if (typeof(selector) === "string") { 
			let element = document.querySelectorAll(selector);
			Gi.loop(element, object)
		}else{
			Gi.loop(selector, object)
		}
	}

	static loop(element, object) {
		let prop = Object.keys(object), css = [],
			value = Object.values(object);
			css.push(prop, value)

		for(let i in css[0]){
			s(css[0][i], css[1][i])
		}
		function s(prop, value) {
			Array.from(element).forEach(element => element.style.setProperty(prop, value))
		}
	}

	static animate(selector, object, otherObject = {duration: 400, delay: 0, type: 'ease'}) {
			let d = otherObject, element, prop = Object.keys(object), css = [],
			value = Object.values(object);

			css.push(prop, value)

			for(let i in css[0]){
				styles(css[0][i], css[1][i])
			}

			function styles(prop, value) {
				setTimeout( () => {
					if (typeof(selector) === "string") {
						document.querySelector(selector).style.setProperty(prop, value);
						document.querySelector(selector).style.transition = `${d.type}`;
						document.querySelector(selector).style.transitionDuration = `${d.duration}ms`;
					}else{
						selector.style.setProperty(prop, value);
						selector.style.transition = `${d.type}`;
						selector.style.transitionDuration = `${d.duration}ms`;
					}
				}, d.delay)	
			}
	}

	static event(selector, event, action) {
		return typeof(selector) === "string" ? document.querySelector(selector).addEventListener(`${event}`, action) :
			selector.addEventListener(`${event}`, action)
	}

	static addClass(selector, className) {
			return typeof(selector) === "string" ? document.querySelector(selector).classList.add(className)
			:  selector.classList.add(className) 
	}

	static removeClass(selector, className) {
			return typeof(selector) === "string" ? document.querySelector(selector).classList.remove(className)
			:  selector.classList.remove(className) 
	}

	static classToggle(selector, className) {
			return typeof(selector) === "string" ? document.querySelector(selector).classList.toggle(className)
			:  selector.classList.toggle(className) 
	}

	static toggle(selector, newPoint) {
		if (typeof(selector) === "string") { 
			toggler(document.querySelector(selector))

		}else{
			toggler(selector)
		}
			 
		function toggler(selector) {
			let att = document.createAttribute('class')
			att.value = 'toggler'
			att.style = `${newPoint}`;
			classToggle(selector, 'toggler')
			console.log(selector.style, att.style)
		}
	}

	static append(selector, content) {
		if (typeof(selector) === "string") { 
			document.querySelector(selector).innerHTML += content;

		}else{
			selector.innerHTML += content;
		}
	}

	static digitalClock(selector = 'body') {
		setInterval(() => {
			let date = new Date(), tm = date.getMinutes(), ts = date.getSeconds(), th = date.getHours(),
			secs = ts, min = tm, hours = th, output = '';

			if (ts < 10) {secs = '0'+ts} else {secs = ts}
			if (tm < 10) {min = '0'+tm } else{min = tm}
			if (th < 10) {hours = '0'+th} else{hours = th}
			if (typeof(selector) == 'string') {
				output =  `<div class="d-clock">${hours} : ${min} : ${secs}</div>`;	
				document.querySelector(selector).innerHTML = output;
			}else{
				selector.innerHTML = output;	
			}
		},1000)
	}

	static calculator(options = {container: 'body', style: true}) {
		const calKeys = [
		{value: '', class: 'wide'},
		{value: '1', class: 'normal'}, {value: '2', class: 'normal'}, {value: '3', class: 'normal'}, 
		{value: '+', class: 'special'}, {value: '4', class: 'normal'}, {value: '5', class: 'normal'},
		{value: '6', class: 'normal'}, {value: '-', class: 'special'}, {value: '7', class: 'normal'},
		{value: '8', class: 'normal'}, {value: '9', class: 'normal'}, {value: '*', class: 'special'}, 
		{value: '0', class: 'normal'}, {value: '.', class: 'normal'}, {value: '=', class: 'special'}, 
		{value: '/', class: 'special'}, {value: 'C', class: 'special'}, {value: 'Del', class: 'special'}
		];
		let output = '';
		calKeys.forEach(calKey => {
			output += `<input type="text" value="${calKey.value}" class="${calKey.class}" readonly>`;
		});

		if (options.container == undefined) {
			options.container = 'body';
		}

		if (options.style == undefined) {
			options.style = true;
		}

		if (typeof(options.container) == 'string') {
				Gi.selector(options.container).innerHTML += `<div class="calculator"> ${output}</div>`;
			}else{
				options.container.innerHTML += `<div class="calculator"> ${output}</div>`;
		}
		
		if (options.style == true){
			Gi.style('.calculator', {width: '300px', display: 'flex', 'flex-wrap': 'wrap', margin: 'auto', 'border': 'solid 1px black', padding: '10px;'});
			Gi.styleAll('.calculator input', {'display': 'inline-block', padding: '10px', width: '40px', height: '40px', 'border-radius': '3px', 'text-align': 'center', 'border': 'solid 1px grey', outline: 'none', margin: '5px', transition: 'transform ease 0.3s', cursor: 'pointer', 'text-align': 'center'});
			Gi.style('.wide', {width: '100%', 'text-align': 'left'});
			Gi.styleAll('.special', { 'font-size': '20px', 'font-weight': '500', 'background-color': 'black', 'color': 'white', 'transition': 'transform ease 0.3s', 'cursor': 'pointer'});
		}
		let keys = document.querySelectorAll('.calculator input');
		Array.from(keys).forEach(key =>{
			key.onclick = () => {
				if (key.value == '=') {
					keys[0].value = eval(keys[0].value)
				}else if (key.value == 'C') {
					keys[0].value = '';
				}else if(key.value == 'Del') {
					keys[0].value = keys[0].value.substr(0, keys[0].value.length - 1);
				}else{
					keys[0].value += key.value;
				}
			}
		});
	}

}

// Second Aspect of the Library

function JJ(selector) {
	const element = new Xchemes(selector);
	return element;
}

function JJAll(selector) {
	const element = new XchemesAll(selector);
	return element;
}

class Xchemes {
	constructor (selector){
		this.selector = selector;
	}

	self () {
		return document.querySelector(this.selector);
	}

	parent () {
		return document.querySelector(this.selector).parentElement;
	}

	style (object) {
		let element, prop = Object.keys(object), css = [],
		value = Object.values(object);
		element = document.querySelector(this.selector);
		css.push(prop, value)

		for(let i in css[0]){
			styles(css[0][i], css[1][i])
		}

		function styles(prop, value) {
			element.style.setProperty(prop, value);
		}
	}

	animate(object, otherObject) {
		let d = otherObject, element, prop = Object.keys(object), css = [],
		value = Object.values(object);
		
		if (d == null || d == undefined) {
			d = {duration: 400, delay: 0, type: 'ease'}
		}
		if (d.duration == null || d.duration == undefined) {
			d.duration = 400;
		}
		if (d.delay == null || d.delay == undefined) {
			d.delay = 0;
		}
		if (d.type == null || d.type == undefined) {
			d.type = 'ease';
		}

		element = document.querySelector(this.selector);
		css.push(prop, value)

		for(let i in css[0]){
			styles(css[0][i], css[1][i])
		}

		function styles(prop, value) {
			setTimeout( () => {
				element.style.setProperty(prop, value);
				element.style.transition = `${d.type}`;
				element.style.transitionDuration = `${d.duration}ms`
			}, d.delay)
		}	
	}

	event(event, action) {
		document.querySelector(this.selector).addEventListener(`${event}`, action);
	}

	addClass(className) {
		document.querySelector(this.selector).classList.add(className);
	}

	removeClass(className) {
		document.querySelector(this.selector).classList.remove(className);
	}

	classToggle(className) {
		document.querySelector(this.selector).classList.toggle(className);
	}

	loop(element, style) {
			Array.from(element).forEach(element => element.style = style)
	}

	digitalClock() {
		setInterval(() => {
			let date = new Date(), tm = date.getMinutes(), ts = date.getSeconds(), th = date.getHours(),
			secs = ts, min = tm, hours = th;

			if (ts < 10) {secs = '0'+ts} else {secs = ts}
			if (tm < 10) {min = '0'+tm } else{min = tm}
			if (th < 10) {hours = '0'+th} else{hours = th}

			document.querySelector(this.selector).textContent = `${hours} : ${min} : ${secs}`;	
		},1000)
	}

}



class XchemesAll {

	constructor (selector) {
		this.selector = selector;
	}

	style(object) {
		let element, prop = Object.keys(object), css = [],
		value = Object.values(object);
		element = document.querySelectorAll(this.selector);
		css.push(prop, value)

		for(let i in css[0]){
			styles(css[0][i], css[1][i])
		}

		function styles(prop, value) {
			Array.from(element).forEach(element => element.style.setProperty(prop, value))
		}
	}

	animate(object, otherObject) {
		let d = otherObject, element, prop = Object.keys(object), css = [],
		value = Object.values(object);
		
		if (d == null || d == undefined) {
			d = {duration: 400, delay: 0, type: 'ease'}
		}
		if (d.duration == null || d.duration == undefined) {
			d.duration = 400;
		}
		if (d.delay == null || d.delay == undefined) {
			d.delay = 0;
		}
		if (d.type == null || d.type == undefined) {
			d.type = 'ease';
		}

		element = document.querySelectorAll(this.selector);
		css.push(prop, value)

		for(let i in css[0]){
			styles(css[0][i], css[1][i])
		}

		function styles(prop, value) {
			setTimeout( () => {
				Array.from(element).forEach(element => {
					element.style.setProperty(prop, value);
					element.style.transition = `${d.type}`;
					element.style.transitionDuration = `${d.duration}ms`
				})
			}, d.delay)
		}	
	}

	event(event, action) {
		let element = document.querySelectorAll(this.selector);
		Array.from(element).forEach(element => element.addEventListener(`${event}`, action))
	}	

}