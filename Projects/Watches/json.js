const sliderContent = [
	{text: 'Our website offers the best product', 	img: 'images/bg1.jpg'},
	{text: 'Greatest watches ever', 				img: 'images/bg2.jpg'},
	{text: 'Nice & extremely comfortable', 			img: 'images/bg3.jpg'},
	{text: 'Accurate with state of the art design', img: 'images/bg4.jpg'},
	{text: 'Free for all sexes', 					img: 'images/bg5.jpg'},
	{text: 'Quality and longevity', 				img: 'images/bg6.jpg'},
	{text: 'Unmatched quality of products', 		img: 'images/bg7.jpg'},
	{text: 'Affordable high end watches', 			img: 'images/bg8.jpg'},
	{text: 'Our website offers the best product', 	img: 'images/bg1.jpg'}
];

const watchesBoxContent = [
	{img: 'images/1_2.jpg', p: 'Multifunction chronograph analog', 	oldPrice: '1,400', price: '2200', id:"acXcz"},
	{img: 'images/1_3.jpg', p: "Lion Head Gold Steel Men's Wrist Watch -full", oldPrice: '1,500', price: '2300', id:"ac10j"},
	{img: 'images/1_4.jpg', p: '2Pcs Couple Watch Leather strap Calenders', oldPrice: '1,600', price: '2400', id:"acf5k"},
	{img: 'images/1_5.jpg', p: 'Black Silver Plated Luxury Watch', 	oldPrice: '1,700', price: '2500', id:"accPP"},
	{img: 'images/img3.jpg', p: 'Gucci white chain wrist watch', oldPrice: '1,800', price: '2600', id:"acXiq"},
	{img: 'images/img1.jpg', p: 'Silver chain wrist watch', oldPrice: '1,900', price: '2700', id:"ac5d1"},
	{img: 'images/1_8.jpg', p: 'Exotic Men Women unisex Rhinestone Wrist Watch', oldPrice: '2,000', price: '2800', id:"ac90m"},
	{img: 'images/img5.jpg', p: 'Silver chain analogue Gucci wrist watch', oldPrice: '2,100', price: '2900', id:"ac2eR"}
];

let watchSlider = document.querySelector('.watch-slide');
let thumbNail = document.querySelectorAll('.thumbnails span');
let watchesBox = document.querySelector('.watches-box'); 
let watches = document.querySelectorAll('.watches');
let x = 0;
let noOfCartItems = 0;
let navList = document.querySelector('.nav-items');
let liList = document.querySelectorAll('.nav-items li');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('.cart-a');
let blanket = document.querySelector('.blanket');
let returnbtn;