const menu = document.querySelector('.menu');
const navbar = document.querySelector('nav');
const bgblur = document.querySelector('.bgblur')


menu.addEventListener('click', () => {
	menu.classList.toggle('open');
	navbar.classList.toggle('open');
	bgblur.classList.toggle('open');
	
})