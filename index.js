
const collections = [];

const images = [
    { src: "./images/image (1).png", collection: "Digital" },
    { src: "./images/image (2).png", collection: "Realista" },
    { src: "./images/image (3).png", collection: "Arquitetura" },
    { src: "./images/image (4).png", collection: "Feito de caneta" },
    { src: "./images/image (5).png", collection: "Arquitetura" },
    { src: "./images/image (6).png", collection: "Paisagem" },
    { src: "./images/image (7).png", collection: "Paisagem" },
    { src: "./images/image (8).png", collection: "Realista" },
    { src: "./images/image (9).png", collection: "Paisagem" },
    { src: "./images/image (10).png", collection: "Feito de caneta" },
    { src: "./images/image (11).png", collection: "Arquitetura" },
    { src: "./images/image (12).png", collection: "Feito de caneta" },
    { src: "./images/image (13).png", collection: "Realista" },
    { src: "./images/image (14).png", collection: "Feito de caneta" },
    { src: "./images/image (15).png", collection: "Feito de caneta" },
    { src: "./images/image (16).png", collection: "Feito de caneta" },
    { src: "./images/image (17).png", collection: "Arquitetura" },
    { src: "./images/image (18).png", collection: "Realista" },
    { src: "./images/image (19).png", collection: "Arquitetura" },
    { src: "./images/image (20).png", collection: "Realista" },
    { src: "./images/image (21).png", collection: "Feito de caneta" },
    { src: "./images/image (22).png", collection: "Digital" },
    { src: "./images/image (23).png", collection: "Feito de caneta" },
    { src: "./images/image (24).png", collection: "Feito de caneta" },
    { src: "./images/image (25).png", collection: "Arquitetura" },
    { src: "./images/image (26).png", collection: "Paisagem" },
    { src: "./images/image (27).png", collection: "Arquitetura" },
    { src: "./images/image (28).png", collection: "Arquitetura" },
    { src: "./images/image (29).png", collection: "Aquarela" },
    { src: "./images/image (30).png", collection: "Feito de caneta" },
    { src: "./images/image (31).png", collection: "Feito de caneta" },
    { src: "./images/image (32).png", collection: "Paisagem" },
    { src: "./images/image (33).png", collection: "Feito de caneta" },
    { src: "./images/image (34).png", collection: "Feito de caneta" },
    { src: "./images/image (35).png", collection: "Paisagem" },
    { src: "./images/image (36).png", collection: "Realista" },
    { src: "./images/image (37).png", collection: "Arquitetura" },
    { src: "./images/image (38).png", collection: "Realista" },
    { src: "./images/image (39).png", collection: "Feito de caneta" },
    { src: "./images/image (40).png", collection: "Digital" },
    { src: "./images/image (41).png", collection: "Digital" },
    { src: "./images/image (42).png", collection: "Digital" },
    { src: "./images/image (43).png", collection: "Digital" },
    { src: "./images/image (44).png", collection: "Digital" },
    { src: "./images/image (45).png", collection: "Feito de caneta" }
];



const optionsCollections = document.querySelector(".options-collections");
const imagesContainer = document.querySelector(".images-container");
const viewImagem = document.querySelector(".view-image");
const btnCloseImage = document.getElementById("fechar-imagem");
const btnNextImage = document.querySelector("#next-image");
const btnPreviousImage = document.querySelector("#previous-image");
var visibleImages = {};
var nColl = 0;
var indexImgSelected = 0;
var nImages = 0;

// Cria as coleções baseado nas coleções atribuidas individualmente a cada desenho
for (n in images) {
    if (!collections.includes(images[n].collection)) {
        collections.push(images[n].collection);
        optionsCollections.innerHTML += `<input type="radio" id="radio-${nColl}" name="collection" value="${collections[nColl]}">
                                      <label class="option" for="radio-${nColl}">${collections[nColl]}</label>`;
        nColl += 1;
    }
}


// Inicialmente, mostra todas as imagens
showImages("Todos");
visibleImages = document.getElementsByTagName("img");

var lastImageSelected = document.querySelector("img");
lastImageSelected.classList.toggle("imageSelected");

// Ao selecionar uma determinada coleção, a página mostrara apenas imagens referente aquela coleção
optionsCollections.addEventListener("click", (evento) => {
    if (evento.target.localName == "input") {
        showImages(evento.target.value);
    }
});

// Abrir imagem ao clicar nela
imagesContainer.addEventListener("click", (evento) => {
    if (evento.target.localName == "img") {
        lastImageSelected.classList.toggle("imageSelected");
        lastImageSelected = evento.target;
        lastImageSelected.classList.toggle("imageSelected");

        visibleImages = document.getElementsByTagName("img");

        // Defina o índice da imagem no array "visibleImages"
        for (n in visibleImages) {
            if (visibleImages[n].classList.contains("imageSelected")) {
                indexImgSelected = Number(n);
                break;
            }
        }

        viewImagem.style.visibility = "visible";
        document.querySelector("html").style.overflow = "hidden";
        viewImagem.style.backgroundImage = `url("${evento.target.src}")`;
    }
})


// Fechar a imagem ao apertar no "x"
btnCloseImage.addEventListener("click", closeImage);

// Ao apertar em passar imagem
btnNextImage.addEventListener("click", nextImage);
window.addEventListener("keydown", (evento) => {
    if (evento.key == "ArrowRight") nextImage();
});

// Ao apertar em voltar imagem
btnPreviousImage.addEventListener("click", previousImage);
window.addEventListener("keydown", (evento) => {
    if (evento.key == "ArrowLeft") previousImage();
});


// Mostra as imagens correspondente a uma determinada coleção
function showImages(collection) {
    imagesContainer.innerHTML = "";
    nImages = 0;
    if (collection == "Todos") {
        for (n in images) {
            imagesContainer.innerHTML += `<img src="${images[n].src}">`;
            nImages++;
        }
    } else {
        for (n in images) {
            if (images[n].collection == collection) {
                imagesContainer.innerHTML += `<img src="${images[n].src}">`;
                nImages++;
            }
        }
    }
}

// Mostrar a próxima imagem

function nextImage() {

    if (indexImgSelected == nImages - 1) indexImgSelected = 0
    else indexImgSelected += 1;

    viewImagem.style.backgroundImage = `url("${visibleImages[indexImgSelected].src}")`;
}

// Mostrar imagem anterior
function previousImage() {
    if (indexImgSelected == 0) indexImgSelected = nImages - 1;
    else indexImgSelected -= 1;

    viewImagem.style.backgroundImage = `url("${visibleImages[indexImgSelected].src}")`;
}

function closeImage() {
    viewImagem.style.visibility = "hidden";
    viewImagem.style.backgroundImage = "";
    document.querySelector("html").style.overflow = "visible";
}

