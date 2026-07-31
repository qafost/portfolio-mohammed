const navbar = document.getElementById("navbar");

const menu = document.getElementById("menu")

function handlNavbar() {

    const ulElement = document.createElement('ul');


    const infoLink = [
        {name: "home", url: "index.html"},
        {name: "about", url: "about.html"}, 
        {name: "project", url: "project.html"}, 
        {name: "contect" , url: "contact.html"}
    ]

    ulElement.classList = 'flex';
    
    infoLink.forEach((info, index) => {
        const liElement = document.createElement("li");
        const links = document.createElement("a");

        links.href = info.url;
        links.innerText = info.name;

        ulElement.appendChild(liElement);
        liElement.appendChild(links)
            if (index == 0 && location.pathname.endsWith("index.html")) {
                liElement.style.background = 'var(--pearl-aqua)'
            }if (index == 1 && location.pathname.endsWith("about.html")) {
                liElement.style.background = 'var(--pearl-aqua)'
            }
            if (index == 2 && location.pathname.endsWith("project.html")) {
                liElement.style.background = 'var(--pearl-aqua)'
            }
            if (index == 3 && location.pathname.endsWith("contact.html")) {
                liElement.style.background = 'var(--pearl-aqua)'
            }
    })

    navbar.appendChild(ulElement);
}


function handlMenu() {
    menu.addEventListener('click', () => {
            if (navbar.style.left == '0px') {
                navbar.style.left = '110%';
                navbar.style.right = '-110%';
            }else{
                navbar.style.left = '0';
                navbar.style.right = '0';
            }
        }
    )
}

handlMenu();
handlNavbar();


const translations = {
    en: {
        heroTitle: "Hi, I'm <span>Mohammed Khaled</span>",
        heroSubtitle: "Frontend Developer & UI/UX Designer",
        heroDesc: "I build clean, modern, and responsive web interfaces focused on performance and user experience.",
        viewWork: "View My Work",
        contact: "Contact Me",
        sectionAbout: 'About Me',
        aboutPargraph: 'I am a passionate frontend developer dedicated to crafting functional and visually appealing websites. I focus on writing structured, clean HTML/CSS and interactive JavaScript code'
    },

    ar: {
        heroTitle: "مرحبًا، أنا <span>محمد خالد</span>",
        heroSubtitle: "مطور واجهات أمامية ومصمم UI/UX",
        heroDesc: "أقوم بتطوير مواقع حديثة وسريعة ومتجاوبة مع جميع الأجهزة مع التركيز على تجربة المستخدم.",
        viewWork: "أعمالي",
        contact: "تواصل معي",
        sectionAbout: 'عني',
        aboutPargraph: 'أنا مطور Frontend شغوف بإنشاء مواقع ويب عملية وتصميمها بصرياً بشكل مميز. أهتم بكتابة كود HTML/CSS منظم ونظيف، وتطوير تفاعلات باستخدام JavaScript.'
    }
};

const langBtn = document.getElementById("lang-btn");

let currentLang = "en";

function changeLanguage(lang) {

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-lang]").forEach(element => {

        const key = element.dataset.lang;

        if (translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }

    });

    currentLang = lang;

    langBtn.textContent = lang === "en" ? "العربية" : "English";
}
langBtn.addEventListener("click", () => {

    if (currentLang === "en") {
        changeLanguage("ar");
    } else {
        changeLanguage("en");
    }

});

changeLanguage("en");