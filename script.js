const letras = {};
 a: "A.png",
    b: "B.png",
    c: "C.png",
    d: "D.png",
    e: "E.png",
    f: "F.png",
    g: "G.png",
    h: "H.png",
    i: "I.png",
    j: "J.png",
    k: "K.png",
    l: "L.png",
    m: "M.png",
    n: "N.png",
    o: "O.png",
    p: "P.png",
    q: "Q.png",
    r: "R.png",
    s: "S.png",
    t: "T.png",
    u: "U.png",
    v: "V.png",
    w: "W.png",
    x: "X.png",
    y: "Y.png",
    z: "Z.png",
    ç: "Ç.png"
```javascript
"abcdefghijklmnopqrstuvwxyzç".split("").forEach(letra => {
    letras[letra] = `letras/${letra}.png`;
});


const svg = document.getElementById("circuloMagico");

const efeito = document.getElementById("efeito");
const elemento = document.getElementById("elemento");
const forma = document.getElementById("forma");
const nome = document.getElementById("nomeMagia");

const gerar = document.getElementById("gerar");
const baixar = document.getElementById("baixar");

const tamanho = document.getElementById("tamanho");
const tamanhoValor = document.getElementById("tamanhoValor");

const mostrarEfeito =
    document.getElementById("mostrarEfeito");

const mostrarElemento =
    document.getElementById("mostrarElemento");

const mostrarForma =
    document.getElementById("mostrarForma");

const mostrarTraducao =
    document.getElementById("mostrarTraducao");

const CX = 400;
const CY = 400;

function limparTexto(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}

function criarSVG(tipo, atributos = {}) {

    const elemento =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            tipo
        );

    for (const atributo in atributos) {

        elemento.setAttribute(
            atributo,
            atributos[atributo]
        );

    }

    return elemento;

}

function adicionarCirculo(
    raio,
    espessura = 1,
    opacidade = 1
) {

    const c = criarSVG(
        "circle",
        {
            cx: CX,
            cy: CY,
            r: raio,

            fill: "none",

            stroke: "#dce4ff",

            "stroke-width": espessura,

            opacity: opacidade
        }
    );

    svg.appendChild(c);

}

function adicionarRadiais(
    quantidade,
    raio
) {

    for (let i = 0; i < quantidade; i++) {

        const angulo =
            i * Math.PI * 2 / quantidade;


        const x =
            CX +
            Math.cos(angulo) *
            raio;


        const y =
            CY +
            Math.sin(angulo) *
            raio;


        const linha = criarSVG(
            "line",
            {
                x1: CX,
                y1: CY,

                x2: x,
                y2: y,

                stroke: "#8997d2",

                "stroke-width": 0.7,

                opacity: 0.3
            }
        );


        svg.appendChild(linha);

    }

}

function adicionarPoligono(
    lados,
    raio
) {

    let pontos = [];


    for (let i = 0; i < lados; i++) {

        const angulo =
            -Math.PI / 2 +
            i * Math.PI * 2 / lados;


        const x =
            CX +
            Math.cos(angulo) *
            raio;


        const y =
            CY +
            Math.sin(angulo) *
            raio;


        pontos.push(`${x},${y}`);

    }


    const poligono =
        criarSVG(
            "polygon",
            {
                points:
                    pontos.join(" "),

                fill: "none",

                stroke: "#dce4ff",

                "stroke-width": 1.2,

                opacity: 0.8
            }
        );


    svg.appendChild(poligono);

}

function adicionarEstrela(
    pontas,
    externo,
    interno
) {

    let pontos = [];


    for (
        let i = 0;
        i < pontas * 2;
        i++
    ) {

        const raio =
            i % 2 === 0
                ? externo
                : interno;


        const angulo =
            -Math.PI / 2 +
            i * Math.PI / pontas;


        const x =
            CX +
            Math.cos(angulo) *
            raio;


        const y =
            CY +
            Math.sin(angulo) *
            raio;


        pontos.push(`${x},${y}`);

    }


    const estrela =
        criarSVG(
            "polygon",
            {
                points:
                    pontos.join(" "),

                fill: "none",

                stroke: "#dce4ff",

                "stroke-width": 1.5,

                opacity: 0.85
            }
        );


    svg.appendChild(estrela);

}

function adicionarArvore() {

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


    /* LINHAS DA ÁRVORE */

    conexoes.forEach(
        ([a,b]) => {

            const linha =
                criarSVG(
                    "line",
                    {

                        x1:
                            CX +
                            pontos[a][0],

                        y1:
                            CY +
                            pontos[a][1],

                        x2:
                            CX +
                            pontos[b][0],

                        y2:
                            CY +
                            pontos[b][1],

                        stroke:
                            "#8997d2",

                        "stroke-width":
                            0.8,

                        opacity:
                            0.45

                    }
                );


            svg.appendChild(linha);

        }
    );


    /* SEFIROT */

    pontos.forEach(
        ([x,y]) => {

            const esfera =
                criarSVG(
                    "circle",
                    {

                        cx:
                            CX + x,

                        cy:
                            CY + y,

                        r: 10,

                        fill:
                            "#080b14",

                        stroke:
                            "#dce4ff",

                        "stroke-width":
                            1.4

                    }
                );


            svg.appendChild(esfera);

        }
    );

}

function adicionarTextoCircular(
    texto,
    raio
) {

    texto =
        limparTexto(texto)
        .replace(/[^a-z]/g, "");


    if (!texto.length) {
        return;
    }


    const grupo =
        criarSVG("g");


    const caracteres =
        texto.split("");


    caracteres.forEach(
        (letra, indice) => {

            const angulo =
                indice *
                360 /
                caracteres.length;


            const t =
                criarSVG(
                    "text",
                    {

                        x: CX,

                        y:
                            CY - raio,

                        fill:
                            "#eef2ff",

                        "font-size":
                            "17",

                        "font-family":
                            "serif",

                        "text-anchor":
                            "middle",

                        "dominant-baseline":
                            "middle",

                        transform:
                            `rotate(${angulo} ${CX} ${CY})`

                    }
                );


            t.textContent =
                letra.toUpperCase();


            grupo.appendChild(t);

        }
    );


    svg.appendChild(grupo);

}

function construirMagia() {

    const valor =
        efeito.value;


    /*
       Procura o número no final.

       Exemplo:

       Fortalecimento 3

       vira:

       nome = Fortalecimento
       nível = 3
    */

    const resultado =
        valor.match(
            /^(.*?)(?:\s+(\d+))?$/
        );


    const nomeEfeito =
        resultado[1];


    const nivel =
        Number(
            resultado[2] || 1
        );


    let partes = [];


    for (
        let i = 0;
        i < nivel;
        i++
    ) {

        partes.push(
            nomeEfeito
        );

    }


    partes.push(
        elemento.value
    );


    partes.push(
        forma.value
    );


    return partes.join(" ");

}

function gerarCirculo() {

    /*
       LIMPA TUDO
    */

    svg.innerHTML = "";


    /*
       GARANTE O VIEWBOX
    */

    svg.setAttribute(
        "viewBox",
        "0 0 800 800"
    );


    svg.setAttribute(
        "width",
        "800"
    );


    svg.setAttribute(
        "height",
        "800"
    );


    /*
       FUNDO
    */

    const fundo =
        criarSVG(
            "rect",
            {

                x: 0,
                y: 0,

                width: 800,
                height: 800,

                fill: "#05070d"

            }
        );


    svg.appendChild(fundo);


    /*
       CÍRCULOS EXTERNOS
    */

    adicionarCirculo(
        375,
        2
    );

    adicionarCirculo(
        360,
        1
    );

    adicionarCirculo(
        335,
        1
    );


    /*
       CÍRCULOS INTERNOS
    */

    adicionarCirculo(
        300,
        1.5
    );

    adicionarCirculo(
        245,
        1
    );

    adicionarCirculo(
        190,
        1
    );


    /*
       GEOMETRIA
    */

    adicionarEstrela(
        6,
        290,
        145
    );


    adicionarPoligono(
        8,
        250
    );


    adicionarRadiais(
        16,
        350
    );


    /*
       ÁRVORE DA VIDA
    */

    adicionarArvore();


    /*
       TEXTO
    */

    const magia =
        construirMagia();


    adicionarTextoCircular(
        magia,
        320
    );


    /*
       NOME DA MAGIA
    */

    if (
        nome.value.trim() !== ""
    ) {

        const texto =
            criarSVG(
                "text",
                {

                    x: CX,

                    y: CY + 5,

                    fill:
                        "#ffffff",

                    "font-size":
                        18,

                    "font-family":
                        "serif",

                    "text-anchor":
                        "middle",

                    "letter-spacing":
                        3

                }
            );


        texto.textContent =
            nome.value.toUpperCase();


        svg.appendChild(texto);

    }


    /*
       ATUALIZA PAINEL
    */

    mostrarEfeito.textContent =
        efeito.value;


    mostrarElemento.textContent =
        elemento.value;


    mostrarForma.textContent =
        forma.value;


    mostrarTraducao.textContent =
        magia;

}

tamanho.addEventListener(
    "input",
    () => {

        tamanhoValor.textContent =
            `${tamanho.value} px`;

        svg.style.width =
            `${tamanho.value}px`;

    }
);

