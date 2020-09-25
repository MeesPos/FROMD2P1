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
            htmlUitvoer += `<h3>${titel}</h3>`
        });
        boeken.innerHTML = htmlUitvoer;
    }
}