let urls = document.querySelectorAll('nav a');
let sections = document.querySelectorAll('section');

const opties = {
    treshold: 1.0
};

const verwerking = (entries, observer) => {
    entries.forEach( entry => {
        console.log(entry.target.parentNode.id + " doorsnijdt " + entry.isIntersecting);
        if ( entry.isIntersecting ) {
            let link = zoekBijpassendeLink('#' + entry.target.parentNode.id);
            maakActief(link);
        }
    })
}

let observer = new IntersectionObserver(verwerking, opties);

// observer.observe(sections[1]);
sections.forEach( sectie => {
    observer.observe(sectie.getElementsByTagName('p')[0]);
});

// Functies die de class actief verwijderd
const verwijderActief = () => {
    urls.forEach( (link) => {
        if( link.classList = 'actief' ) {
            link.classList.remove('actief');
        }
    });
}

// Functie die actief-class toevoegd
const maakActief = (element) => {
    verwijderActief();
    element.classList.add('actief');
}

urls.forEach( (link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        maakActief(e.target);
        window.location = e.target.href;
    })
})

const zoekBijpassendeLink = (id) => {
    let link = document.querySelector('nav a[href="' + id + '"]');
    return link;
}