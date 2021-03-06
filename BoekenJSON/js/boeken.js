const boeken = document.getElementById('boeken');
const xhr = new XMLHttpRequest();
const taalkeuze = document.querySelectorAll('.filteren__cb');
const selectSort = document.querySelector('.filteren__select');
const aantalInWW = document.querySelector('.ww__aantal');

xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
        let resultaat = JSON.parse(xhr.responseText);
        boekenObject.filteren(resultaat);
        boekenObject.uitvoeren();
    }
}

xhr.open('GET', 'boeken.json', true);
xhr.send();

// Object winkelwagen
// met properties: bestelde boeken
// en methods: boekToevoegen, dataOphalen & uitvoeren...
const ww = {
    bestelling: [],
    boekToevoegen(obj) {
        let gevonden = this.bestelling.filter( b => b.ean == obj.ean );
        if ( gevonden.length == 0 ) {
            obj.besteldAantal++;
            ww.bestelling.push(obj);
        } else{
            gevonden[0].besteldAantal++;
        }
        localStorage.wwBestelling = JSON.stringify(this.bestelling);
        this.uitvoeren();
    },

    // De data uit de local storage halen
    dataOphalen() {
        if( localStorage.wwBestelling ) {
            this.bestelling = JSON.parse(localStorage.wwBestelling);
        }
        this.uitvoeren();
    },

    uitvoeren() {
        let html = '<table>';
        let totaal = 0;
        let totaalBesteld = 0;
        this.bestelling.forEach(boek => {
            // Complete titel maken
            let titel = "";
            if (boek.voortitel) {
                titel += boek.voortitel + " "
            }

            titel += boek.titel;
            // Opbouwen van een string
            html += '<tr>';
            html += `<td><img src="${boek.cover}" alt="${titel}" class="bestelformulier__cover"></td>`;
            html += `<td>${titel}</td>`;
            html += `<td class="bestelformulier__aantal">
            <i class="fas fa-arrow-down bestelformulier__verlaag" data-role="${boek.ean}"></i>
            ${boek.besteldAantal}
            <i class="fas fa-arrow-up bestelformulier__verhoog" data-role="${boek.ean}"></i>
            </td>`
            html += `<td>${boek.prijs.toLocaleString('nl-NL', { currency: 'EUR', style: 'currency' })}</td>`;
            html += `<td><i class="fas fa-trash bestelformulier__trash" data-role="${boek.ean}"></i></td>`
            html += '<tr>';
            totaal += boek.prijs * boek.besteldAantal;
            totaalBesteld += boek.besteldAantal;
        });

        html += `<tr><td colspan="4">Totaal</td>
            <td>${totaal.toLocaleString('nl-NL', { currency: 'EUR', style: 'currency' })}</td>
        </tr>`
        html += '</table>';
        document.getElementById('uitvoer').innerHTML = html;

        aantalInWW.innerHTML = totaalBesteld;
        this.trashActiveren();
        this.hogerLagerActiveren();
    },
    hogerLagerActiveren() {
        // Verhoog knop
        let hogerKnoppen = document.querySelectorAll('.bestelformulier__verhoog');
        hogerKnoppen.forEach(knop => {
            knop.addEventListener('click', e => {
                let ophoogID = e.target.getAttribute('data-role');
                let opTeHogenBoek = this.bestelling.filter( boek => boek.ean == ophoogID );
                opTeHogenBoek[0].besteldAantal++;
                localStorage.wwBestelling = JSON.stringify(this.bestelling);
                this.uitvoeren();
            })
        })

        // Verlaag knop
        let lagerKnoppen = document.querySelectorAll('.bestelformulier__verlaag');
        lagerKnoppen.forEach(knop => {
            knop.addEventListener('click', e => {
                let verlaagID = e.target.getAttribute('data-role');
                let teVerlagenAantal = this.bestelling.filter( boek => boek.ean == verlaagID );
                if(teVerlagenAantal[0].besteldAantal > 1) {
                    teVerlagenAantal[0].besteldAantal--;
                } else {
                    // Boek verwijderen
                    this.bestelling = this.bestelling.filter( bk => bk.ean != verlaagID );
                }
                localStorage.wwBestelling = JSON.stringify(this.bestelling);
                this.uitvoeren();
            })
        })
    },

    trashActiveren() {
        document.querySelectorAll('.bestelformulier__trash').forEach( trash => {
            trash.addEventListener('click', e => {
                let teVerwijderenBoekID = e.target.getAttribute('data-role');
                // Local Storage bijwerken
                localStorage.wwBestelling = JSON.stringify(this.bestelling);
                this.uitvoeren();
            })
        }) 
    }
}
// De data uit de local storage halen
ww.dataOphalen();

// Object boeken
// met properties: taalfilter, data, es
// en methods: filteren, sorteren, uitvoeren...
const boekenObject = {
    taalFilter: ['Engels', 'Duits', 'Nederlands'],
    es: 'titel',
    oplopend: 1,
    // Hier wordt een eigenschap data aangemaakt (Regel 24 bij het filteren)

    // Filteren op taal van een boek
    filteren(gegevens) {
        this.data = gegevens.filter((bk) => {
            let bool = false;
            this.taalFilter.forEach((taal) => {
                if (bk.taal == taal) {
                    bool = true;
                }
            })
            return bool;
        })
    },

    // De sorteerfunctie
    sorteren() {
        if (this.es == 'titel') {
            this.data.sort((a, b) => (a.titel.toUpperCase() > b.titel.toUpperCase()) ? this.oplopend : -1 * this.oplopend);
        } else if (this.es == 'paginas') {
            this.data.sort((a, b) => (a.paginas > b.paginas) ? this.oplopend : -1 * this.oplopend);
        } else if (this.es == 'uitgave') {
            this.data.sort((a, b) => (a.uitgave > b.uitgave) ? this.oplopend : -1 * this.oplopend);
        } else if (this.es == 'prijs') {
            this.data.sort((a, b) => (a.prijs > b.prijs) ? this.oplopend : -1 * this.oplopend);
        } else if (this.es == 'auteur') {
            this.data.sort((a, b) => (a.auteurs[0].achternaam > b.auteurs[0].achternaam) ? this.oplopend : -1 * this.oplopend);
        }
    },

    uitvoeren() {
        // Eerst sorteren
        this.sorteren();
        let htmlUitvoer = "";
        this.data.forEach(boek => {
            // Elk boek een eigenschap aantalBesteld geven
            boek.besteldAantal = 0;

            let titel = "";
            if (boek.voortitel) {
                titel += boek.voortitel + " "
            }

            titel += boek.titel;

            // Alle auteurs in een lijst zetten
            let auteurs = "";
            boek.auteurs.forEach((auteur, index) => {
                let tv = auteur.tussenvoegsel ? auteur.tussenvoegsel + " " : "";
                let sep = ", ";
                if (index >= boek.auteurs.length - 2) { sep = " en "; }
                if (index >= boek.auteurs.length - 1) { sep = ""; }
                auteurs += auteur.voornaam + " " + tv + auteur.achternaam + sep;
            })

            // HTML variable toevoegen
            htmlUitvoer += `<section class="boek">`;
            htmlUitvoer += `<img class="boek__cover" src="${boek.cover}" alt="${titel}">`;
            htmlUitvoer += `<div class="boek__info">`;
            htmlUitvoer += `<h3 class="boek__titel">${titel}</h3>`;
            htmlUitvoer += `<p class="boek__auteurs">${auteurs}</p>`
            htmlUitvoer += `<span class="boek__uitgave">Datum van uitgave: ${this.datumOmzetten(boek.uitgave)}</span>`
            htmlUitvoer += `<span class="boek__ean"> EAN: ${boek.ean}</span>`
            htmlUitvoer += `<span class="boek__taal"> Taal: ${boek.taal}</span>`
            htmlUitvoer += `<span class="boek__pagina">Pagina's: ${boek.paginas}</span>`
            htmlUitvoer += `<div class="boek__prijs"> ${boek.prijs.toLocaleString('nl-NL', { currency: 'EUR', style: 'currency' })}
                <a href="#" class="boek__bestel-knop" data-role="${boek.ean}">Bestellen</a>
            </div>`
            htmlUitvoer += `</div></section>`;
        });
        boeken.innerHTML = htmlUitvoer;
        // De gemaakte knoppen verzien van EventListener
        document.querySelectorAll('.boek__bestel-knop').forEach(knop => {
            knop.addEventListener('click', e => {
                e.preventDefault();
                let boekID = e.target.getAttribute('data-role');
                let gekliktBoek = this.data.filter(b => b.ean == boekID);
                ww.boekToevoegen(gekliktBoek[0]);
            })
        });
    },
    datumOmzetten(datumString) {
        let datum = new Date(datumString);
        let jaar = datum.getFullYear();
        let maand = this.getMaandnaam(datum.getMonth());
        return `${maand} ${jaar}`;
    },
    getMaandnaam(m) {
        let maand = "";
        switch (m) {
            case 0: maand = "januari"; break;
            case 1: maand = "februari"; break;
            case 2: maand = "maart"; break;
            case 3: maand = "april"; break;
            case 4: maand = "mei"; break;
            case 5: maand = "juni"; break;
            case 6: maand = "juli"; break;
            case 7: maand = "augustus"; break;
            case 8: maand = "september"; break;
            case 9: maand = "oktober"; break;
            case 10: maand = "november"; break;
            case 11: maand = "december"; break;
            default: maand = m;
        }
        return maand;
    }
}

const changeFilter = () => {
    let checkedFilter = [];
    taalkeuze.forEach(cb => {
        if (cb.checked) checkedFilter.push(cb.value);
    });
    boekenObject.taalFilter = checkedFilter;
    boekenObject.filteren(JSON.parse(xhr.responseText));
    boekenObject.uitvoeren();
}

taalkeuze.forEach(cb => cb.addEventListener('change', changeFilter));

const changeSortOption = () => {
    boekenObject.es = selectSort.value;
    boekenObject.uitvoeren();
}

selectSort.addEventListener('change', changeSortOption);

document.querySelectorAll('.filteren__rb').forEach(rb => rb.addEventListener('change', () => {
    boekenObject.oplopend = rb.value;
    boekenObject.uitvoeren();
}))