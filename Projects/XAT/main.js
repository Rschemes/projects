// NOTE: XCHEMES LIBRARY WAS USED IN THIS CODE -- THEREFORE,
// THERE MAYBE SYNTAXES YOU'LL SEE THAT YOU ARE NOT FAMILIAR WITH

// Declaration of some varibles
const container = Gi.selector('.container'),
grandMean = Gi.selector('.grand-mean');


// Click Event Listener to create new table rows
Gi.event('#create-table', 'click', () => makeTables(Gi.selector('.options input').value));


// function that is activeted by the above event listener

function makeTables(number){
	let output = document.createElement('div');

	if (number > 100) {
		Gi.selector('.message').innerText = "Sorry, value can't be above 100";
		Gi.classToggle('.message', 'show-error');
		setTimeout(() => Gi.classToggle('.message', 'show-error'),3000);
	}else{
		for(let i = 1; i <= number; i++){
		output.innerHTML += `
			<div class="body">
				<label contenteditable="true">${i}</label>
				<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text"> <span id="plus" title="click to increase"> + </span></label>
				<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text"> <span id="plus" title="click to increase"> + </span></label>
				<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text"> <span id="plus" title="click to increase"> + </span></label>
				<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text"> <span id="plus" title="click to increase"> + </span></label>
				<label id="total" title="click to show result"></label>
				<label id="mean" title="click to show result"></label>
				<label id="stan-dev" title="click to show result"></label>
				<label id="remove"> <span title="Remove row">X</span></label>
			</div>`;
		}
		
		Gi.classToggle('.message', 'show-success')
		Gi.selector('.message').innerText = `${number} row(s) added Succesfully`;
		setTimeout(() => Gi.classToggle('.message', 'show-success'),3000);
		container.insertBefore(output, grandMean);
		let body = Gi.selectorAll('.body');
		Array.from(body).forEach((body, index) => body.children[0].innerText = `${index + 1}`);

		// declaration of some of the dynamically generated variables
		let inputs = Gi.selectorAll('.body #input'),
		removes = Gi.selectorAll('.body #remove'),
		totals = Gi.selectorAll('.body #total'),
		means = Gi.selectorAll('.body #mean'),
		stanDevs = Gi.selectorAll('.body #stan-dev');

		// ForEach loop used to loop through all the variables
		Array.from(inputs).forEach(input => {
			let minus = input.querySelector('#minus'),
			plus = input.querySelector('#plus'),
			inputValue = input.querySelector('input');

			// keypress event listener on the input tags
			inputValue.onkeypress = () => {
				setTimeout(() => total(inputValue), 10)
			}

			// click event listener on the minus button tag
			minus.onclick = () => {
				inputValue.value--;
				total(minus);
			};

			// click event listener on the plus button tag
			plus.onclick = () => {
				inputValue.value++;
				total(plus);
			};
		})


		// More forEach loops
		Array.from(removes).forEach(remove => remove.onclick = () =>{
			remove.parentElement.remove();
			grand_Mean(document.querySelector('#mean'));
			let body = Gi.selectorAll('.body');
			Array.from(body).forEach((body, index) => body.children[0].innerText = `${index + 1}`);
			Gi.classToggle('.message', 'show-success')
			Gi.selector('.message').innerText = 'One row removed Succesfully';
			setTimeout(() => Gi.classToggle('.message', 'show-success'),3000);
		})

		Array.from(totals).forEach(total => total.onclick = () => manualTotal(total))
		Array.from(means).forEach(mean => mean.onclick = () => manualMean(mean))
		Array.from(stanDevs).forEach(stan => stan.onclick = () => manualSD(stan))

	}
}


// Function for caculating the total value of all input fields in each row

function total(ar) {
	let inputs = ar.parentElement.parentElement.querySelectorAll('#input input'),
	total = Array.from(inputs).reduce((total, input) => input.value*1 + total, 0);
	ar.parentElement.parentElement.querySelector('#total').innerText = total;
	mean(ar, inputs, total);
}

// Function for caculating the group Mean for each row
function mean(ar, a, b) {
	let summationF = a[0].value*4 + a[1].value*3 + a[2].value*2 + a[3].value*1,
	mean = summationF / b;
	ar.parentElement.parentElement.querySelector('#mean').innerText = mean.toFixed(2);
	stanDev(ar, mean, a, b);
	grand_Mean(ar);
}

// Function for caculating the standard Deviation for each row
function stanDev(ar, mean, values, total) {
	let f1 = values[0].value*1,
	f2 = values[1].value*1,
	f3 = values[2].value*1,
	f4 = values[3].value*1,
	n = total - 1,
	v1 = f1 * Math.pow(4 - mean, 2), 
	v2 = f2 * Math.pow(3 - mean, 2),
	v3 = f3 * Math.pow(2 - mean, 2),
	v4 = f4 * Math.pow(1 - mean, 2),
	summation = v1 + v2 + v3 + v4,
	variance = summation/n,
	stanDev = Math.sqrt(variance);
	ar.parentElement.parentElement.querySelector('#stan-dev').innerText = stanDev.toFixed(2);
}

// Function for caculating the overall mean of the table
function grand_Mean(means) {
	let meanss = means.parentElement.parentElement.parentElement.querySelectorAll('#mean'),
	sumOfMeans = Array.from(meanss).reduce((total, mean) => mean.innerHTML*1 + total, 0),
	grandMean = sumOfMeans / meanss.length;
	Gi.selector('#grand-mean').innerText = grandMean.toFixed(2);
}

// Deleting all XAT table rows
Gi.event('#del-all', 'click', () =>{
	let body = Gi.selectorAll('.container .body');
	for (let i = 0; i < body.length; i++) {
		body[i].remove();
	}
});

// Opening Help
Gi.event('#help', 'click', () => {
	Gi.style('.help', {display: 'block'});
});

// Closing Help
Gi.event('.help span', 'click', () => {
	Gi.style('.help', {display: 'none'});
})


// MAIN CODE ENDS HERE

// THE FUNCTIONS BELOW ARE TO PREVENT REDUNDANCY..

function manualTotal(total) {
	let inputs = total.parentElement.querySelectorAll('#input input'),
	totals = Array.from(inputs).reduce((total, input) => input.value*1 + total, 0);
	total.innerText = totals;
}

function manualMean(mean) {
	let inputs = mean.parentElement.querySelectorAll('#input input'),
	totals = Array.from(inputs).reduce((total, input) => input.value*1 + total, 0),
	summationF = inputs[0].value*4 + inputs[1].value*3 + inputs[2].value*2 + inputs[3].value*1,
	mMean = summationF / totals;
	mean.innerText = mMean.toFixed(2);
	grand_Mean(mean);
}

function manualSD(stan) {
	let inputs = stan.parentElement.querySelectorAll('#input input'),
	total = Array.from(inputs).reduce((total, input) => input.value*1 + total, 0),
	summationF = inputs[0].value*4 + inputs[1].value*3 + inputs[2].value*2 + inputs[3].value*1,
	mean = summationF / total,

	f1 = inputs[0].value*1,
	f2 = inputs[1].value*1,
	f3 = inputs[2].value*1,
	f4 = inputs[3].value*1,
	n = total - 1,
	v1 = f1 * Math.pow(4 - mean, 2), 
	v2 = f2 * Math.pow(3 - mean, 2),
	v3 = f3 * Math.pow(2 - mean, 2),
	v4 = f4 * Math.pow(1 - mean, 2),
	summation = v1 + v2 + v3 + v4,
	variance = summation/n,
	stanDev = Math.sqrt(variance);
	stan.innerText = stanDev.toFixed(2);
}

// Creating a table that can be copied to word, excel etc..

Gi.event('#to-table', 'click', () => createWordTable());

function createWordTable() {
	let body = Gi.selectorAll('.container .body'),
	table = document.createElement('table'),
	tbody = document.createElement('tbody'),
	tEnd = document.createElement('tbody');
	Gi.style(tbody, {'text-align': 'center'});
	Gi.style(tEnd, {'text-align': 'center'});
	table.border= "1px";
	table.innerHTML += `
		<tr id="heading">
			<th> S/N </th>
			<th> SA </th>
			<th> A </th>
			<th> D </th>
			<th> SD </th>
			<th> Total </th>
			<th> Mean </th>
			<th> Stan Dev </th>
		</tr>
	`;
	body.forEach(body => wordTable(body, table, tbody, tEnd))
}

function wordTable(body, table, tbody, tEnd) {
	tbody.innerHTML += `
		<tr id="heading">
			<td>${body.children[0].innerText} </td>
			<td> ${body.children[1].querySelector('input').value} </td>
			<td> ${body.children[2].querySelector('input').value} </td>
			<td> ${body.children[3].querySelector('input').value} </td>
			<td> ${body.children[4].querySelector('input').value}</td>
			<td> ${body.children[5].innerText} </td>
			<td> ${body.children[6].innerText} </td>
			<td> ${body.children[7].innerText} </td>
		</tr>
	`;
	tEnd.innerHTML = `
		<tr id="heading">
			<th span colspan="6"> Grand Mean </th>
			<th> ${body.parentElement.parentElement.querySelector('#grand-mean').innerText} </th>
			<th> </th>
		</tr>
	`;
	table.appendChild(tbody);
	table.appendChild(tEnd);
	Gi.selector('.to-table').appendChild(table);
	Gi.style('.to-table', {display: 'grid'});
}

// closing Word table
Gi.event('.to-table span', 'click', (e) =>{
	let tables = Gi.selectorAll('.to-table table');
	console.log(tables);
	for (let i = 0; i < tables.length; i++) {
		tables[i].remove();
	}
	Gi.style('.to-table', {display: 'none'});
})

// IMPorting tables from external sources

Gi.event('nav #to-XAT', 'click', ()=> {
	let trs = Gi.selectorAll('.import table tbody tr');
	trs.forEach((tr, index) => makeXATTable(tr, trs, index));
	setTimeout(() => grand_Mean(document.querySelector('#mean')), 1000);
	Gi.classToggle('.message', 'show-success')
	Gi.selector('.message').innerText = `${trs.length} row(s) added Succesfully`;
	setTimeout(() => Gi.classToggle('.message', 'show-success'),3000);
	Gi.selector('.import').innerHTML = '';
});


function makeXATTable(tr, trs, index){
	let output = document.createElement('div');
	if (tr.children.length == 4) {
		output.innerHTML += `
		<div class="body">
			<label contenteditable="true">${index+1}</label>
			<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text" value="${tr.children[0].innerText}"> <span id="plus" title="click to increase"> + </span></label>
			<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text" value="${tr.children[1].innerText}"> <span id="plus" title="click to increase"> + </span></label>
			<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text" value="${tr.children[2].innerText}"> <span id="plus" title="click to increase"> + </span></label>
			<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text" value="${tr.children[3].innerText}"> <span id="plus" title="click to increase"> + </span></label>
			<label id="total" title="click to show result"></label>
			<label id="mean" title="click to show result"></label>
			<label id="stan-dev" title="click to show result"></label>
			<label id="remove"> <span title="Remove row">X</span></label>
		</div>`;
	}else if (tr.children.length == 5) {
		output.innerHTML += `
		<div class="body">
			<label contenteditable="true">${tr.children[0].innerText}</label>
			<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text" value="${tr.children[1].innerText}"> <span id="plus" title="click to increase"> + </span></label>
			<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text" value="${tr.children[2].innerText}"> <span id="plus" title="click to increase"> + </span></label>
			<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text" value="${tr.children[3].innerText}"> <span id="plus" title="click to increase"> + </span></label>
			<label id="input"><span id="minus" title="click to reduce"> - </span> <input type="text" value="${tr.children[4].innerText}"> <span id="plus" title="click to increase"> + </span></label>
			<label id="total" title="click to show result"></label>
			<label id="mean" title="click to show result"></label>
			<label id="stan-dev" title="click to show result"></label>
			<label id="remove"> <span title="Remove row">X</span></label>
		</div>`;
	}else{
		output.innerHTML = `199 ERROR!! - ${trs.length} columns detected`;
	}

		container.insertBefore(output, grandMean);

		// declaration of some of the dynamically generated variables
		let body = Gi.selectorAll('.body');
		Array.from(body).forEach((body, index) => body.children[0].innerText = `${index + 1}`);
		let inputs = Gi.selectorAll('.body #input'),
		removes = Gi.selectorAll('.body #remove'),
		totals = Gi.selectorAll('.body #total'),
		means = Gi.selectorAll('.body #mean'),
		stanDevs = Gi.selectorAll('.body #stan-dev');

		// ForEach loop used to loop through all the variables
		Array.from(inputs).forEach(input => {
			let minus = input.querySelector('#minus'),
			plus = input.querySelector('#plus'),
			inputValue = input.querySelector('input');

			// keypress event listener on the input tags
			inputValue.onkeypress = () => {
				setTimeout(() => total(inputValue), 10)
			}
			// No event listener
			// Done to auto generate the total, mean and stamdard deviation 
			//from imported table data 
				total(inputValue);

			// click event listener on the minus button tag
			minus.onclick = () => {
				inputValue.value--;
				total(minus);
			};

			// click event listener on the plus button tag
			plus.onclick = () => {
				inputValue.value++;
				total(plus);
			};
		})

		// More forEach loops
		Array.from(removes).forEach(remove => remove.onclick = () =>{
			remove.parentElement.remove();
			grand_Mean(document.querySelector('#mean'));
			Gi.classToggle('.message', 'show-success')
			Gi.selector('.message').innerText = 'One row removed Succesfully';
			setTimeout(() => Gi.classToggle('.message', 'show-success'),3000);
		})

		Array.from(totals).forEach(total => total.onclick = () => manualTotal(total))
		Array.from(means).forEach(mean => mean.onclick = () => manualMean(mean))
		Array.from(stanDevs).forEach(stan => stan.onclick = () => manualSD(stan))
}



