/* 
 * Ce bout de code est une surcharge de l'event listener wheel afin de le
 * passer en mode passif afin d'améliorer les performances.
 */
jQuery.event.special.wheel = {
  setup: function( _, ns, handle ){
      this.addEventListener("wheel", handle, { passive: true });
  }
};

jQuery.event.special.scroll = {
  setup: function( _, ns, handle ){
      this.addEventListener("scroll", handle, { passive: true });
  }
};

/* Données du site */
const DATA_NEWPAINTS = [
  {
    "title": "La prairie de mon enfance",
    "date": 2022,
    "product_img": "cb8d6a54-90ea-42aa-a6f8-aa7301cc6645",
    "img_description": "Peinture d'une vaste prairie verte et jaune",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "21 000€",
  },
  {
    "title": "Fleurs du passé",
    "date": 2022,
    "product_img": "6a8464fa-3892-43bc-b595-a04cbb9eb4ea",
    "img_description": "Peinture de trois fleurs rouges aux couleurs fanées",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "8 000€",
  },
  {
    "title": "Au coeur de l'automne",
    "date": 2022,
    "product_img": "50f7cc6b-322e-4d53-a55f-487a92939eed",
    "img_description": "Peinture d'un bosquet d'arbre aux couleurs automnales",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "34 000€",
  },
  {
    "title": "Portrait d'une pensée lointaine",
    "date": 2022,
    "product_img": "3f028a2a-8829-42b0-89e5-6221821f3f31",
    "img_description": "Peinture d'un portrait d'une jeune femme",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "6 000€",
  },
  {
    "title": "La plage",
    "date": 2022,
    "product_img": "a98e2a67-7d47-4fa1-935e-55042aa76415",
    "img_description": "Peinture colorée d'une plage et du ciel",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "11 000€",
  },
  {
    "title": "Fenêtres funestes",
    "date": 2022,
    "product_img": "94f9e26a-30b1-4ea8-9920-ee95cc527731",
    "img_description": "Peinture en noir et blanc d'une grande fenêtre à 4 venteaux donnant sur une ville",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "53 000€",
  }
];

const DATA_TOPPAINTS = [
  {
    "title": "Pensées légères",
    "date": 2022,
    "product_img": "1366e738-34f2-4e8b-9c18-bdf584afc395",
    "img_description": "Peinture d'une jeune femme représentée par des fleurs et des papillons",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "5 000€",
  },
  {
    "title": "Mes bottes de jardin",
    "date": 2022,
    "product_img": "fb310dbf-00b7-4dde-9171-86decaaa26b2",
    "img_description": "Peinture réaliste de bottes remplies de fleurs",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "4 500€",
  },
  {
    "title": "Souvenirs",
    "date": 2022,
    "product_img": "e6e94fab-de68-4ff7-98a3-f9ee21a4884f",
    "img_description": "Peinture d'une jeune fille à chapeau de dos dans un champs de blé",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "18 200€",
  },
  {
    "title": "Mangeons vert",
    "date": 2022,
    "product_img": "87c58332-cff3-4f3e-b4ea-e6e4d0f6ec0c",
    "img_description": "Peinture réaliste d'un coq formé de céleri",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "42 000€",
  },
  {
    "title": "Nager dans les couleurs",
    "date": 2022,
    "product_img": "31650860-4c6f-4d01-b29f-8539dded8d1d",
    "img_description": "Peinture d'un poisson très coloré",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "19 700€",
  },
  {
    "title": "Mon meilleur ami",
    "date": 2022,
    "product_img": "1d566c24-c0e7-464b-87d4-e2fe4505e023",
    "img_description": "Peinture d'un chien blanc",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "2 500€",
  },
  {
    "title": "Instruments de pensée",
    "date": 2022,
    "product_img": "23f500d5-aee0-4244-a6ec-6b246c829b03",
    "img_description": "Peinture abstraite",
    "artist": "Pierre-Jean SUBERVIE",
    "artist_img": "pjs",
    "price": "101 000€",
  },
];

/*
 * Function: Retourne vrai si élément dans viewport, sinon faux
 * Note: Un offset arbitraire de 500 est ajouté afin de simuler une connexion serveur (un peu lente !) 
 */
$.fn.isInViewport = function() {
  const elementTop = $(this).offset().top + 400; /* Offset pour simuler une connexion à distance */
  const elementBottom = elementTop + $(this).outerHeight();
  const viewportTop = $(window).scrollTop();
  const viewportBottom = viewportTop + $(window).height();
  
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

/*
 * On simule un skeleton screen sur les images des oeuvres et des artistes
 */

$(window).on("wheel scroll", () => {
  $(".artcard__item").each((i, e) => {
    if ($(e).isInViewport()) {
      $(e).find("source[data-lazy='true']").each((i, e) => {
        $(e).attr('srcset', $(e).attr("data-srcset"));
        $(e).attr('data-lazy', false);
      });
      $(e).find("img[data-lazy='true']").each((i, e) => {
        $(e).attr('src', $(e).attr("data-src"));
        $(e).attr('data-lazy', false);
      });
    }
  });
});

/*
 * Affichage des oeuvres du site selon les données
 */
const displayDataElement = (data, element) => {
  $.each(data, (i, e) => {
    const template = $("#template").contents().clone();
    const sourceWebp = $("<source srcset='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw== 1w' sizes='(max-width: 1200px) 350px, 600px' type='image/webp' data-lazy='true'>");
    const sourceAvif = $("<source srcset='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw== 1w' sizes='(max-width: 1200px) 350px, 600px' type='image/avif' data-lazy='true'>");

    sourceWebp.attr("data-srcset", `img/arts/small/${e.product_img}.webp 350w, img/arts/${e.product_img}.webp 600w`);
    sourceAvif.attr("data-srcset", `img/arts/small/${e.product_img}.avif 350w, img/arts/${e.product_img}.avif 600w`);

    sourceWebp.prependTo(template.find(".artcard__picture"));
    sourceAvif.prependTo(template.find(".artcard__picture"));

    template.find(".artcard__image").attr("data-src", `img/arts/${e.product_img}`);
    template.find(".artcard__image").attr("alt", e.img_description);
    template.find(".artcard__image-author").attr("data-src", `img/artists/${e.artist_img}.png`);
    template.find(".artcard__info--small").text(e.artist);
    template.find(".artcard__info--h3").text(`${e.title}, ${e.date}`);
    template.find(".artcard__info--strong").text(e.price);

    element.append(template);
  });
};

displayDataElement(DATA_NEWPAINTS, $(".newpaints__list"));
displayDataElement(DATA_TOPPAINTS, $(".toppaints__list"));


/*
 * Menu de navigation mobile 
 */
const mainNav = $(".navbar__list");
const navButton = $(".navbar__button-toggle");

navButton.on("click", (e) => {
  const visibility = mainNav.attr("data-visible");

  if (mainNav.attr("data-visible") === "false") {
    mainNav.attr("data-visible", true);
    navButton.attr("aria-expanded", true);
  } else {
    mainNav.attr("data-visible", false);
    navButton.attr("aria-expanded", false);
  }
});

/*
 * Changement de Navbar dès lors que l'utilisateur scroll
 */

const navbar = $("#navbar"); // Perf: Cache de navbar pour éviter les queries à chaque scroll
const navMainButton = $(".navbar__button-toggle");

$(window).on("wheel scroll", () => {
  let scroll = $(window).scrollTop();

  if (scroll >= 100) {
    navbar.attr("data-scrolled", true);
    navMainButton.attr("data-scrolled", true);
  } else {
    navbar.attr("data-scrolled", false);
    navMainButton.attr("data-scrolled", false);
  }
});

/*
 * Gestion du scroll horizontal dans les listes de cards
 */
$(".artcard__button").on("click", (e) => {
  const elemToScroll = $(e.currentTarget).siblings(".artcard__wrapper");
  const scrollDistance = 420;

  elemToScroll.animate({
    scrollLeft: $(e.currentTarget).attr("data-side") === "left" ? `-=${scrollDistance}px` : `+=${scrollDistance}px`
  }, "slow");

  if ($(e.currentTarget).attr("data-side") === "right") {
    if(elemToScroll.scrollLeft() + elemToScroll.innerWidth() >= elemToScroll[0].scrollWidth - scrollDistance) {
      $(e.currentTarget).attr("data-useful", false);
    } else {
      $(e.currentTarget).attr("data-useful", true);
    }
    $(e.currentTarget).siblings(".artcard__button").attr("data-useful", true);
  }

  if ($(e.currentTarget).attr("data-side") === "left") {
    if(elemToScroll.scrollLeft() <= scrollDistance) {
      $(e.currentTarget).attr("data-useful", false);
    } else {
      $(e.currentTarget).attr("data-useful", true);
    }
    
    $(e.currentTarget).siblings(".artcard__button").attr("data-useful", true);
  }
});

/*
 * Elément graphique qui suit le curseur, seulement sur les appareils avec souris et
 * seulement si l'utilisateur n'a pas de troubles liés aux animations.
 * Dans le cas échéant, l'élément n'est pas affiché à l'écran.
 */

const cursor =  $("#cursor");

if (window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
  $(document).on({
    mousemove: (e) => {
      cursor.css({
        left: `${(e.pageX - window.pageXOffset)}px`,
        top: `${(e.pageY - window.pageYOffset)}px`
      });
    },
    mouseleave: (e) => {
      cursor.attr("data-hidden", true);
    },
    mouseenter: (e) => {
      cursor.attr("data-hidden", false);
    },
  });
}

/*
 * Changement de theme Clair/Sombre
 * NOTE : Il est normalement important de faire appel à prefers-color-scheme.
 *        Cependant, pour l'intérêt de cette maquette, je préfère mettre en avant
 *        le theme clair lors de la première visite  ¯\_(ツ)_/¯
 */

// On vérifie que le choix du thème n'est pas déjà enregistré dans le navigateur
if (localStorage.getItem("theme") === "dark") {
  $("html").addClass("dark-mode");
  $("#theme-light").addClass("theme-button__choice--hidden");
  $("#theme-dark").removeClass("theme-button__choice--hidden");
}

// Clic sur le bouton responsable du changement de thème
$("#theme-button").on("click", (e) => {
  let theme = "light";

  $("html").toggleClass("dark-mode");

  if ($("html").hasClass("dark-mode")) {
    theme = "dark";
  }

  $("#theme-dark").toggleClass("theme-button__choice--hidden");
  $("#theme-light").toggleClass("theme-button__choice--hidden");
  localStorage.setItem("theme", theme); // On enregistre le choix dans le navigateur
});

/*
 * Gestion du bouton de fermeture du modal d'aide
 */

$("#close-help-modal").on("click", (e) => {
  $("#help-modal").addClass("help-modal--closed");
  $("#help-modal").attr("aria-hidden", "true"); // L'élèment ne doit pas apparaitre aux screens readers
});



/* 
    Vestige d'une idée pas vraiement optimisée 
    Le fond du container change selon les couleurs dominantes de 
    de l'oeuvre d'art selectionée. Un peu comme les led sur les TV Philips
*/
/*
$(".artcard__link").hover((event) => {
  let srcTarget = $(event.target).closest(".artcard__image").attr("src");
  let colors = [];

  if (srcTarget != undefined) {
    let img = document.createElement('img');
  
    img.setAttribute('src', $(event.target).closest(".artcard__image").attr("src"));
  
    img.addEventListener('load', function() {
      var vibrant = new Vibrant(img);
      var swatches = vibrant.swatches();
      for (var swatch in swatches){
        if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
          colors.push(swatches[swatch].getRgb());
        }
      }

      $(".newpaints").css("background", "radial-gradient(circle, rgba(" + colors[4] + ", 1) 0%, rgba(" + colors[3] + ", 1) 100%)");
    });
  }
});
*/