```javascript
/* =========================================================
   GERADOR DE CÍRCULOS MÁGICOS
========================================================= */


/* =========================================================
   ÁREA DO ALFABETO

   COLOQUE AQUI OS CAMINHOS DAS IMAGENS DAS SUAS LETRAS.

   Exemplo:

   a: "letras/a.png"

   b: "letras/b.png"

   etc.

   Por enquanto o sistema usa letras normais caso
   você ainda não tenha colocado as imagens.
========================================================= */

const alfabeto = {

    a: "letras/a.png",
    b: "letras/b.png",
    c: "letras/c.png",
    d: "letras/d.png",
    e: "letras/e.png",
    f: "letras/f.png",
    g: "letras/g.png",
    h: "letras/h.png",
    i: "letras/i.png",
    j: "letras/j.png",
    k: "letras/k.png",
    l: "letras/l.png",
    m: "letras/m.png",
    n: "letras/n.png",
    o: "letras/o.png",
    p: "letras/p.png",
    q: "letras/q.png",
    r: "letras/r.png",
    s: "letras/s.png",
    t: "letras/t.png",
    u: "letras/u.png",
    v: "letras/v.png",
    w: "letras/w.png",
    x: "letras/x.png",
    y: "letras/y.png",
    z: "letras/z.png"

};


/* =========================================================
   ELEMENTOS HTML
========================================================= */

const svg = document.getElementById("circuloMagico");

const efeitoSelect =
    document.getElementById("efeito");

const elementoSelect =
    document.getElementById("elemento");

const formaSelect =
    document.getElementById("forma");

const nomeMagia =
    document.getElementById("nomeMagia");

const gerarButton =
    document.getElementById("gerar");

const baixarButton =
    document.getElementById("baixar");

const tamanhoInput =
    document.getElementById("tamanho");

const tamanhoValor =
    document.getElementById("tamanhoValor");


/* =========================================================
   INFORMAÇÕES
========================================================= */

const mostrarEfeito =
    document.getElementById("mostrarEfeito");

const mostrarElemento =
    document.getElementById("mostrarElemento");

const mostrarForma =
    document.getElementById("mostrarForma");

const mostrarTraducao =
    document.getElementById("mostrarTraducao");


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const CX = 400;
const CY = 400;


/* =========================================================
   NORMALIZAR TEXTO

   Remove acentos para encontrar as letras do alfabeto.
========================================================= */

function normalizar(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


/* =========================================================
   OBTER REPETIÇÃO

   Fortalecimento 2
   retorna:

   Fortalecimento
   Fortalecimento

   Fortalecimento 4:

   Fortalecimento
   Fortalecimento
   Fortalecimento
   Fortalecimento
========================================================= */

function separarNivel(texto) {

    const resultado = texto.match(/^(.*?)(?:\s+(\d+))?$/);

    const nome = resultado[1];

    const nivel = resultado[2]
        ? parseInt(resultado[2])
        : 1;

    return {

        nome: nome,

        nivel: nivel

    };

}


/* =========================================================
   CONSTRUIR TEXTO MÁGICO
========================================================= */

function construirTexto() {

    const efeito =
        efeitoSelect.value;

    const elemento =
        elementoSelect.value;

    const forma =
        formaSelect.value;


    const efeitoInfo =
        separarNivel(efeito);


    let partes = [];


    /*
       REPETE O EFEITO CONFORME O NÍVEL
    */

    for (
        let i = 0;
        i < efeitoInfo.nivel;
        i++
    ) {

        partes.push(
            efeitoInfo.nome
        );

    }


    partes.push(elemento);

    partes.push(forma);


    return partes.join(" ");

}


/* =========================================================
   CRIAR ELEMENTO SVG
========================================================= */

function criarElemento(tag, atributos = {}) {

    const elemento =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            tag
        );

    for (
        const chave in atributos
    ) {

        elemento.setAttribute(
            chave,
            atributos[chave]
        );

    }

    return elemento;

}


/* =========================================================
   CÍRCULO
========================================================= */

function adicionarCirculo(
    raio,
    espessura = 1,
    opacidade = 1
) {

    const circulo =
        criarElemento(
            "circle",
            {

                cx: CX,
                cy: CY,

                r: raio,

                fill: "none",

                stroke: "#dce4ff",

                "stroke-width":
                    espessura,

                opacity:
                    opacidade

            }
        );

    svg.appendChild(circulo);

}


/* =========================================================
   LINHAS RADIAIS
========================================================= */

function adicionarLinhasRadiais(
    quantidade,
    raio
) {

    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const angulo =
            (Math.PI * 2 / quantidade)
            * i;

        const x =
            CX +
            Math.cos(angulo)
            * raio;

        const y =
            CY +
            Math.sin(angulo)
            * raio;


        const linha =
            criarElemento(
                "line",
                {

                    x1: CX,
                    y1: CY,

                    x2: x,
                    y2: y,

                    stroke: "#8d9bd0",

                    "stroke-width": 0.8,

                    opacity: 0.35

                }
            );


        svg.appendChild(linha);

    }

}


/* =========================================================
   POLÍGONO
========================================================= */

function adicionarPoligono(
    lados,
    raio
) {

    let pontos = [];


    for (
        let i = 0;
        i < lados;
        i++
    ) {

        const angulo =
            -Math.PI / 2 +
            (Math.PI * 2 / lados) * i;


        const x =
            CX +
            Math.cos(angulo)
            * raio;

        const y =
            CY +
            Math.sin(angulo)
            * raio;


        pontos.push(
            `${x},${y}`
        );

    }


    const poligono =
        criarElemento(
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


/* =========================================================
   ESTRELA
========================================================= */

function adicionarEstrela(
    pontos,
    raioExterno,
    raioInterno
) {

    let coordenadas = [];


    for (
        let i = 0;
        i < pontos * 2;
        i++
    ) {

        const raio =
            i % 2 === 0
                ? raioExterno
                : raioInterno;


        const angulo =
            -Math.PI / 2 +
            (Math.PI * 2 /
                (pontos * 2))
            * i;


        const x =
            CX +
            Math.cos(angulo)
            * raio;

        const y =
            CY +
            Math.sin(angulo)
            * raio;


        coordenadas.push(
            `${x},${y}`
        );

    }


    const estrela =
        criarElemento(
            "polygon",
            {

                points:
                    coordenadas.join(" "),

                fill: "none",

                stroke: "#dce4ff",

                "stroke-width": 1.4,

                opacity: 0.8

            }
        );


    svg.appendChild(estrela);

}


/* =========================================================
   ÁRVORE DA VIDA

   Representação geométrica inspirada nas
   sefirot da Cabala.
========================================================= */

function adicionarArvoreDaVida() {

    const posicoes = [

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


    const centroX = CX;
    const centroY = CY;


    /*
       CONEXÕES
    */

    const conexoes = [

        [0, 1],
        [0, 2],

        [1, 3],
        [1, 4],

        [2, 4],
        [2, 5],

        [3, 4],
        [4, 5],

        [3, 6],
        [4, 6],

        [4, 7],
        [5, 7],

        [6, 8],
        [7, 8],

        [6, 7]

    ];


    for (
        const [a, b]
        of conexoes
    ) {

        const p1 =
            posicoes[a];

        const p2 =
            posicoes[b];


        const linha =
            criarElemento(
                "line",
                {

                    x1:
                        centroX + p1[0],

                    y1:
                        centroY + p1[1],

                    x2:
                        centroX + p2[0],

                    y2:
                        centroY + p2[1],

                    stroke:
                        "#8997d2",

                    "stroke-width":
                        0.7,

                    opacity:
                        0.45

                }
            );


        svg.appendChild(linha);

    }


    /*
       SEFIROT
    */

    for (
        const [x, y]
        of posicoes
    ) {

        const circulo =
            criarElemento(
                "circle",
                {

                    cx:
                        centroX + x,

                    cy:
                        centroY + y,

                    r: 10,

                    fill:
                        "#090d19",

                    stroke:
                        "#dce4ff",

                    "stroke-width":
                        1.3

                }
            );


        svg.appendChild(circulo);

    }

}


/* =========================================================
   TEXTO NO CÍRCULO
========================================================= */

function adicionarTextoCircular(
    texto,
    raio
) {

    const grupo =
        criarElemento("g");


    const caracteres =
        normalizar(texto)
        .replace(/[^a-z]/g, "")
        .split("");


    if (
        caracteres.length === 0
    ) return;


    const anguloPorLetra =
        360 /
        caracteres.length;


    caracteres.forEach(
        (letra, indice) => {

            const angulo =
                indice *
                anguloPorLetra;


            const elemento =
                criarElemento(
                    "text",
                    {

                        x: CX,

                        y:
                            CY - raio,

                        fill:
                            "#eef2ff",

                        "font-size":
                            "18px",

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


            elemento.textContent =
                letra.toUpperCase();


            grupo.appendChild(
                elemento
            );

        }
    );


    svg.appendChild(grupo);

}


/* =========================================================
   TEXTO CENTRAL
========================================================= */

function adicionarTextoCentral(
    texto
) {

    const elemento =
        criarElemento(
            "text",
            {

                x: CX,

                y: CY + 5,

                fill:
                    "#ffffff",

                "font-size":
                    "18px",

                "font-family":
                    "serif",

                "text-anchor":
                    "middle",

                "letter-spacing":
                    "3px"

            }
        );


    elemento.textContent =
        texto.toUpperCase();


    svg.appendChild(elemento);

}


/* =========================================================
   GERAR CÍRCULO
========================================================= */

function gerarCirculo() {

    /*
       LIMPA SVG
    */

    while (
        svg.firstChild
    ) {

        svg.removeChild(
            svg.firstChild
        );

    }


    /*
       FUNDO
    */

    const fundo =
        criarElemento(
            "rect",
            {

                x: 0,
                y: 0,

                width: 800,
                height: 800,

                fill: "#05070d"

            }
        );


    svg.appendChild(
        fundo
    );


    /*
       CÍRCULOS PRINCIPAIS
    */

    adicionarCirculo(
        370,
        2,
        0.9
    );

    adicionarCirculo(
        350,
        1,
        0.8
    );

    adicionarCirculo(
        300,
        1.5,
        0.8
    );

    adicionarCirculo(
        245,
        1,
        0.6
    );

    adicionarCirculo(
        190,
        1.2,
        0.8
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

    adicionarLinhasRadiais(
        16,
        350
    );


    /*
       ÁRVORE DA VIDA
    */

    adicionarArvoreDaVida();


    /*
       TEXTO MÁGICO
    */

    const texto =
        construirTexto();


    adicionarTextoCircular(
        texto,
        325
    );


    /*
       TEXTO CENTRAL
    */

    const nome =
        nomeMagia.value.trim();


    if (
        nome !== ""
    ) {

        adicionarTextoCentral(
            nome
        );

    }


    /*
       ATUALIZA INFORMAÇÕES
    */

    mostrarEfeito.textContent =
        efeitoSelect.value;

    mostrarElemento.textContent =
        elementoSelect.value;

    mostrarForma.textContent =
        formaSelect.value;

    mostrarTraducao.textContent =
        texto;

}


/* =========================================================
   TAMANHO
========================================================= */

tamanhoInput.addEventListener(
    "input",
    () => {

        const tamanho =
            tamanhoInput.value;


        tamanhoValor.textContent =
            `${tamanho} px`;


        svg.style.width =
            `${tamanho}px`;

    }
);


/* =========================================================
   BOTÃO GERAR
========================================================= */

gerarButton.addEventListener(
    "click",
    gerarCirculo
);



/* =========================================================
   ATUALIZAÇÃO AUTOMÁTICA
========================================================= */

efeitoSelect.addEventListener(
    "change",
    gerarCirculo
);

elementoSelect.addEventListener(
    "change",
    gerarCirculo
);

formaSelect.addEventListener(
    "change",
    gerarCirculo
);

nomeMagia.addEventListener(
    "input",
    gerarCirculo
);


/* =========================================================
   PRIMEIRA GERAÇÃO
========================================================= */

gerarCirculo();
```
