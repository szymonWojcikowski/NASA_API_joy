$(document).ready(function () {
    //---------------------for welcome section
    const randomNr = function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const welcome = $(".welcome");
    const url = `https://images-api.nasa.gov/asset/PIA${randomNr(11111, 22222)}`;

    $.ajax({
        url: url,
        method: "GET"
    }).done(function (response) {
        let bg = `url(${response.collection.items[0].href})`;
        $(welcome).css({"background-image": bg});
    }).fail(function () {
        console.log("Something goes wrong");
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
        const buildGallery = function (howMany) {
            for (let i = photoCounter, j = 0; j < howMany; i++, j++) {
                let currentPhoto = response.photos[i].img_src;
                $("<img/>", {src: currentPhoto}).prependTo(gallery);
                photoCounter++;
            }
        };
        buildGallery(6);

        btnMore.on("click", function (ev) {
            ev.preventDefault();
            buildGallery(6);
        });

    })
    .fail(function () {
        console.log("Something goes wrong");
    })

});