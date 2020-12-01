let libraryBooks;
let borrowersList;

if (localStorage.getItem('BooksInLibrary') === null) {
	libraryBooks = [];
}else{
	libraryBooks = JSON.parse(localStorage.getItem('BooksInLibrary'));
}

if (localStorage.getItem('BorrowersInLibrary') === null) {
	borrowersList = [];
}else{
	borrowersList = JSON.parse(localStorage.getItem('BorrowersInLibrary'));
}

function Normalize(){
	let bNb = document.querySelector('.book-n-borrower'),
		bookSearch = document.querySelector('.book-search'),
		borrowersSearch = document.querySelector('.borrowers-search'),
		slider = document.querySelector('.slider span');

	bNb.style = `transform: translateX(0vw);`;
	bookSearch.style = `display: flex;`;
	borrowersSearch.style = `display: none;`;
}

window.onload = Normalize;

class Book {
	constructor (title, author, ISBN, callNumber, subtitle) {
		this.title = title; 
		this.author = author; 
		this.ISBN = ISBN; 
		this.callNumber = callNumber; 
		this.subtitle = subtitle
	}
}


class Borrower {
	constructor (borrowersName, borrowersAddress, borrowersNumber, dateBorrowed, bookTitle, bookAuthor, bookISBN, bookCallNumber) {
		this.borrowersName = borrowersName; 
		this.borrowersAddress = borrowersAddress; 
		this.borrowersNumber = borrowersNumber;
		this.dateBorrowed = dateBorrowed; 
		this.bookTitle = bookTitle; 
		this.bookAuthor = bookAuthor;
		this.bookISBN = bookISBN;
		this.bookCallNumber = bookCallNumber;
	}
}

class Menu{
	static slideEmAll(element){
		let bNb = document.querySelector('.book-n-borrower'),
		bookSearch = document.querySelector('.book-search'),
		borrowersSearch = document.querySelector('.borrowers-search'),
		slider = document.querySelector('.slider span');

		slider.style = `transform: translateX(${element.offsetLeft}px);`;

		if (element.className === 'book-btn') {
			bNb.style = `transform: translateX(0vw);`;
			bookSearch.style = `display: flex;`;
			borrowersSearch.style = `display: none;`;
		}

		if (element.className === 'borrowers-btn') {
			bNb.style = `transform: translateX(-100vw);`;
			bookSearch.style = `display: none;`;
			borrowersSearch.style = `display: flex;`;
			slider.style = `transform: translateX(${element.offsetLeft}px); width: ${element.offsetWidth - 50}px;`;
		}
	}


}

class UI {

//BOOK SIDE

	static addBook(book, index) {
		document.querySelector('#no-of-books').value = libraryBooks.length;
		document.querySelector('table tbody').innerHTML += `
				<tr class="table-body">
					<td>${index + 1}</td>
					<td>${book.title}</td>
					<td>${book.subtitle}</td>
					<td>${book.author}</td>
					<td>${book.ISBN}</td>
					<td>${book.callNumber}</td>
					<td id="options"><img src="images/options.png">
						<div class="options">
							<span id="edit"> <img src="images/edit.png"> <p>Edit</p> </span>
							<span id="add-borrower"> <img src="images/add borrower.png"> <p>Borrow book</p> </span>
							<span id="remove-book"> <img src="images/remove.png"> <p>Remove book</p> </span>
						</div>
					</td>
				</tr>
				<tr class="for-borrower">
					<td class="form-content">
						<label for="fb-name"> Borrowers Name: (<span>Required</span>)</label>
						<input type="text" id="fb-name" required>
					</td>
					<td class="form-content">
						<label for="fb-address"> Borrowers Address: (<span>Required</span>)</label>
						<input type="text" id="fb-address" required>
					</td>
					<td class="form-content">
						<label for="fb-number"> Borrowers Number: (<span>Required</span>)</label>
						<input type="text" id="fb-number" required>
					</td>
					<td class="form-content">
						<label for="fb-date"> Date Borrowed: (<span>Required</span>)</label>
						<input type="date" id="fb-date" required>
					</td>
					<td class="fb-btn-holder"> <button id="fb-btn"> Add Borrower</button> </td>
				</tr>
`;
	}

	static displayBook(book, index) {
		libraryBooks.forEach((book, index) => UI.addBook(book, index))
	}

	static editBook(editedBook) {
		let bookToEdit = editedBook.parentElement.parentElement.parentElement,
		editTitle = bookToEdit.children[1],
		editSubtitle = bookToEdit.children[2],
		editAuthor = bookToEdit.children[3],
		editISBN = bookToEdit.children[4],
		editCallNum = bookToEdit.children[5],
		bookIndex = bookToEdit.children[0].textContent -1,
		contents = bookToEdit.querySelectorAll('td');
		contents.forEach(content => content.setAttribute('contenteditable', 'true'))
		bookToEdit.children[0].removeAttribute('contenteditable');
		bookToEdit.children[6].removeAttribute('contenteditable');
		bookToEdit.children[6].innerHTML = `
		<button id="edit-save"> Save </button> <button id="edit-cancel"> Cancel </button>`;
	let saveOrCancel = bookToEdit.querySelectorAll('button');
	saveOrCancel.forEach(saveOrCancel => saveOrCancel.onclick = () => {
		if (saveOrCancel.id === 'edit-save') {
			let editedContent = new Book(editTitle.textContent, editAuthor.textContent, editISBN.textContent, 
				editCallNum.textContent, editSubtitle.textContent);
			libraryBooks.splice(bookIndex, 1, editedContent)
			UI.message('success', 'Book has been updated Successfully')
			Storage.addToStore();
		}else{
			let originalContent = libraryBooks[bookIndex];
			editTitle.textContent = originalContent.title;
			editSubtitle.textContent = originalContent.subtitle;
			editAuthor.textContent = originalContent.author;
			editISBN.textContent = originalContent.ISBN;
			editCallNum.textContent = originalContent.callNumber;
		}
		contents.forEach(content => content.removeAttribute('contenteditable', 'true'))
		bookToEdit.children[6].innerHTML = ` <img src="images/options.png">
		<div class="options">
			<span id="edit"> <img src="images/edit.png"> <p>Edit</p> </span>
			<span id="add-borrower"> <img src="images/add borrower.png"> <p>Borrow book</p> </span>
			<span id="remove-book"> <img src="images/remove.png"> <p>Remove book</p> </span>
		</div>`;
		UI.checkIfBorrowedOut()
	})

	}

	static borrowBook(bookBeingBorrowed){
		let parent = bookBeingBorrowed.parentElement.parentElement,
		bookTitle = parent.previousElementSibling.children[1].textContent,
		bookAuthor = parent.previousElementSibling.children[3].textContent,
		bookISBN = parent.previousElementSibling.children[4].textContent,
		bookCallNumber = parent.previousElementSibling.children[5].textContent,
		borrowersName = parent.querySelector('#fb-name').value,
		borrowersAddress = parent.querySelector('#fb-address').value,
		borrowersNumber = parent.querySelector('#fb-number').value,
		dateBorrowed = parent.querySelector('#fb-date').value,
		borroredBook = new Borrower(borrowersName, borrowersAddress, borrowersNumber, dateBorrowed, bookTitle, bookAuthor, bookISBN, bookCallNumber)

	if (borrowersName.length < 1 || borrowersAddress.length < 1 || borrowersNumber.length < 1 || dateBorrowed.length < 1) {
		UI.message('error', 'Please fill all fields')
	}else{
		borrowersList.push(borroredBook);
		UI.addBorrower(borroredBook, borrowersList.length-1); 
		UI.message('success', 'Book Successfully borrowed out')
		Storage.addBorrowerToStore()
		parent.classList.toggle('show-hide-for-borrower')
		UI.addBorrowedOut(parent.previousElementSibling.children[6])
		let inputs = parent.querySelectorAll('input');
		inputs.forEach(input => input.value = '')
	}

	}

	static addBorrowedOut(item) {
		item.querySelector('#add-borrower').classList.add('borrowered-out')
		item.querySelector('#add-borrower img').classList.toggle('span-img-flip');
		item.querySelector('#add-borrower p').textContent = 'Borrowed out'
	}

	static clearBorrowedOut(ISBNofBorrowedBook) {
		let books = document.querySelectorAll('table tbody .table-body');
		books.forEach(book => {
		let isbn = book.children[4].textContent;
		if (isbn.match(ISBNofBorrowedBook)) {
			book.querySelector('#options .options #add-borrower p').textContent = 'Borrow book'
			book.querySelector('#options .options #add-borrower').classList.toggle('borrowered-out')
		}  
		})
	}

	static checkIfBorrowedOut() {
	setTimeout(()=>{
		let books = document.querySelectorAll('table tbody .table-body');
		books.forEach(book => {
		let isbn = book.children[4];
		UI.check(isbn) })
	
	}, 1000)
			
	}

	static check(isbn) {
		let borrower = document.querySelectorAll('.borrowers-table .borrowers-table-body')
		borrower.forEach(borrower => {
		let borroweredBookISBN = borrower.children[2].children[2].textContent;
		if (borroweredBookISBN.match(isbn.textContent)) {
			isbn.parentElement.children[6].querySelector('#add-borrower').classList.add('borrowered-out')
			isbn.parentElement.children[6].querySelector('#add-borrower img').classList.toggle('span-img-flip');
			isbn.parentElement.children[6].querySelector('#add-borrower p').textContent = 'Borrowed out'
		}
		})
	}

	static removeBook(bookBeingRemoved) {
		let bbR = bookBeingRemoved.parentElement.parentElement.parentElement,
		bbRISBN = bbR.children[4].textContent;
		libraryBooks.forEach((book, index) => {
			if (book.ISBN.match(bbRISBN)) {
				libraryBooks.splice(index, 1);
			}
		})
		document.querySelector('#no-of-books').value = libraryBooks.length;
		bbR.remove() 
	}


//BORROWERS SIDE

	static addBorrower(borrower, index) {
		document.querySelector('#no-of-borrowers').value = borrowersList.length;
		document.querySelector('.borrowers-table').innerHTML +=	`
		<table class="borr-table">
		<tbody class="borrowers-table-body">
			<tr class="borrowers-head">
				<th>${index+1}</th>
				<th>${borrower.borrowersName}</th>
				<th> ${borrower.borrowersAddress} </th>
				<th> ${borrower.borrowersNumber} </th>
				<th> ${borrower.dateBorrowed} </th>
				<th id="arrow-holder" title='Click to show details of book borrowed'> <p class="switch" id="switch">Details of Book borrowed<p> <p id="arrow"> &#10094; </p>  </th>
				<th id="options"><img src="images/options.png">
						<div class="options">
							<span id="edit"> <img src="images/edit.png"> <p>Edit</p> </span>
							<span id="remove-book"> <img src="images/remove.png"> <p>Remove borrower</p> </span>
						</div>
				</th>
			</tr>
			<tr class="borrowers-book-details">
				<th>Book Borrowered</th>
				<th> Book Author</th>
				<th> Book ISBN</th>
				<th> Book Call Number</th>
			</tr>

			<tr class="borrowers-book-details">
				<td>${borrower.bookTitle}</td>
				<td>${borrower.bookAuthor}</td>
				<td>${borrower.bookISBN}</td>
				<td>${borrower.bookCallNumber}</td>
			</tr>
		</tbody>
		</table>`
}

	static displayBorrower(book, index) {
		borrowersList.forEach((book, index) => UI.addBorrower(book, index))
	}

	static showBookDetails(clicked) {
		let arrow;
		let bookDetails;
		let details = document.querySelectorAll('.borrowers-table .switch');

		Array.from(details).forEach(detail => {
		arrow = detail.parentElement.querySelector('#arrow');
		bookDetails = detail.parentElement.parentElement.parentElement.querySelectorAll('.borrowers-book-details');
		arrow.style = `transform: rotate(-90deg); `;
		bookDetails.forEach(bookDetail => bookDetail.classList.remove('active-book-detail'))
	})
		arrow = clicked.parentElement.querySelector('#arrow');
		bookDetails = clicked.parentElement.parentElement.parentElement.querySelectorAll('.borrowers-book-details');
		if (clicked.id === 'switch') {
			arrow.style = `transform: rotate(90deg); `;
			bookDetails.forEach(bookDetail => bookDetail.classList.add('active-book-detail'));
			clicked.id = 'unswitched';
		}else if (clicked.id === 'unswitched') {
			arrow.style = `transform: rotate(-90deg); `;
			bookDetails.forEach(bookDetail => bookDetail.classList.remove('active-book-detail'));
			clicked.id = 'switch';
		}
		
	}

	static editBorrower(editedBorrower) {
		let borrowerToEdit = editedBorrower.parentElement.parentElement.parentElement.parentElement,
		borrowersDs = borrowerToEdit.children[0],
		editBname = borrowersDs.children[1], editBaddress = borrowersDs.children[2],
		editBnumber = borrowersDs.children[3], editBdate = borrowersDs.children[4],
		bookDs = borrowerToEdit.children[2],
		editTitle = bookDs.children[0], editAuthor = bookDs.children[1],
		editISBN = bookDs.children[2], editCallNum = bookDs.children[3],
		borrowersIndex = borrowersDs.children[0].textContent -1,
		borrowerContents = borrowerToEdit.querySelectorAll('.borrowers-head th'),
		bookContents = borrowerToEdit.querySelectorAll('.borrowers-book-details td');
	
		borrowerContents.forEach(content => content.setAttribute('contenteditable', 'true'))
		borrowersDs.children[0].removeAttribute('contenteditable')
		borrowersDs.children[5].removeAttribute('contenteditable')
		borrowersDs.children[6].removeAttribute('contenteditable')
		bookContents.forEach(content => content.setAttribute('contenteditable', 'true'))
		borrowersDs.children[6].innerHTML = `
		<button id="edit-save"> Save </button> <button id="edit-cancel"> Cancel </button>`;
	let saveOrCancel = borrowerToEdit.querySelectorAll('button');
	saveOrCancel.forEach(saveOrCancel => saveOrCancel.onclick = () => {
		if (saveOrCancel.id === 'edit-save') {
			let editedContent = new Borrower(editBname.textContent, editBaddress.textContent, editBnumber.textContent,
			editBdate.textContent, editTitle.textContent, editAuthor.textContent, editISBN.textContent, editCallNum.textContent);
			borrowersList.splice(borrowersIndex, 1, editedContent)
			UI.message('success', 'Borrower has been successfully updated')
			Storage.addBorrowerToStore();
		}else{
			let originalContent = borrowersList[borrowersIndex];
			editTitle.textContent = originalContent.bookTitle, editAuthor.textContent = originalContent.bookAuthor,
			editISBN.textContent = originalContent.bookISBN, editCallNum.textContent = originalContent.bookCallNumber,
			editBname.textContent = originalContent.borrowersName, editBaddress.textContent = originalContent.borrowersAddress,
			editBnumber.textContent = originalContent.borrowersNumber, editBdate.textContent = originalContent.dateBorrowed;
		}
		
		borrowerContents.forEach(content => content.removeAttribute('contenteditable'))
		bookContents.forEach(content => content.removeAttribute('contenteditable'))
		borrowersDs.children[6].innerHTML = ` <img src="images/options.png">
		<div class="options">
			<span id="edit"> <img src="images/edit.png"> <p>Edit</p> </span>
			<span id="remove-book"> <img src="images/remove.png"> <p>Remove book</p> </span>
		</div>`;
	})

	}

	static removeBorrower(borrowerBeingRemoved) {
		let bbR = borrowerBeingRemoved.parentElement.parentElement.parentElement.parentElement,
		bbRISBN = bbR.children[2].children[2].textContent;
		UI.clearBorrowedOut(bbRISBN)
		borrowersList.forEach((borrower, index) => {
			if (borrower.bookISBN.match(bbRISBN)) {
				borrowersList.splice(index, 1);
			}
		})
		document.querySelector('#no-of-borrowers').value = borrowersList.length;
		bbR.remove()
	}

// GENERAL UI METHODS FOR BOTH 
	static message(messageClass, messageContent) {
		let body = document.querySelector('body'),
		textMessage = document.createElement('p');
		textMessage.classList.add(messageClass);
		textMessage.innerHTML = `${messageContent}`;
		body.appendChild(textMessage)
		setTimeout(() => textMessage.remove(), 3000);
	}

	static clearFields(element) {
	let parentElement = document.querySelector(element),
	inputs = parentElement.querySelectorAll('input')
	inputs.forEach(input => input.value = '')
	}
}

class Search {
	static searchBook(parameter, searchValue) {
		let search = searchValue.toLowerCase();
		let tableBody = document.querySelectorAll('table tbody .table-body');
		let count = 0;

	Array.from(tableBody).forEach(itemSearched => {
		let title = itemSearched.children[1].textContent.toLowerCase();
		let subtitle = itemSearched.children[2].textContent.toLowerCase();
		let author = itemSearched.children[3].textContent.toLowerCase();
		let isbn = itemSearched.children[4].textContent.toLowerCase();
		let callNumber = itemSearched.children[5].textContent.toLowerCase();
		itemSearched.style.display = 'none';
	if (parameter === 'All') {
		if (title.match(search) || subtitle.match(search) || author.match(search) || isbn.match(search) || callNumber.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}

	if (parameter === 'Title') {
		if (title.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}

	if (parameter === 'Author') {
		if (author.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}
	if (parameter === 'ISBN') {
		if (isbn.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}
	if (parameter === 'Call Number') {
		if (callNumber.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}
	if (parameter === 'Subtitle') {
		if (subtitle.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}
	document.querySelector('.book-bar h2').textContent = `${count} Result(s) Found`;

	})
	
	}


	static searchBorrower(parameter, searchValue) {
		let search = searchValue.toLowerCase();
		let borrTableBody = document.querySelectorAll('.borrowers-table .borrowers-table-body');
		let count = 0;

	borrTableBody.forEach(itemSearched => {
		let nameOfBorr = itemSearched.children[0].children[1].textContent.toLowerCase();
		let addOfBorr = itemSearched.children[0].children[2].textContent.toLowerCase();
		let numOfBorr = itemSearched.children[0].children[3].textContent.toLowerCase();
		let dateBorr = itemSearched.children[0].children[4].textContent.toLowerCase();
		let borrBook = itemSearched.children[2].children[0].textContent.toLowerCase();
		let authorBorr = itemSearched.children[2].children[1].textContent.toLowerCase();
		let isbnBorr = itemSearched.children[2].children[2].textContent.toLowerCase();
		let cnBoor = itemSearched.children[2].children[3].textContent.toLowerCase();
	itemSearched.style.display = 'none';

	if (parameter === 'All') {
		if(nameOfBorr.match(search) || addOfBorr.match(search) || numOfBorr.match(search) || dateBorr.match(search) || 
			borrBook.match(search) || authorBorr.match(search) || isbnBorr.match(search) || cnBoor.match(search)){
			itemSearched.style.display = 'grid';
			count++;
		}
	}

	if (parameter === 'Borrowers Name') {
		if (nameOfBorr.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}

	if (parameter === 'Borrowers Address') {
		if (addOfBorr.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}
	if (parameter === 'Borrowers Number') {
		if (numOfBorr.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}
	if (parameter === 'Date borrowed') {
		if (dateBorr.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}
	if (parameter === 'Book Title') {
		if (borrBook.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}

	if (parameter === 'Book Author') {
		if (authorBorr.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}

	if (parameter === 'Book ISBN') {
		if (isbnBorr.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}

	if (parameter === 'Book Call Number') {
		if (cnBoor.match(search)) {
		itemSearched.style.display = 'grid';
		count++;
		}
	}

	document.querySelector('.borrowers-bar h2').textContent = `${count} Result(s) Found`;
	})
	
	}

	static afterSearch(input, bar) {
		let inputElement = document.querySelector(input),
		barElement = document.querySelector(bar);
		inputElement.style = 'display: none'
		barElement.querySelector('#close-search').style.display ='block'
		document.querySelector('#no-of-books').value = libraryBooks.length;
		document.querySelector('#no-of-borrowers').value = borrowersList.length;
		let closeSearch = document.querySelectorAll('#bar #close-search');

		//RETURN BACK TO BOOK OR BORROWERS UL
		closeSearch.forEach(closeSearch => closeSearch.onclick = () =>{
		let parent = closeSearch.parentElement,
		tableBody = document.querySelectorAll('table tbody .table-body'),
		borrTableBody = document.querySelectorAll('.borrowers-table .borrowers-table-body');
			if (parent.className === 'book-bar') {
				parent.querySelector('.logo-name h2').textContent = 'Book list'
				document.querySelector('.book-inputs-n-search').style = 'display: grid'
				tableBody.forEach(tb => tb.style.display = 'grid')
				closeSearch.style.display = 'none'
			}else{
				parent.querySelector('.logo-name h2').textContent = 'Borrowers list'
				document.querySelector('.borrowers-inputs-n-search').style = 'display: grid'
				borrTableBody.forEach(btb => btb.style.display = 'grid')
				closeSearch.style.display = 'none'
			}
		})
	}

}


class Storage {
	static addToStore() {
		localStorage.setItem('BooksInLibrary', JSON.stringify(libraryBooks))
	}

	static displayFromStore() {
		libraryBooks = JSON.parse(localStorage.getItem('BooksInLibrary'));
	}

	static removeFromStore() {
		localStorage.setItem('BooksInLibrary', JSON.stringify(libraryBooks))
	}

	static addBorrowerToStore() {
		localStorage.setItem('BorrowersInLibrary', JSON.stringify(borrowersList))
	}

	static displayBorrowerFromStore() {
		libraryBooks = JSON.parse(localStorage.getItem('BorrowersInLibrary'));
	}

	static removeBorrowerFromStore() {
		localStorage.setItem('BorrowersInLibrary', JSON.stringify(borrowersList))
	}
}


// ACTIVATE MENU
let menu = document.querySelectorAll('.menu h3');
Array.from(menu).forEach(menuItem => menuItem.onclick = () => Menu.slideEmAll(menuItem))

//CHECK IF BOOKS HAVE BEEN BORROWED FROM THE UL BOOK PAGE AND GIVE THEM THE BORROWED CLASS
document.addEventListener('DOMContentLoaded', UI.checkIfBorrowedOut)

// BOOK VARIABLES 
let bookForm = document.querySelector('.book-form'),
bookTitle = document.querySelector('#book-title'),
bookAuthor = document.querySelector('#book-author'),
bookISBN = document.querySelector('#book-ISBN'),
bookCN = document.querySelector('#book-CN'),
bookSubtitle = document.querySelector('#book-subtitle');



// DISPLAY BOOKS ON UL FROM LOCAL STORAGE
document.addEventListener('DOMContentLoaded', UI.displayBook)

// ADD BOOKS TO UL FROM INPUT FIELDS
bookForm.onsubmit = (e) => {
	e.preventDefault();
	newBooks = new Book(bookTitle.value, bookAuthor.value, bookISBN.value, bookCN.value, bookSubtitle.value);
	libraryBooks.push(newBooks);
	UI.addBook(newBooks, libraryBooks.length -1);
	UI.message('success', 'New Book Added Successfully')
	Storage.addToStore();
	UI.clearFields('.book-form')
}

//MORE BOOK UL TASKS
document.querySelector('.book-table').onclick = (e) =>  {

// EDIT / UPDATE BOOKS IN THE UL
let editBook = document.querySelectorAll('.book-table #edit');
editBook.forEach(editedBook => editedBook.onclick = () => UI.editBook(editedBook))

//SHOW BORROW BOOK WINDOW IN UL
let borrowinWindowBtn = document.querySelectorAll('.book-table #add-borrower');
borrowinWindowBtn.forEach(borrowinWindowBtn => borrowinWindowBtn.onclick = () => {
	let bwbParent = borrowinWindowBtn.parentElement.parentElement.parentElement,
	span = borrowinWindowBtn.querySelector('img'),
	text = borrowinWindowBtn.querySelector('p');
if (borrowinWindowBtn.classList.contains('borrowered-out')) {
	UI.message('error', 'Sorry, this book has been borrowed out')
}else{
	bwbParent.nextElementSibling.classList.toggle('show-hide-for-borrower');
	span.classList.toggle('span-img-flip');
	return text.textContent === 'Borrow book' ? text.textContent = 'Close Borrow book window' : text.textContent = 'Borrow book';
}
	})

//BORROW BOOKS FROM BOOK UL
let bookBeingBorrowed = document.querySelectorAll('.book-table #fb-btn');
bookBeingBorrowed.forEach(bookBeingBorrowed => bookBeingBorrowed.onclick = () => UI.borrowBook(bookBeingBorrowed))

// REMOVE BOOKS FROM THE UL
let removeBook = document.querySelectorAll('.book-table #remove-book');
removeBook.forEach(bookBeingRemoved => bookBeingRemoved.onclick = () => {
	UI.removeBook(bookBeingRemoved)
	UI.message('success', 'Book has been removed Successfully')
	Storage.removeFromStore();
})


}

// SEARCH BOOKS IN THE UL
document.querySelector('#search-btn').onclick = (e) => {
	let searchValue = document.querySelector('#book-search').value;
	let selectOption = document.querySelector('.book-search select').value;
	if (searchValue.length === 0) {
		UI.message('error', 'You did not input any search word')
	}else{
		Search.searchBook(selectOption, searchValue);
		Search.afterSearch('.book-inputs-n-search', '.book-bar')
		UI.clearFields('.book-search')
	}
}

// BORROWERS VARIABLES

let borrowersForm = document.querySelector('.borrowers-form'),
bName = document.querySelector('#borrowers-name'),
bAddress = document.querySelector('#borrowers-address'),
bNumber = document.querySelector('#borrowers-number'),
dateBorr = document.querySelector('#date-borrowed'),
tOfbookBorr = document.querySelector('#title-of-bb'),
aOfbookBorr = document.querySelector('#author-of-bb'),
isbnOfbookBorr = document.querySelector('#ISBN-of-bb'),
cnOfbookBorr = document.querySelector('#call-number-of-bb');




// DISPLAY BORROWERS ON UL FROM LOCAL STORAGE
document.addEventListener('DOMContentLoaded', UI.displayBorrower)

// ADD BORROWER TO UL FROM INPUT FIELDS
borrowersForm.onsubmit = (e) => {
	e.preventDefault();
	newBorrower = new Borrower(bName.value, bAddress.value, bNumber.value, dateBorr.value, tOfbookBorr.value, aOfbookBorr.value, isbnOfbookBorr.value, cnOfbookBorr.value);
	borrowersList.push(newBorrower);
	UI.addBorrower(newBorrower, borrowersList.length -1);
	UI.message('success', 'New Borrower Added Successfully')
	Storage.addBorrowerToStore();
	UI.clearFields('.borrowers-form')

}

document.querySelector('.borrowers-table').onclick = (e) => {

// SHOW BOOK DETAIL DROP-DOWN
	if (e.target.classList.contains('switch')) {
		UI.showBookDetails(e.target)
	}

// EDIT / UPDATE BORROWER IN THE UL
let editBorrower = document.querySelectorAll('.borrowers-table #edit');
editBorrower.forEach(editedBorrower => editedBorrower.onclick = () => UI.editBorrower(editedBorrower))


// REMOVE BORROWER FROM THE UL
let removeBorrower = document.querySelectorAll('.borrowers-table #remove-book');
removeBorrower.forEach(borrowerBeingRemoved => borrowerBeingRemoved.onclick = () => {
	UI.removeBorrower(borrowerBeingRemoved)
	UI.message('success', 'Borrower has been removed Successfully')
	Storage.removeBorrowerFromStore();
})

}

// SEARCH BORRROWER FROM THE UL
document.querySelector('#borrowers-search-btn').onclick = (e) => {
	let searchValue = document.querySelector('#borrowers-search').value;
	let selectOption = document.querySelector('.borrowers-search select').value;
	if (searchValue.length === 0) {
		UI.message('error', 'You did not input any search word')
	}else{
		Search.searchBorrower(selectOption, searchValue);
		Search.afterSearch('.borrowers-inputs-n-search', '.borrowers-bar')
		UI.clearFields('.borrowers-search')
	}
}