// IMAGE SLIDER CODE

let img = 0,
images = [],
time = 3000,
imageSlide = document.querySelector('.image-slide'),
thumbNail = imageSlide.querySelectorAll('.thumbnail-cont .thumbnail');

images[0] = 'url(images/slide1.jpg)';
images[1] = 'url(images/slide2.jpg)';
images[2] = 'url(images/slide3.jpg)';
images[3] = 'url(images/slide4.jpg)';

function changeImg(){
	$(document).ready(function () {
		$('.image-slide').css({
			'background-position': 'center',
			'background-size': '100% 100%',
			'background-repeat': 'no-repeat'
		})
	})

	imageSlide.style.background = images[img];

	thumbNail.forEach(thumbnail => thumbnail.style.background = 'white')
	thumbNail[img].style.background = 'rgba(0,150,0)';

	if( img < images.length - 1){
		img++;
	}else{
		img = 0;
	}

	setTimeout("changeImg()", time);
}


window.onload = changeImg;

/*
$(document).ready(function () {

// IMAGE SLIDER CODE With JQuery
var $img = 0;
var $images = [];
var time = 3000;
var $imageSlide = $('.image-slide');
var $thumbNail = $imageSlide.find('.thumbnail-cont .thumbnail');

$images[0] = 'url(images/slide1.jpg)';
$images[1] = 'url(images/slide2.jpg)';
$images[2] = 'url(images/slide3.jpg)';
$images[3] = 'url(images/slide4.jpg)';

function changeImg () {
	$imageSlide.css({
		background: 'url(images/slide1.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundSize:'cover',
		backgroundPosition: 'center'
	})

	setInterval(function () {
	$imageSlide.css({
		background: $images[$img],
		backgroundRepeat: 'no-repeat',
		backgroundSize:'cover',
		backgroundPosition: 'center'
	})
	

	for (var i = 0; i < $thumbNail.length; i++) {
		$thumbNail[i].classList.remove('active');
	}

	$thumbNail[$img].classList.add('active');

	if( $img < $images.length - 1){
		$img++;
	}else{
		$img = 0;
	}

}, time)
}

changeImg();


})

*/
