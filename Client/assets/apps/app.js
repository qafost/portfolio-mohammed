const navbar = document.getElementById("link");

const menu = document.getElementById("menu")

function handlNavbar() {

    const ulElement = document.createElement('ul');


    const infoLink = [
        {name: "home", url: "index.html"},
        {name: "about", url: "about.html"}, 
        {name: "project", url: "project.html"}, 
        {name: "contect" , url: "contect.html"}
    ]

    ulElement.classList = 'flex';
    
    infoLink.forEach((info) => {
        const liElement = document.createElement("li");
        const Links = document.createElement("a");

        Links.href = info.url;
        Links.innerText = info.name;

        ulElement.appendChild(liElement);
        liElement.appendChild(Links)
    })

    navbar.appendChild(ulElement)
}


function handlMenu() {
    menu.addEventListener('click', () => {
        
    }
    )
}

handlMenu();
handlNavbar();