const menu = document.querySelector('.menu');
const navbar = document.querySelector('nav');
const bgblur = document.querySelector('.bgblur')


menu.addEventListener('click', () => {
	menu.classList.toggle('open');
	navbar.classList.toggle('open');
	bgblur.classList.toggle('open');
	
})




let projects = ` 
<div class="pro-1">
        <img src="public/img/website.png" alt="images project">
        <div class="gront">
          <h3>jolt E-commerce store</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque consequatur debitis labore, saepe reiciendis expedita.</p>
        </div>
        <div class="btn-project">
          <a href="">view</a>
          <a href="">github</a>
        </div>
      </div>	
      `