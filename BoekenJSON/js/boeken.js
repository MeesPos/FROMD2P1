const boeken = document.getElementById('boeken');
const xhr    = new XMLHttpRequest();

xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200) {
        let resultaat = JSON.parse(xhr.responseText);
        boekenObject.data = resultaat;
        boekenObject.uitvoeren();
    }
}

xhr.open('GET', 'boeken.json', true);
xhr.send();

const boekenObject = {
    // Hier wordt een eigenschap data aangemaakt (Regel 7)
    uitvoeren() {
        let htmlUitvoer = "";
        this.data.forEach( boek => {
            // In het geval van een voortitel moet deze voor de titel worden gezet
            let titel = "";
            if(boek.voortitel) {
                titel += boek.voortitel + " "
            }
            titel += boek.titel;

            // Alle auteurs in een lijst zetten
            let auteurs = "";
            boek.auteurs.forEach(auteur => {
                let tv = auteur.tussenvoegsel ? auteur.tussenvoegsel + " " : "";
                let sep = " ";
                auteurs += auteur.voornaam + " " + tv + auteur.achternaam + sep;
            })

            // HTML variable toevoegen
            htmlUitvoer += `<section class="boek">`;
            htmlUitvoer += `<img class="boek__cover" src="${boek.cover}" alt="${titel}">`;
            htmlUitvoer += `<h3 class="boek__titel">${titel}</h3>`;
            htmlUitvoer += `<p class="boek__auteurs">${auteurs}</p>`
            htmlUitvoer += `<span class="boek__uitgave">Datum van uitgave: ${boek.uitgave}</span>`
            htmlUitvoer += `<span class="boek__ean"> EAN: ${boek.ean}</span>`
            htmlUitvoer += `<span class="boek__taal"> Taal: ${boek.taal}</span>`
            htmlUitvoer += `<span class="boek__pagina">Pagina's: ${boek.paginas}</span>`
            htmlUitvoer += `<div class="boek__prijs">&euro; ${boek.prijs}</div>`
            htmlUitvoer += `</section>`;
        });
        boeken.innerHTML = htmlUitvoer;
    }
}