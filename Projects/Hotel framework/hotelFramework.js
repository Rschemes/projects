/* fresh code*/

// FORM RELATED CODES (IN JQUERY)!!!

	//makes form visible/ invisible
$('#make-signUp-dropDown').click(function(){
	$('.dropdown').toggleClass('active-dd');
})
	//makes form invisible
$('#close-dropdown').click(function(){
	$('.dropdown').toggleClass('active-dd');
})
	//shows login form
$('#ct-signIn').click( () => {
	$('#sign-in-dropDown').slideDown();
	$('#ct-signUp').show();
	$('#sign-up-dropDown').slideUp();
	$('#ct-signIn').hide();
})
	//shows sign up form
$('#ct-signUp').click( () => {
	$('#sign-up-dropDown').slideDown();
	$('#ct-signIn').show();
	$('#sign-in-dropDown').slideUp();
	$('#ct-signUp').hide();
})



// slider related codes
$('.destination').slideToggle();
$('.pre-footer p img').click( () => {
	$('.destination').slideToggle();
	$('.pre-footer p img').toggleClass('spin');
})

$('.destination-dropDown').click( () => {
	$('.destination').slideToggle();
	$('.pre-footer p img').toggleClass('spin');
})

let incrementer = 1;

let firstImg = document.querySelector('#pic1').cloneNode('true');
let secImg = document.querySelector('#pic2').cloneNode('true');
let thirdImg = document.querySelector('#pic3').cloneNode('true');

document.querySelector('.slider').append(firstImg);
document.querySelector('.slider').append(secImg);
document.querySelector('.slider').append(thirdImg);

function slide(param) {
	setInterval(() =>{
		if (param === 'pos') {
			incrementer++;
		}else{
			incrementer --;
		}
		if (incrementer >= 5) {
			if (document.querySelector('.displayed-images').clientWidth <= 500) {
				document.querySelector('.slider').style.transform = `translateX(-100%)`;
			}else{
				document.querySelector('.slider').style.transform = `translateX(-86%)`;
			}
		document.querySelector('.slider').style.transition = 'none';
			incrementer = 1;
		}else{
			document.querySelector('.slider').style.transform = `translateX(-${firstImg.clientWidth*incrementer}px)`;
			document.querySelector('.slider').style.transition = 'ease 2s';
		}
	}, 3500)
	
}

window.onload = () => slide('pos');
