document.querySelector('body').innerHTML += 
`<div class="security">
		<h1> SCHEMES VIRTUAL LIBRARY </h1>
		<h3>  </h3>
		<h4> Sign Up </h4>
	<div class="signUp">
		<div class="username">
			<label for="username"> <img src="images/user.png"> Chose a Username</label>
			<input type="text" name="" id="username">
		</div>
		<div class="password">
			<label for="password"> <img src="images/password.png"> Chose a Password</label>
			<input type="password" name="" id="password">
		</div>
		<div class="submit">
			<input type="submit" name="" value="Sign Up" id="submit-btn">
		</div>
	</div>

	<div class="signIn">
		<div class="signin-user">
			<img src="images/user.png">
			<h4>Okeke Ugochukwu</h4>
		</div>
		<div class="signin">
			<div class="password">
				<label for="password"> <img src="images/password.png"> Password: </label>
				<input type="password" name="" id="user-password">
			</div>
			<div class="submit">
				<input type="submit" name="" value="Sign IN" id="signin-btn">
			</div>
		</div>
	</div>
		
</div> `

let loginInfo,
security = document.querySelector('.security'),
signUp = document.querySelector('.security h4'),
signUpPage = document.querySelector('.signUp'),
signIn = document.querySelector('.signin-user h4'),
signInPage = document.querySelector('.signIn'),
message = document.querySelector('.security h3'),
password = document.querySelector('#password'),
username = document.querySelector('#username'),
signUpBtn = document.querySelector('#submit-btn'),
signInPsd = document.querySelector('#user-password'),
signInBtn = document.querySelector('#signin-btn');

if (localStorage.getItem('login') === null) {
	loginInfo = {}
	signUp.style.display = 'grid'
	signUpPage.style.display = 'grid'
	signInPage.style.display = 'none'
}else{
	loginInfo = JSON.parse(localStorage.getItem('login'))
	signUp.style.display = 'none'
	signUpPage.style.display = 'none'
	signInPage.style.display = 'grid'
	signIn.textContent = `${loginInfo.username}`
}

signUpBtn.onclick = () =>{
	if(username.value === '' || password.value === ''){
		userMessage('error', 'Sorry, Fields cannot be left empty')
	}else if(username.value.length > 1 && username.value.length < 5 || password.value.length > 1 && password.value.length < 5){
		userMessage('error', 'Username & Password must be more than 5 characters')
	}else{
		loginInfo = {username: username.value, password: password.value}
		userMessage('success', `Welcome ${loginInfo.username}`)
		removeSecurity()
		localStorage.setItem('login', JSON.stringify(loginInfo))
	}
}

signInBtn.onclick = () =>{
	if (signInPsd.value === loginInfo.password) {
		userMessage('success', `Welcome ${loginInfo.username}`)
		removeSecurity()
	}else{
		userMessage('error', 'Password is not correct, try again')
	}
}

function userMessage(messageClass, messages) {
	message.style.display = 'block';
	message.textContent = messages;
	message.classList.add(messageClass)
	setTimeout(()=> message.style.display = 'none',3000)
}

function removeSecurity() {
	setTimeout(()=> security.style.top = '-130vh',4000)
}
