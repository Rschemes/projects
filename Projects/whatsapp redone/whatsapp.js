// DEFINING SOME VARIABLES

const container = document.querySelector('.container'),
header = document.querySelector('.container .header'),
section = document.querySelector('.container .section'),
searchBar = document.querySelector('.search-bar'),
closeSearchBtn = document.querySelector('.search-bar img'),
menuBar = document.querySelector('.menu-bar'),
searchButton = document.querySelector('#tsc-search'),
menuButton = document.querySelector('#tsc-menu'),
cover = document.querySelector('.cover'),
navItems = document.querySelectorAll('.nav-items li'),
slider = document.querySelector('.slider span'),
categorySlider = document.querySelector('.cat-slider'),
chats = document.querySelector('.chats'),
Dp = document.querySelector('.profile-picture'),
date = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
openChat = document.querySelector('.open-chat'),
openChatProfile = document.querySelector('#show-profile'),
openChatName = document.querySelector('.open-chat-nav-bar h2'),
openChatMessage = document.querySelector('#text-area p'),
openChatDate = document.querySelector('#text-area span'),
backTochat = document.querySelector('.back-to-chat-n-profile'),
openChatPhoneNVideoCall = document.querySelectorAll('.open-chat .ocnb-options img'),
noCall = document.querySelector('.no-call'),
noCallClose = document.querySelector('.call-message a'),
chatInfo = document.querySelector('.chat-info'),
closeChatInfo = document.querySelector('#close-chat-info'),
backImgClass = document.querySelector('.back-img-info'),
backImgId = document.querySelector('#back-img-info'),
backImgIdHeadin = document.querySelector('#back-img-info h1');


const contacts = [
	{name: 'Joshua', profilePicture: 'images/p1.jpg', dateOfMessage: `${date}`, recentMessage: 'Ugo, Boss man, awfa?'},
	{name: 'Joy', profilePicture: 'images/p2.jpg', dateOfMessage: `${date}`, recentMessage: 'Ive missed you'},
	{name: 'Pauline', profilePicture: 'images/p3.jpg', dateOfMessage: `${date}`, recentMessage: 'dont talk to me when my aunty is around'},
	{name: 'James', profilePicture: 'images/p4.jpg', dateOfMessage: `${date}`, recentMessage: 'Man, long time'},
	{name: 'Saint', profilePicture: 'images/p5.jpg', dateOfMessage: `${date}`, recentMessage: 'We sell quality paint'},
	{name: 'Favour', profilePicture: 'images/p6.jpg', dateOfMessage: `${date}`, recentMessage: 'Doing anything i can lay my hands on'},
	{name: 'Tony', profilePicture: 'images/p7.jpg', dateOfMessage: `${date}`, recentMessage: 'Man U played ball'},
	{name: 'Ugochi', profilePicture: 'images/p8.jpg', dateOfMessage: `${date}`, recentMessage: 'Baby'},
	{name: 'Papa', profilePicture: 'images/p9.jpg', dateOfMessage: `${date}`, recentMessage: 'I no be run away solider'},
	{name: 'Stella', profilePicture: 'images/p10.jpg', dateOfMessage: `${date}`, recentMessage: 'Yes, Ugo, i do'}
]

function cc() {
	backImgClass.style.width = `${backImgClass.parentElement.clientWidth}px`;
	backImgClass.style.left = `${container.offsetLeft}px`;
}

container.onclick = (e) => {
	showSearchMenu(e)
}

cover.onclick = (e) => {
	hideSearchMenu();
}

closeSearchBtn.onclick = (e) => {
	hideSearchMenu();
}

navItems.forEach(navItem => navItem.onclick = () => {
	navItems.forEach(navItem => navItem.style = 'color: rgba(200,200,200, 0.6)')
	navItem.style = 'color: var(--text-primary)'
	goToNavItem(navItem)
})

contacts.forEach(contact => chatBoxes(contact))

// HIDE SEARCH BAR & MENU BAR 

function hideSearchMenu () {
	menuBar.style.display = 'none'
	cover.style.display = 'none'
	searchBar.style.display = 'none'
	header.classList.remove('shrink-header');
	container.classList.remove('shrink-container');
}

// SHOW SEARCH BAR OR MENU BAR 

function showSearchMenu (e) {
	if (e.target.id === 'tsc-menu') {
		menuBar.style.display = 'grid'
		cover.style.display = 'block'
	} 

	if (e.target.id === 'tsc-search') {
		searchBar.style.display = 'grid'
		header.classList.add('shrink-header');
		cover.style.display = 'block'
		container.classList.add('shrink-container');
	}
}



// NAVIGATE THE MENU OPTIONS 

function goToNavItem (navItem) {
	slider.style = `left : ${navItem.offsetLeft - 70}px;`;
	const camOption = navItem.id === 'camera' ? slider.style.width = '50px' : slider.style.width = '152px',
			chatOption = navItem.id === 'chats' ? categorySlider.style.left = '0' : false,
			statusOption = navItem.id === 'status' ? categorySlider.style.left = '-100%' : false,
			callsOption = navItem.id === 'calls' ? categorySlider.style.left = '-200%' : false
	return [camOption, chatOption, statusOption, callsOption]
}


// GENERATE CHAT BOXES 

function chatBoxes (contact) {
	chats.innerHTML +=`
<div class="chat-box">
	<img src="${contact.profilePicture}" id="contact-img">
		<div class="contacts-name-message">
			<h1> ${contact.name} </h1>
			<span> ${contact.dateOfMessage} </span>
			<p> ${contact.recentMessage} </p>
		</div>
</div> 
	`;
}
// THE FOLLOWING VARIABLES WERE DEFINED UNDER THE CHATBOXES 
// BECAUSE WE NEEDED THEM TO BE INITIALIED AFTER THEIR DYNAMIC CONTENT IS CREATED

const contactImages = document.querySelectorAll('.chats #contact-img'),
contactChat = document.querySelectorAll('.chats .contacts-name-message');

contactImages.forEach(contactImage => contactImage.onclick = () => viewPP(contactImage))

contactChat.forEach(contactChat => contactChat.onclick = () => {
	const contactParent = contactChat.parentElement,
	contactImg = contactParent.querySelector('#contact-img').src,
	contactName = contactParent.querySelector('h1').textContent,
	message = contactParent.querySelector('p').textContent,
	date = contactParent.querySelector('span').textContent;

// OPEN A CHAT PAGE FOR ANY CONTACT
	openAChat(contactImg, contactName, message, date)
})

// SHOW PROFILE PICTURE

function viewPP (image) {
	let text = image.nextElementSibling.querySelector('p').textContent,
		date = image.nextElementSibling.querySelector('span').textContent;
	Dp.style.display = 'grid';
	Dp.innerHTML = `
	<div class="pp-item">
		<h1 id="contacts-name"> ${image.parentElement.querySelector('h1').textContent} </h1>
		<img src="${image.src}">
		<div class="options">
			<img src="images/green message.png" id="green-message">
			<img src="images/green phone.png" id="green-phone">
			<img src="images/green video.png" id="green-video">
			<img src="images/green info.png" id="green-info">
		</div>
		</div>
		`;

	const greenMessage = document.querySelector('.pp-item #green-message'),
	greenPhone = document.querySelector('.pp-item #green-phone'),
	greenVideo = document.querySelector('.pp-item #green-video'), 
	greenInfo = document.querySelector('.pp-item #green-info'),
	chatName = document.querySelector('.pp-item #contacts-name').textContent,
	chatProfile = document.querySelector('.pp-item img');

// OPEN A CHAT PAGE FOR ANY CONTACT
	greenMessage.onclick = (e) => openAChat(chatProfile.src, chatName, text, date);

// OPEN A CHAT INFO PAGE FOR ANY CONTACT
	greenInfo.onclick = (e) => openContactInfo(chatName, chatProfile);
}

// HIDE PROFILE PIC 

Dp.onclick = (e) =>{
	if (e.target.classList.contains('profile-picture')) {
		 e.target.style.display = 'none';
	}else if (e.target.src.match('phone') || e.target.src.match('video')) {
		makeACall();
	}else{
	  return false
	}
}

// OPEN A CHAT PAGE FOR ANY CONTACT

function openAChat (openedChatImg, contactName, contactMessage, date) {
	openChatProfile.src = `${openedChatImg}`;
	openChatName.textContent = `${contactName}`;
	openChatMessage.textContent = `${contactMessage}`;
	openChatDate.textContent = `${date}`;
	openChat.classList.toggle('chat-opener')			
}

// HIDE / CLOSE THE OPEN CHAT PAGE
backTochat.onclick = () => openChat.classList.toggle('chat-opener')


// OPEN A CALL PAGE FOR ANY CONTACT
function makeACall () {
	noCall.classList.add('no-call-class');
}

makeACall();

// HIDE / CLOSE THE CALL PAGE 
noCall.onclick = (e) => {
	return (e.target.classList.contains('no-call') || e.target.tagName.match('A')) ? 
	noCall.classList.remove('no-call-class') : false
}

// MIMICKING WHATSAPP SCROLL ANIMATION

chatInfo.onscroll = () =>{

	if (chatInfo.scrollTop >= 290) {
		backImgIdHeadin.style = `background: var(--bg-primary); padding-left: 60px; font-size: 20px;`;
	}else if (chatInfo.scrollTop >= 280 && chatInfo.scrollTop < 290 ) {
		backImgIdHeadin.style = `background-color: rgba(120,180,120,1); padding-left: 50px; font-size: 25px;`;
	}else if(chatInfo.scrollTop >= 260 && chatInfo.scrollTop < 280 ) {
		backImgIdHeadin.style = `background-color: rgba(120,180,120,0.8); padding-left: 40px;`;
	}else if(chatInfo.scrollTop >= 240 && chatInfo.scrollTop < 270) {
		backImgIdHeadin.style = `background-color: rgba(120,180,120,0.6); padding-left: 35px;`;
	}else if(chatInfo.scrollTop >= 220 && chatInfo.scrollTop < 260) {
		backImgIdHeadin.style = `background-color: rgba(120,180,120,0.4); padding-left: 30px; font-size: 35px;`;
	}else{
		backImgIdHeadin.style = `background-color: transparent; padding-left: 15px; font-size: 35px;`;
	}

}

const openChatInfoBtn = document.querySelector('.open-chat h2'),
openChatContactImg = document.querySelector('.open-chat #show-profile');

openChatInfoBtn.onclick = () => openContactInfo(openChatInfoBtn.textContent, openChatContactImg)

// OPEN A CHAT INFO PAGE FOR ANY CONTACT
function openContactInfo (contactName, contactImage) {
	backImgIdHeadin.textContent = `${contactName}`;
	backImgId.style.backgroundImage = `url(${contactImage.src})`;
	chatInfo.classList.add('chat-info-opener');
	backImgClass.style = 'display: flex';
	cc();
}

// HIDE / CLOSE THE CHAT INFO PAGE 
closeChatInfo.onclick = (e) => {
	chatInfo.classList.remove('chat-info-opener');
	backImgClass.style = 'display: none';
}