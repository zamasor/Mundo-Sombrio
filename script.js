```javascript
/* =====================================================
   GERADOR DE CÍRCULOS MÁGICOS
===================================================== */


/* =====================================================
   ALFABETO

   Coloque suas imagens nesta pasta:

   letras/a.png
   letras/b.png
   letras/c.png
   etc.
===================================================== */

const letras = {};

"abcdefghijklmnopqrstuvwxyz".split("").forEach(letra => {
    letras[letra] = `letras/${letra}.png`;
});


/* =====================================================
   ELEMENTOS DA INTERFACE
===================================================== */

const svg = document.getElementById("circuloMagico");

const efeito = document.getElementById("efeito");
const elemento = document.getElementById("elemento");
const forma = document.getElementById("forma");
const nome = document.getElementById("nomeMagia");

const gerar = document.getElementById("gerar");
const baixar = document.getElementById("baixar");

const tamanho = document.getElementById("tamanho");
const tamanhoValor = document.getElementById("tamanhoValor");

const mostrarEfeito = document.getElementById("mostrarEfeito");
const mostrarElemento = document.getElementById("mostrarElemento");
const mostrarForma = document.getElementById("mostrarForma");
const mostrarTraducao = document.getElementById("mostrarTraducao");


/* =====================================================
   CONFIGURAÇÕES
===================================================== */

const CX = 400;
const CY = 400;


/* =====================================================
   NORMALIZAR TEXTO
===================================================== */

function limpar(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


/* =====================================================
   CRIAR SVG
===================================================== */

function svgEl(tag, attrs = {}) {

    const el = document.createElementNS(
        "http://www.w3.org/2000/svg",
        tag
    );

    Object.entries(attrs).forEach(([chave, valor]) => {
        el.setAttribute(chave, valor);
    });

    return el;
}


/* =====================================================
   ADICIONAR CÍRCULO
===================================================== */

function circulo(raio, espessura = 1, opacidade = 1) {

    svg.appendChild(
        svgEl("circle", {

            cx: CX,
            cy: CY,
            r: raio,

            fill: "none",

            stroke: "#dce4ff",

            "stroke-width": espessura,

            opacity: opacidade

        })
    );

}


/* =====================================================
   ADICIONAR LINHAS RADIAIS
===================================================== */

function radiais(numero, raio) {

    for (let i = 0; i < numero; i++) {

        const angulo =
            i * Math.PI * 2 / numero;

        svg.appendChild(
            svgEl("line", {

                x1: CX,
                y1: CY,

                x2:
                    CX + Math.cos(angulo) * raio,

                y2:
                    CY + Math.sin(angulo) * raio,

                stroke: "#8997d2",

                "stroke-width": 0.7,

                opacity: 0.35

            })
        );

    }

}


/* =====================================================
   POLÍGONO
===================================================== */

function poligono(lados, raio) {

    let pontos = [];

    for (let i = 0; i < lados; i++) {

        const angulo =
            -Math.PI / 2 +
            i * Math.PI * 2 / lados;

        pontos.push(
            `${CX + Math.cos(angulo) * raio},` +
            `${CY + Math.sin(angulo) * raio}`
        );

    }

    svg.appendChild(
        svgEl("polygon", {

            points: pontos.join(" "),

            fill: "none",

            stroke: "#dce4ff",

            "stroke-width": 1.2,

            opacity: 0.8

        })
    );

}


/* =====================================================
   ESTRELA
===================================================== */

function estrela(pontas, externo, interno) {

    let pontos = [];

    for (let i = 0; i < pontas * 2; i++) {

        const raio =
            i % 2 === 0
                ? externo
                : interno;

        const angulo =
            -Math.PI / 2 +
            i * Math.PI / pontas;

        pontos.push(
            `${CX + Math.cos(angulo) * raio},` +
            `${CY + Math.sin(angulo) * raio}`
        );

    }

    svg.appendChild(
        svgEl("polygon", {

            points: pontos.join(" "),

            fill: "none",

            stroke: "#dce4ff",

            "stroke-width": 1.4,

            opacity: 0.8

        })
    );

}


/* =====================================================
   ÁRVORE DA VIDA
===================================================== */

function arvore() {

    const pontos = [

        [0, -170],

        [-90, -90],
        [90, -90],

        [-100, 0],
        [0, 0],
        [100, 0],

        [-90, 90],
        [90, 90],

        [0, 170]

    ];


    const conexoes = [

        [0,1],
        [0,2],

        [1,3],
        [1,4],

        [2,4],
        [2,5],

        [3,4],
        [4,5],

        [3,6],
        [4,6],

        [4,7],
        [5,7],

        [6,8],
        [7,8],

        [6,7]

    ];


    /* LINHAS */

    conexoes.forEach(([a,b]) => {

        svg.appendChild(
            svgEl("line", {

                x1: CX + pontos[a][0],
                y1: CY + pontos[a][1],

                x2: CX + pontos[b][0],
                y2: CY + pontos[b][1],

                stroke: "#8997d2",

                "stroke-width": 0.7,

                opacity: 0.45

            })
        );

    });


    /* SEFIROT */

    pontos.forEach(([x,y]) => {

        svg.appendChild(
            svgEl("circle", {

                cx: CX + x,
                cy: CY + y,

                r: 10,

                fill: "#090d19",

                stroke: "#dce4ff",

                "stroke-width": 1.3

            })
        );

    });

}


/* =====================================================
   TEXTO AO REDOR DO CÍRCULO
===================================================== */

function textoCircular(texto, raio) {

    const grupo = svgEl("g");

    const chars =
        limpar(texto)
        .replace(/[^a-z]/g, "")
        .split("");


    if (!chars.length) return;


    chars.forEach((letra, i) => {

        const angulo =
            i * 360 / chars.length;


        const textoSVG =
            svgEl("text", {

                x: CX,

                y: CY - raio,

                fill: "#eef2ff",

                "font-size": 18,

                "font-family": "serif",

                "text-anchor": "middle",

                "dominant-baseline": "middle",

                transform:
                    `rotate(${angulo} ${CX} ${CY})`

            });


        textoSVG.textContent =
            letra.toUpperCase();


        grupo.appendChild(textoSVG);

    });


    svg.appendChild(grupo);

}


/* =====================================================
   REPETIR EFEITO
===================================================== */

function construirMagia() {

    const valor = efeito.value;

    const resultado =
        valor.match(/^(.*?)(?:\s+(\d+))?$/);


    const nomeEfeito =
        resultado[1];

    const nivel =
        Number(resultado[2] || 1);


    let partes = [];


    for (let i = 0; i < nivel; i++) {

        partes.push(nomeEfeito);

    }


    partes.push(elemento.value);

    partes.push(forma.value);


    return partes.join(" ");

}


/* =====================================================
   GERAR
===================================================== */

function gerarCirculo() {

    svg.innerHTML = "";


    /* FUNDO */

    svg.appendChild(
        svgEl("rect", {

            width: 800,
            height: 800,

            fill: "#05070d"

        })
    );


    /* CÍRCULOS */

    circulo(370, 2);

    circulo(350, 1);

    circulo(300, 1.5);

    circulo(245, 1);

    circulo(190, 1.2);


    /* GEOMETRIA */

    estrela(6, 290, 145);

    poligono(8, 250);

    radiais(16, 350);


    /* ÁRVORE */

    arvore();


    /* MAGIA */

    const magia =
        construirMagia();


    textoCircular(
        magia,
        325
    );


    /* NOME CENTRAL */

    if (nome.value.trim()) {

        const centro =
            svgEl("text", {

                x: CX,

                y: CY + 5,

                fill: "#ffffff",

                "font-size": 18,

                "font-family": "serif",

                "text-anchor": "middle",

                "letter-spacing": 3

            });


        centro.textContent =
            nome.value.toUpperCase();


        svg.appendChild(centro);

    }


    /* INFORMAÇÕES */

    mostrarEfeito.textContent =
        efeito.value;

    mostrarElemento.textContent =
        elemento.value;

    mostrarForma.textContent =
        forma.value;

    mostrarTraducao.textContent =
        magia;

}


/* =====================================================
   TAMANHO
===================================================== */

tamanho.addEventListener("input", () => {

    tamanhoValor.textContent =
        `${tamanho.value} px`;

    svg.style.width =
        `${tamanho.value}px`;

});


/* =====================================================
   EVENTOS
===================================================== */

gerar.addEventListener(
    "click",
    gerarCirculo
);


efeito.addEventListener(
    "change",
    gerarCirculo
);


elemento.addEventListener(
    "change",
    gerarCirculo
);


forma.addEventListener(
    "change",
    gerarCirculo
);


nome.addEventListener(
    "input",
    gerarCirculo
);


/* =====================================================
   DOWNLOAD PNG
===================================================== */

baixar.addEventListener("click", () => {

    const dados =
        new XMLSerializer()
        .serializeToString(svg);


    const blob =
        new Blob(
            [dados],
            {
                type:
                    "image/svg+xml;charset=utf-8"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const imagem =
        new Image();


    imagem.onload = () => {

        const canvas =
            document.createElement("canvas");


        canvas.width = 1600;
        canvas.height = 1600;


        const ctx =
            canvas.getContext("2d");


        ctx.fillStyle =
            "#05070d";


        ctx.fillRect(
            0,
            0,
            1600,
            1600
        );


        ctx.drawImage(
            imagem,
            0,
            0,
            1600,
            1600
        );


        const link =
            document.createElement("a");


        link.download =
            "circulo-magico.png";


        link.href =
            canvas.toDataURL(
                "image/png"
            );


        link.click();


        URL.revokeObjectURL(url);

    };


    imagem.src = url;

});


/* =====================================================
   INICIAR
===================================================== */

gerarCirculo();
```
