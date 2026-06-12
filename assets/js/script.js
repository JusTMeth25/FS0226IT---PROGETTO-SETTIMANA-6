const lavori = [
  {
    id: 1,
    nome: "Rinascita di un rustico moderno",
    descrizione: "Progettazione ex-novo di una villa unifamiliare contemporanea su due livelli.",
    immagine: "/assets/img/villapiscina.jpg",
    alt: "villa con piscina",
    categoria: "residenziale",
  },
  {
    id: 2,
    nome: "Ristrutturazioni",
    descrizione: "Riqualificazione di spazi esistenti, gestione dei lavori e coordinamento con le imprese.",
    immagine: "/assets/img/ristrutturazione.jpg",
    alt: "ristrutturazione di un appartamento",
    categoria: "ristrutturazioni",
  },
  {
    id: 3,
    nome: "Attico Minimalista e Funzionale",
    descrizione: "Ottimizzazione degli spazi con arredi integrati.",
    immagine: "/assets/img/attico.jpg",
    alt: "attico moderno",
    categoria: "interior",
  },
  {
    id: 4,
    nome: "Loft",
    descrizione: "Trasformazione di una ex officina meccanica.",
    immagine: "/assets/img/loft.jpg",
    alt: "Loft",
    categoria: "ristrutturazioni",
  },
  {
    id: 5,
    nome: "Appartamento Armonia Naturale",
    descrizione: "Fusione tra minimalismo scandinavo e stile europeo.",
    immagine: "/assets/img/armonia.jpg",
    alt: "Appartamento Armonia Naturale",
    categoria: "interior",
  },
  {
    id: 6,
    nome: "Bifamiliare a Energia Quasi Zero",
    descrizione: "Architettura moderna a impatto ambientale minimo.",
    immagine: "/assets/img/energia.jpg",
    alt: "Casa con pannelli solari",
    categoria: "residenziale",
  },
];

const contenitoreLavori = document.getElementById("contenitore-lavori");
const filtriLavori = document.getElementById("filtri-lavori");
const contatoreLavori = document.getElementById("contatore-lavori");
const totaleLavori = document.getElementById("totale-lavori");

function aggiungiTesto(elemento, testo) {
  const nodoTesto = document.createTextNode(testo);
  elemento.append(nodoTesto);
}

function creaElemento(tag, classi = []) {
  const elemento = document.createElement(tag);

  classi.forEach(function (classe) {
    elemento.classList.add(classe);
  });

  return elemento;
}

function creaCardLavoro(lavoro) {
  const col = creaElemento("div", ["col-12", "col-md-4"]);

  const card = creaElemento("div", ["card", "work-card", "h-100", "text-center"]);

  const immagine = creaElemento("img", ["card-img-top", "work-card-img"]);
  immagine.setAttribute("src", lavoro.immagine);
  immagine.setAttribute("alt", lavoro.alt);

  const cardBody = creaElemento("div", ["card-body", "d-flex", "flex-column"]);

  const titolo = creaElemento("h5", ["card-title", "fw-bold"]);
  aggiungiTesto(titolo, lavoro.nome);

  const descrizione = creaElemento("p", ["card-text", "text-muted", "mb-0"]);
  aggiungiTesto(descrizione, lavoro.descrizione);

  cardBody.append(titolo, descrizione);
  card.append(immagine, cardBody);
  col.append(card);

  return col;
}

function aggiornaContatore(numeroMostrati) {
  contatoreLavori.replaceChildren(document.createTextNode(numeroMostrati));
  totaleLavori.replaceChildren(document.createTextNode(lavori.length));
}

function renderLavori(listaLavori) {
  const elementiCard = listaLavori.map(function (lavoro) {
    return creaCardLavoro(lavoro);
  });

  contenitoreLavori.replaceChildren(...elementiCard);
  aggiornaContatore(listaLavori.length);
}

function filtraLavori(categoria) {
  if (categoria === "tutti") {
    return lavori;
  }

  return lavori.filter(function (lavoro) {
    return lavoro.categoria === categoria;
  });
}

function aggiornaBottoneAttivo(bottoneCliccato) {
  const bottoni = filtriLavori.querySelectorAll("button[data-categoria]");

  bottoni.forEach(function (bottone) {
    bottone.classList.remove("active");
  });

  bottoneCliccato.classList.add("active");
}

filtriLavori.addEventListener("click", function (evento) {
  const bottone = evento.target.closest("button[data-categoria]");

  if (!bottone) {
    return;
  }

  const categoria = bottone.dataset.categoria;
  const lavoriFiltrati = filtraLavori(categoria);

  aggiornaBottoneAttivo(bottone);
  renderLavori(lavoriFiltrati);
});



const bottoneTema = document.getElementById("toggle-tema");

function aggiornaTestoTema(temaScuroAttivo) {
  if (temaScuroAttivo) {
    bottoneTema.replaceChildren(document.createTextNode("Tema chiaro"));
    bottoneTema.setAttribute("aria-pressed", "true");
    return;
  }

  bottoneTema.replaceChildren(document.createTextNode("Tema scuro"));
  bottoneTema.setAttribute("aria-pressed", "false");
}

bottoneTema.addEventListener("click", function () {
  const temaScuroAttivo = document.body.classList.toggle("tema-scuro");
  aggiornaTestoTema(temaScuroAttivo);
});



renderLavori(lavori);