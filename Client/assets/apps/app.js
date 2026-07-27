const navbar = document.getElementById("link");



function handlNavbar() {

    const ulElement = document.createElement('ul');


    const infoLink = [
        {name: "home", url: "index.html"},
        {name: "about", url: "about.html"}, 
        {name: "project", url: "project.html"}, 
        {name: "contect" , url: "contect.html"}
    ]


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

handlNavbar()