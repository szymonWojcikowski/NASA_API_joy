// Zadanie polega na wykorzystaniu API udostępnionego przez NASA.
//
// Zapoznaj się się z API wystawionym przez NASA.
// Zobacz jak wyglada dokumentacja, jakie dane możesz otrzymać oraz jak budować zapytania.
//
// Przed przystąpieniem do pisania kodu, upewnij się, że masz własny API Key (wypełnij formularz na stronie).
// DAF1xPC3HVxLWtais6lT48LpimqdBhDnOtBZ6Xcp

// Zadanie polega na stworzeniu strony, która składa się z dwóch sekcji.
//
// Każda z sekcji powinna mieć 100% szerokości i wysokości okna przeglądarki.
//
// 1 Pierwsza sekcja to sekcja powitalna.
// Na samym środku sekcji powinien znajdować się napis NASA API Challenge.
// Tłem całej sekcji powinien być jakikolwiek obrazek (na przykład zdjęcie Ziemi bądź innej planety) pobrany poprzez API.
//
// 2 Druga sekcja posiada galerię, który wyświetla zdjęcia Marsa.
// Wykorzystaj API do tego potrzebne. Galeria na starcie powinna pokazywać 6 zdjęć.
// Pod galerią umieść przycisk Load more. Po naciśnięciu powinno się pojawić 6 zdjęć więcej.
//
//     Dodatkowo
//
// Zmodyfikuj zapytanie o obrazek do pierwszej sekcji tak, aby za każdym razem był pobierany inny obrazek.
//
// Wykorzystaj technikę preloadingu przy wyświetlaniu nowych elementów w galerii.
//
// Pamiętaj o responsywności.
// Wybór czcionek, wygląd przycisków, wygląd galerii zależy od Ciebie - popuść wodze fantazji!

// -------------------------
// https://api.nasa.gov/planetary/apod?api_key=DAF1xPC3HVxLWtais6lT48LpimqdBhDnOtBZ6Xcp

$(document).ready(function () {
    console.log("Kosmos czeka");
    // test
    // $.ajax({
    //     url: "https://images-api.nasa.gov/search?q=earth&description=earth&media_type=image",
    //     method: "GET"
    // })
    // .done(function (response) {
    //     console.log("for welcome section");
    //     console.log(response);
    // })
    // .fail(function () {
    //         console.log("Coś poszło nie tak");
    // });

    //---------------------for welcome section
    const randomNr = function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const welcome = $(".welcome");
    const url = `https://images-api.nasa.gov/asset/PIA${randomNr(11111, 22222)}`;
    console.log(url, typeof url);

    $.ajax({
        url: url, //"https://images-api.nasa.gov/asset/PIA01234",
        method: "GET"
    })
        .done(function (response) {
            console.log("for welcome section");
            console.log(response);
            console.log(response.collection.items[0].href);
            let bg = `url(${response.collection.items[0].href})`;
            console.log(welcome);
            $(welcome).css({"background-image": bg});

        })
        .fail(function () {
            console.log("Coś poszło nie tak");
        });


    //------------------------------for Mars section
    const gallery = $(".gallery");
    const btnMore = $(".btn-more");
    const loader = $('.loader');
    gallery.on("click", "img", function openFullscreen() {
        if (this.requestFullscreen) {
            this.requestFullscreen();
        } else if (this.mozRequestFullScreen) { /* Firefox */
            this.mozRequestFullScreen();
        } else if (this.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            this.webkitRequestFullscreen();
        } else if (this.msRequestFullscreen) { /* IE/Edge */
            this.msRequestFullscreen();
        }
    });
    btnMore.hide();
    let photoCounter = 0;
    $.ajax({
        url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=mast&api_key=DAF1xPC3HVxLWtais6lT48LpimqdBhDnOtBZ6Xcp",
        method: "GET",
        beforeSend: function() {
            loader.show();
        }
    })
    .done(function (response) {
        loader.hide();
        btnMore.show();
        console.log("for Mars section");
        console.log(response);
        console.log(response.photos[4].img_src);
        const buildGallery = function (howMany) {
            for (let i = photoCounter, j = 0; j < howMany; i++, j++) {
                let currentPhoto = response.photos[i].img_src;
                console.log(response.photos[i].img_src);
                console.log(photoCounter, i);
                $("<img/>", {src: currentPhoto}).prependTo(gallery);
                photoCounter++;
            }
        };
        buildGallery(6);

        btnMore.on("click", function (ev) {
            ev.preventDefault();
            console.log("click test");
            buildGallery(6);
        });

    })
    .fail(function () {
        console.log("Coś poszło nie tak");
    })

});