class Slide {
    constructor(title, image, description, author, year){
        this.title = title;
        this.image = image;
        this.description = description;
        this.author = author;
        this.year = year;
    }
}


let slide1 = new Slide(
    "Homeless Veteran by His Stand",
    "images/vet1.webp",
    "A homeless Air Force veteran reading at his stand, highlighting that leaving the service doesn't always guarentee a stable life.",
    "Getty Images",
    "unknown"
)

let slide2 = new Slide(
    "Homeless Veteran Sign",
    "images/vet2.webp",
    "A homeless Army Vet, next to a sign that reads 'Army Vet, Homeless, Humiliated, Sorry If I Offend Anyone Asking This Way', showing the harsh reality of homelessness among veterans.",
    "Unknown",
    "unknown"
)

let slide3 = new Slide(
    "Military Helping Hand",
    "images/vet3.jpg",
    "Military members offering a helping hand to a homeless veteran, symbolizing the support and camaraderie within the military community.",
    "Bryant Jordan & Michael Hoffman",
    "2014",
)

let slide4 = new Slide(
    "Outreach Programs",
    "images/vet4.webp",
    "Volunteers providing outreach and support to homeless veterans, emphasizing the importance of community involvement in addressing veteran homelessness.",
    "Denver Post",
    "2016",
)

let slide5 = new Slide(
    "War Survivor's Struggle",
    "images/vet5.webp",
    "A homeless Vietnam veteran, asking for help, illustrating the long-term struggles faced by veterans even decades after their service.",
    "Unknown",
    "unknown"
)

let slides = [slide1, slide2, slide3, slide4, slide5]

let lastIndex = -1;

function showRandomSlide(){
    let index
    do {
        index = Math.floor(Math.random() * slides.length);
    } while (index === lastIndex);
    lastIndex = index;
    let slide = slides[index];
    document.getElementById("slideImage").src=slide.image;
    document.getElementById("slideTitle").textContent=slide.title;
    document.getElementById("slideDescription").textContent=slide.description;
    document.getElementById("slideAuthor").textContent=slide.author;
    document.getElementById("slideYear").textContent=slide.year;
}

document.getElementById("nextBtn").addEventListener("click", showRandomSlide);

showRandomSlide()