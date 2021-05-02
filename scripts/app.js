const app = () => {
 	toggleNav();

	// When the user scrolls down 160px from the top of the document, show the button
	window.onscroll = function() { scrollFunction() };

 	modalFunction();
 }

// Used for preventing nav elements dissapering on screen
isNavSlideFadedIn = false

// Used for determining if nav can be toggled by main click
isBurgerToggled = false;

const toggleNav = () => {
	toggleNavOnBurgerClick();
	toggleNavOnMainClick();
}

const toggleNavOnBurgerClick = () => {
	const burger = document.querySelector('.burger');
	
	burger.addEventListener('click', () => {
		setNavTransition();
		setNavToggleBehaviour();
		// Set burger state
		if (isBurgerToggled) {
			isBurgerToggled = false;
		} else {
			isBurgerToggled = true;
		}
	});
}

const toggleNavOnMainClick = () => {
	const main = document.getElementsByTagName('main');

	main[0].addEventListener('click', () => {
		if (isBurgerToggled) {	
			setNavTransition();
			setNavToggleBehaviour();

			isBurgerToggled = false;
		}
	});

	// Prevents action when go-to-top-btn is clicked inside main
	const myButton = document.querySelector('.go-to-top-btn');
	myButton.addEventListener("click", (event) => {
		event.stopPropagation();
	});
}

// Set and unset transition to prevent glitches
const setNavTransition = () => {
	const nav = document.querySelector('.nav-links');

	nav.style.transition = "transform 0.5s ease-in";
	setTimeout(function() { nav.style.transition = ""; }, 500);
}

const setNavToggleBehaviour = () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');

	burger.classList.toggle('burger-toggled');
	nav.classList.toggle('nav-active');
	animateNavLinks();
}

const animateNavLinks = () => {
	const navLinks = document.querySelectorAll('.nav-links li');

	if (!isNavSlideFadedIn) {
		navLinks.forEach((link, index) => {
			link.style.opacity = '0';

			link.style.animation = `navLinkFadeIn 0.5s ease forwards ${index / 7 + 0.5}s`;
		});

		isNavSlideFadedIn = true;
	} else {
		navLinks.forEach((link, index) => {
			link.style.opacity = '1';

			link.style.animation = ``;
		});

		isNavSlideFadedIn = false;
	}
}

function scrollFunction() {
	const myButton = document.querySelector('.go-to-top-btn');

	if ((document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) && window.screen.width >= "440") {
		myButton.style.display = "block";

		myButton.style.animation = `goToTopBtnFadeIn 0.5s ease forwards 0.125s`;
	} else {
		myButton.style.animation = `goToTopBtnFadeOut 0.4s ease forwards`;
	}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	// For Safari
	document.body.scrollTop = 0;

	// For Chrome, Firefox, IE and Opera
	document.documentElement.scrollTop = 0;
}

function modalFunction() {
	try {
		// Get the modal
		var modal = document.getElementById('modal');

		// Get the image and insert it inside the modal - use its "alt" text as a caption
		var imgs = document.querySelectorAll('.img-src');
		var modalImg = document.getElementById('img');
		imgs.forEach((img) => {
			img.onclick = function(){
			  modal.style.display = 'block';
			  modalImg.src = this.src;
			}
		});

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName('close')[0];

		// When the user clicks on <span> (x), close the modal
		modal.onclick = function() {
		  modal.style.display = 'none';
		}

		modalImg.addEventListener("click", (event) => {
			event.stopPropagation();
		});
	} catch (error) {
		// Do nothing
	}
}

app();
