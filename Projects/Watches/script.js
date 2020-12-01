//	DEFINING SOME FUNCTIONS	
function addSlidesToDOM(slide){
	document.querySelector('.watch-slide .slider').innerHTML += `
		<div class="slides">
			<p>${slide.text}</p>
			<img src="${slide.img}">
		</div>
	`;
}

function addBoxesToDOM(box){
	document.querySelector('.watches-box').innerHTML += `
	<div class="watches">
		<img src="${box.img}">
		<p> ${box.p}</p>
		<span class="old-price"> ${box.oldPrice} </span>
		<span class="price"> ${box.price} </span>
		<span class="add-to-cart"> Add to Cart </span>
		<input type="hidden" value="${box.id}">
	</div>
	`;
}

function startSlider(){
	let slider = document.querySelector('.watch-slide .slider');
	let width = slider.firstElementChild.clientWidth;
	setInterval(()=>{
		if(x < sliderContent.length){
			slider.style.transition = '.5s ease';
			slider.style.transform = 'translateX('+ -width*x +'px)';
			thumbNail.forEach(thumbnail => thumbnail.style.background = 'var(--clear)');
			thumbNail[x].style.background = 'var(--main)';
			x++;
		}else{
			slider.style.transition = 'none';
			x = 0;
			slider.style.transform = 'translateX(0px)';
		}
	},3000);
}

function activeListItem() {
	Array.from(liList).forEach(list => list.onclick = (e) =>{
		Array.from(liList).forEach(list => list.classList.remove('active'))
		list.classList.add('active');
		if (list.firstElementChild.classList.contains('view-cart')) {
			showCart();
		}
	})
}

function showCart() {
	let cartWidth = document.querySelector('.cart').clientWidth;
	document.querySelector('.cart').style.transform = 'translateX(0)';
	document.querySelector('.container').style.transform = 'translateX(-'+cartWidth+'px)';
	blanket.style.display = 'block';

}

function hideCart() {
	document.querySelector('.cart').style.transform = 'translateX(100%)';
	document.querySelector('.container').style.transform = 'translateX(0)';
	Array.from(liList).forEach(list => list.classList.remove('active'));
	liList[0].classList.add('active');
	blanket.style.display = 'none';
}

function addToCart(e){
	if (e.target.classList.contains('add-to-cart')) {
		const itemToBuy = e.target.parentElement;
		numberOfCartItems('plus');
		cartItems(itemToBuy.querySelector('img').src, itemToBuy.querySelector('p').textContent, itemToBuy.querySelector('.price').textContent, itemToBuy.querySelector('input').value);
		totalPrice();
		e.target.classList.add('added-to-cart');
		e.target.textContent = 'Added-to-cart';
	}

}

function numberOfCartItems(param) {
	if (param === 'plus') {
		noOfCartItems++;
	}else{
		noOfCartItems--;
	}
	if (noOfCartItems == 0) {
		document.querySelector('.view-cart').innerHTML = ` View Cart`;
	}else{
		document.querySelector('.view-cart').innerHTML = ` View Cart <span>${noOfCartItems}</span>`;
	}
}

function cartItems (itemImg, description, price, id) {
	let cartC = document.querySelector('.cart');
	let cartIT = document.createElement('div');
	cartIT.classList.add('cart-items');
	let totalPrice = document.querySelector('.total-price');
	cartIT.innerHTML = `
		<img src="${itemImg}">
		<div>
			<p class="des">${description}</p>
			<span> Quant:<input type="number" min="1" max="100" step="5" value="1" class="quantity"></span>
			<p class="amount">N<span>${price}</span><input type="hidden" value="${price}"></p>
		</div>
		<span class="close-cartItem"> X </span>
		<input type="hidden" value="${id}">`;
	cartC.insertBefore(cartIT, totalPrice);
}

function cartFunctionality() {
	cart.onclick = (e) => {
		if (e.target.classList.contains('quantity')) {
			itemPrice(e.target);
		}

		if (e.target.classList.contains('close-cartItem')) {
			deleteItem(e.target);
		}
	}
}

function itemPrice(input) {
	solve(input);
	input.onkeyup = () => solve(input);
	function solve(input) {
		let amount = input.parentElement.nextElementSibling.querySelector('span');
		let fixedPrice = input.parentElement.nextElementSibling.querySelector('input').value;
		let newPrice = fixedPrice * input.value;
		amount.textContent = newPrice;
		totalPrice();
	}
}

function totalPrice() {
	let prices = cart.querySelectorAll('.cart-items div .amount span');
	let totalPrice = document.querySelector('#answer');
	let total = Array.from(prices).reduce((total, price) => (price.innerHTML * 1) + total, 0);
	totalPrice.textContent = total;
}

function deleteItem(delBtn) {
	checkIfInCart(delBtn.nextElementSibling.value);
	let cartIt = delBtn.parentElement;
	cartIt.remove();
	numberOfCartItems('minus');
	totalPrice();
}

function checkIfInCart(id) {
	let watches = document.querySelectorAll('.watches-box .watches');
	watches.forEach(watch => {
		if (watch.querySelector('input').value === id) {
			watch.querySelector('.add-to-cart').classList.remove('added-to-cart');
			watch.querySelector('.add-to-cart').textContent = 'Add to Cart';
		}
	})
}

function search(e) {
	e.preventDefault();
	let query = document.querySelector('#search-box').value;
	query = query.toLowerCase();
	if (query < 1) {
		console.log('search box be empty..');
	}else{
		watchSlider.classList.toggle('hide-slider');
		document.querySelector('.watches-box').innerHTML = '';
		let result = Array.from(watchesBoxContent).filter(watches => {
			return watches.p.toLowerCase().match(query);
		})
		searchResult(result);
	}
}

function searchResult(result) {
	document.querySelector('.container h2').innerHTML = `<span id="return-btn">Back</span> (${result.length}) Result(s) Found`;
	result.forEach(box => addBoxesToDOM(box));
	returnBtn = document.querySelector('#return-btn');
	returnBtn.onclick = returnBack;
}

function returnBack() {
	watchSlider.classList.toggle('hide-slider');
	document.querySelector('.watches-box').innerHTML = '';
	document.querySelector('.container h2').innerHTML = 'Most Recent';
	watchesBoxContent.forEach(box => addBoxesToDOM(box));
}

function expand() {
	document.querySelector('.top-bar').classList.toggle('expand');
}

//Calling functions
activeListItem();
sliderContent.forEach(slide => addSlidesToDOM(slide));
setTimeout(startSlider, 3000);
thumbNail.forEach((thumbNail, index) => thumbNail.onclick = () => x = index);
watchesBoxContent.forEach(box => addBoxesToDOM(box));
document.onclick = addToCart;
closeCart.onclick = hideCart;
blanket.onclick = hideCart;
cartFunctionality();
document.querySelector('.search').onsubmit = search;
document.querySelector('.menu-btn').onclick = expand;