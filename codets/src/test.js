// here are some links from the homepage I exrtact

const epis=[...document.querySelectorAll(".owl-stage > .owl-item:not(.cloned)")].map(e => {
    const a = e.querySelector("a");
    const img = a.style["background-image"];
    const url = a.getAttribute("herf");
    const title = a.getAttribute("title");
    return {title: title, img: img.slice("url('".length, img.length -2), url: url,};
}).slice(0, 8);
console.log(epis);

console.log("#".repeat(20));

const epse = document.querySelectorAll(".episodes-card-container");

const epsData = [];

epse.forEach(e => {
    const titleEle = e.querySelector(".episodes-card-title h3 a");
    const imgEle = e.querySelector(".img-responsive");
    const url = titleEle.getAttribute("href");
    const title = e.querySelector(".ep-card-anime-title h3 a").innerText; // this line
    const imgSrc = imgEle.getAttribute("src");
    epsData.push({ title, img: imgSrc, url });
});

console.log(epsData);
console.log("#".repeat(20));

const animeCards = [...document.querySelectorAll(".anime-card-container")];

const eps = animeCards.map(e => {
    const url = e.querySelector(".anime-card-poster > div.hover.ehover6 > a").getAttribute("href");
    
    const title = e.querySelector(".anime-card-title h3 a").textContent;
    
    const image = e.querySelector(".img-responsive").getAttribute("src");
    
    return { url, title, image };
});

const selectedEps = eps.slice(6, 12); 
console.log(selectedEps);