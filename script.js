```javascript
/* =========================================================
   GERADOR DE CÍRCULOS MÁGICOS
   =========================================================

   PASTA:

   letras/
   ├── A.png
   ├── B.png
   ├── C.png
   ├── ...
   ├── Z.png
   └── Ç.png

   ========================================================= */


/* =========================================================
   CONFIGURAÇÕES
   ========================================================= */

const SVG_SIZE = 800;

const CX = 400;
const CY = 400;

const LETRAS_PATH = "letras/";

const COR = "#dce4ff";
const COR_FRACA = "#8997d2";
const FUNDO = "#05070d";


/* =========================================================
   PEGAR ELEMENTOS DO HTML
   ========================================================= */

const svg = document.getElementById("circuloMagico");

const selectEfeito = document.getElementById("efeito");
const selectElemento = document.getElementById("elemento");
const selectForma = document.getElementById("forma");

const inputNome = document.getElementById("nomeMagia");

const botaoGerar = document.getElementById("gerar");
const botaoBaixar = document.getElementById("baixar");

const sliderTamanho = document.getElementById("tamanho");
const tamanhoValor = document.getElementById("tamanhoValor");

const infoEfeito = document.getElementById("mostrarEfeito");
const infoElemento = document.getElementById("mostrarElemento");
const infoForma = document.getElementById("mostrarForma");
const infoTraducao = document.getElementById("mostrarTraducao");


/* =========================================================
   CAMINHOS DAS LETRAS
   ========================================================= */

const LETRAS = {

    A: "letras/A.png",
    B: "letras/B.png",
    C: "letras/C.png",
    D: "letras/D.png",
    E: "letras/E.png",
    F: "letras/F.png",
    G: "letras/G.png",
    H: "letras/H.png",
    I: "letras/I.png",
    J: "letras/J.png",
    K: "letras/K.png",
    L: "letras/L.png",
    M: "letras/M.png",
    N: "letras/N.png",
    O: "letras/O.png",
    P: "letras/P.png",
    Q: "letras/Q.png",
    R: "letras/R.png",
    S: "letras/S.png",
    T: "letras/T.png",
    U: "letras/U.png",
    V: "letras/V.png",
    W: "letras/W.png",
    X: "letras/X.png",
    Y: "letras/Y.png",
    Z: "letras/Z.png",
    Ç: "letras/Ç.png"

};


/* =========================================================
   CRIADOR DE ELEMENTOS SVG
   ========================================================= */

function svgElement(tag, atributos = {}) {

    const elemento = document.createElementNS(
        "http://www.w3.org/2000/svg",
        tag
    );

    for (const chave in atributos) {

        elemento.setAttribute(
            chave,
            atributos[chave]
        );

    }

    return elemento;

}


/* =========================================================
   ADICIONAR AO SVG
   ========================================================= */

function add(elemento) {

    svg.appendChild(elemento);

}


/* =========================================================
   NORMALIZAR TEXTO
   =========================================================

   IMPORTANTE:

   Ç precisa continuar sendo Ç.

   Por isso ele é temporariamente
   substituído antes do normalize().
   ========================================================= */

function normalizar(texto) {

    return texto

        .toUpperCase()

        .replace(/Ç/g, "__CEDILHA__")

        .normalize("NFD")

        .replace(/[\u0300-\u036f]/g, "")

        .replace(/__CEDILHA__/g, "Ç");

}


/* =========================================================
   PEGAR SOMENTE LETRAS
   ========================================================= */

function apenasLetras(texto) {

    return normalizar(texto)
        .replace(/[^A-ZÇ]/g, "");

}


/* =========================================================
   FUNDO
   ========================================================= */

function criarFundo() {

    const fundo = svgElement(
        "rect",
        {
            x: 0,
            y: 0,
            width: SVG_SIZE,
            height: SVG_SIZE,
            fill: FUNDO
        }
    );

    add(fundo);

}


/* =========================================================
   GRADIENTE
   ========================================================= */

function criarGradiente() {

    const defs = svgElement("defs");

    const gradient = svgElement(
        "radialGradient",
        {
            id: "brilho"
        }
    );

    const stop1 = svgElement(
        "stop",
        {
            offset: "0%",
            "stop-color": "#293761",
            "stop-opacity": "0.8"
        }
    );

    const stop2 = svgElement(
        "stop",
        {
            offset: "65%",
            "stop-color": "#10172b",
            "stop-opacity": "0.4"
        }
    );

    const stop3 = svgElement(
        "stop",
        {
            offset: "100%",
            "stop-color": FUNDO,
            "stop-opacity": "0"
        }
    );

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);

    defs.appendChild(gradient);

    add(defs);

    const brilho = svgElement(
        "circle",
        {
            cx: CX,
            cy: CY,
            r: 320,
            fill: "url(#brilho)"
        }
    );

    add(brilho);

}


/* =========================================================
   CÍRCULO
   ========================================================= */

function circulo(
    raio,
    espessura = 1,
    cor = COR
) {

    const c = svgElement(
        "circle",
        {
            cx: CX,
            cy: CY,
            r: raio,
            fill: "none",
            stroke: cor,
            "stroke-width": espessura
        }
    );

    add(c);

}


/* =========================================================
   CÍRCULOS PRINCIPAIS
   ========================================================= */

function criarCirculos() {

    circulo(375, 2);
    circulo(355, 1);
    circulo(330, 1);
    circulo(305, 1);
    circulo(280, 1);
    circulo(250, 1);
    circulo(220, 1);
    circulo(185, 1);
    circulo(150, 1);

}


/* =========================================================
   POLÍGONO
   ========================================================= */

function poligono(
    lados,
    raio,
    rotacao = -Math.PI / 2,
    cor = COR_FRACA,
    espessura = 1
) {

    let pontos = [];

    for (let i = 0; i < lados; i++) {

        const angulo =
            rotacao +
            i * Math.PI * 2 / lados;

        const x =
            CX +
            Math.cos(angulo) * raio;

        const y =
            CY +
            Math.sin(angulo) * raio;

        pontos.push(
            x + "," + y
        );

    }

    const p = svgElement(
        "polygon",
        {
            points: pontos.join(" "),
            fill: "none",
            stroke: cor,
            "stroke-width": espessura
        }
    );

    add(p);

}


/* =========================================================
   GEOMETRIA
   ========================================================= */

function criarGeometria() {

    /* Triângulo */

    poligono(
        3,
        290,
        -Math.PI / 2,
        COR_FRACA,
        1
    );


    /* Triângulo invertido */

    poligono(
        3,
        290,
        Math.PI / 2,
        COR_FRACA,
        1
    );


    /* Quadrado */

    poligono(
        4,
        250,
        Math.PI / 4,
        COR_FRACA,
        1
    );


    /* Hexágono */

    poligono(
        6,
        215,
        -Math.PI / 2,
        COR,
        1.5
    );


    /* Octógono */

    poligono(
        8,
        180,
        Math.PI / 8,
        COR_FRACA,
        1
    );

}


/* =========================================================
   LINHAS RADIAIS
   ========================================================= */

function linhasRadiais() {

    const quantidade = 16;

    for (let i = 0; i < quantidade; i++) {

        const angulo =
            i *
            Math.PI *
            2 /
            quantidade;

        const x1 =
            CX +
            Math.cos(angulo) *
            285;

        const y1 =
            CY +
            Math.sin(angulo) *
            285;

        const x2 =
            CX +
            Math.cos(angulo) *
            350;

        const y2 =
            CY +
            Math.sin(angulo) *
            350;

        const linha = svgElement(
            "line",
            {
                x1,
                y1,
                x2,
                y2,
                stroke: COR_FRACA,
                "stroke-width": 1
            }
        );

        add(linha);

    }

}


/* =========================================================
   PONTOS DECORATIVOS
   ========================================================= */

function pontosDecorativos() {

    const quantidade = 32;

    for (let i = 0; i < quantidade; i++) {

        const angulo =
            i *
            Math.PI *
            2 /
            quantidade;

        const x =
            CX +
            Math.cos(angulo) *
            350;

        const y =
            CY +
            Math.sin(angulo) *
            350;

        const ponto = svgElement(
            "circle",
            {
                cx: x,
                cy: y,
                r: 3,
                fill: COR
            }
        );

        add(ponto);

    }

}


/* =========================================================
   LOSANGOS
   ========================================================= */

function losangos() {

    const quantidade = 16;

    const raio = 315;

    for (let i = 0; i < quantidade; i++) {

        const angulo =
            i *
            Math.PI *
            2 /
            quantidade;

        const x =
            CX +
            Math.cos(angulo) *
            raio;

        const y =
            CY +
            Math.sin(angulo) *
            raio;

        const t = 6;

        const pontos = [

            x + "," + (y - t),

            (x + t) + "," + y,

            x + "," + (y + t),

            (x - t) + "," + y

        ];

        const losango = svgElement(
            "polygon",
            {
                points:
                    pontos.join(" "),

                fill: "none",

                stroke: COR,

                "stroke-width": 1
            }
        );

        add(losango);

    }

}


/* =========================================================
   ÁRVORE DA VIDA
   ========================================================= */

function arvoreDaVida() {

    const pontos = [

        [0, -140],

        [-70, -70],

        [70, -70],

        [-95, 0],

        [0, 0],

        [95, 0],

        [-70, 70],

        [70, 70],

        [0, 140]

    ];


    const conexoes = [

        [0, 1],
        [0, 2],

        [1, 2],

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

        [6, 7],

        [6, 8],
        [7, 8]

    ];


    /* Linhas */

    conexoes.forEach(par => {

        const a = pontos[par[0]];
        const b = pontos[par[1]];

        const linha = svgElement(
            "line",
            {
                x1: CX + a[0],
                y1: CY + a[1],

                x2: CX + b[0],
                y2: CY + b[1],

                stroke: COR_FRACA,

                "stroke-width": 1
            }
        );

        add(linha);

    });


    /* Esferas */

    pontos.forEach(p => {

        const esfera = svgElement(
            "circle",
            {
                cx: CX + p[0],
                cy: CY + p[1],

                r: 9,

                fill: FUNDO,

                stroke: COR,

                "stroke-width": 1.5
            }
        );

        add(esfera);

    });

}


/* =========================================================
   ESTRELA CENTRAL
   ========================================================= */

function estrelaCentral() {

    let pontos = [];

    for (let i = 0; i < 16; i++) {

        const raio =
            i % 2 === 0
                ? 145
                : 60;

        const angulo =
            -Math.PI / 2 +
            i *
            Math.PI *
            2 /
            16;

        const x =
            CX +
            Math.cos(angulo) *
            raio;

        const y =
            CY +
            Math.sin(angulo) *
            raio;

        pontos.push(
            x + "," + y
        );

    }

    const estrela = svgElement(
        "polygon",
        {
            points:
                pontos.join(" "),

            fill: "none",

            stroke: COR,

            "stroke-width": 1.5
        }
    );

    add(estrela);

}


/* =========================================================
   PONTOS CARDINAIS
   ========================================================= */

function pontosCardeais() {

    const pontos = [

        [400, 25],
        [775, 400],
        [400, 775],
        [25, 400]

    ];

    pontos.forEach(p => {

        const ponto = svgElement(
            "circle",
            {
                cx: p[0],
                cy: p[1],

                r: 6,

                fill: FUNDO,

                stroke: COR,

                "stroke-width": 2
            }
        );

        add(ponto);

    });

}


/* =========================================================
   CRUZ CENTRAL
   ========================================================= */

function cruzCentral() {

    const horizontal = svgElement(
        "line",
        {
            x1: 375,
            y1: 400,

            x2: 425,
            y2: 400,

            stroke: COR_FRACA,

            "stroke-width": 1
        }
    );

    const vertical = svgElement(
        "line",
        {
            x1: 400,
            y1: 375,

            x2: 400,
            y2: 425,

            stroke: COR_FRACA,

            "stroke-width": 1
        }
    );

    add(horizontal);
    add(vertical);

}


/* =========================================================
   PEGAR EFEITO E NÍVEL
   ========================================================= */

function efeitoAtual() {

    const texto =
        selectEfeito.value.trim();

    const resultado =
        texto.match(
            /^(.*?)(?:\s+(\d+))?$/
        );

    if (!resultado) {

        return {
            nome: texto,
            nivel: 1
        };

    }

    return {

        nome: resultado[1],

        nivel:
            Number(
                resultado[2] || 1
            )

    };

}


/* =========================================================
   TRADUÇÃO
   ========================================================= */

function criarTraducao() {

    const dados =
        efeitoAtual();

    let partes = [];


    for (
        let i = 0;
        i < dados.nivel;
        i++
    ) {

        partes.push(
            dados.nome
        );

    }


    partes.push(
        selectElemento.value
    );


    partes.push(
        selectForma.value
    );


    return partes.join(" ");

}


/* =========================================================
   CRIAR IMAGEM DE LETRA
   ========================================================= */

function imagemLetra(
    letra,
    x,
    y,
    angulo,
    tamanho = 28
) {

    /*
       Caso seja uma letra que não existe,
       não tenta criar imagem.
    */

    if (!LETRAS[letra]) {

        textoLetra(
            letra,
            x,
            y,
            angulo,
            tamanho
        );

        return;

    }


    const imagem = svgElement(
        "image",
        {
            x:
                x -
                tamanho / 2,

            y:
                y -
                tamanho / 2,

            width:
                tamanho,

            height:
                tamanho,

            href:
                LETRAS[letra],

            "xlink:href":
                LETRAS[letra],

            preserveAspectRatio:
                "xMidYMid meet",

            transform:
                `rotate(${angulo} ${x} ${y})`
        }
    );


    /*
       Se o PNG não existir,
       coloca uma letra normal.
    */

    imagem.onerror = function () {

        imagem.remove();

        textoLetra(
            letra,
            x,
            y,
            angulo,
            tamanho
        );

    };


    add(imagem);

}


/* =========================================================
   FALLBACK DE LETRA
   ========================================================= */

function textoLetra(
    letra,
    x,
    y,
    angulo,
    tamanho
) {

    const texto = svgElement(
        "text",
        {
            x,
            y,

            fill: COR,

            "font-size":
                tamanho,

            "font-family":
                "Georgia, serif",

            "font-weight":
                "bold",

            "text-anchor":
                "middle",

            "dominant-baseline":
                "middle",

            transform:
                `rotate(${angulo} ${x} ${y})`
        }
    );

    texto.textContent = letra;

    add(texto);

}


/* =========================================================
   TEXTO CIRCULAR
   ========================================================= */

function textoCircular(
    texto,
    raio,
    tamanho = 28,
    inicio = -90
) {

    const caracteres =
        apenasLetras(texto)
        .split("");

    if (
        caracteres.length === 0
    ) {

        return;

    }


    const total =
        caracteres.length;


    caracteres.forEach(
        (letra, indice) => {

            let angulo;

            if (total === 1) {

                angulo = inicio;

            } else {

                angulo =
                    inicio +
                    (
                        indice *
                        360 /
                        total
                    );

            }


            const radianos =
                angulo *
                Math.PI /
                180;


            const x =
                CX +
                Math.cos(radianos) *
                raio;


            const y =
                CY +
                Math.sin(radianos) *
                raio;


            imagemLetra(
                letra,
                x,
                y,
                angulo + 90,
                tamanho
            );

        }
    );

}


/* =========================================================
   ESCRITA MÁGICA
   ========================================================= */

function escritaMagica() {

    const dados =
        efeitoAtual();


    /*
       Efeito.
    */

    textoCircular(
        dados.nome,
        330,
        28,
        -90
    );


    /*
       Nível 2.
    */

    if (
        dados.nivel >= 2
    ) {

        textoCircular(
            dados.nome,
            295,
            26,
            -90
        );

    }


    /*
       Nível 3.
    */

    if (
        dados.nivel >= 3
    ) {

        textoCircular(
            dados.nome,
            260,
            24,
            -90
        );

    }


    /*
       Nível 4.
    */

    if (
        dados.nivel >= 4
    ) {

        textoCircular(
            dados.nome,
            225,
            22,
            -90
        );

    }


    /*
       Elemento.
    */

    textoCircular(
        selectElemento.value,
        350,
        24,
        0
    );


    /*
       Forma.
    */

    textoCircular(
        selectForma.value,
        180,
        22,
        0
    );

}


/* =========================================================
   NOME CENTRAL
   ========================================================= */

function nomeCentral() {

    const nome =
        inputNome.value.trim();

    if (!nome) {

        return;

    }


    const linha = svgElement(
        "line",
        {
            x1: 315,
            y1: 350,

            x2: 485,
            y2: 350,

            stroke: COR_FRACA,

            "stroke-width": 1
        }
    );

    add(linha);


    const texto = svgElement(
        "text",
        {
            x: CX,

            y: 345,

            fill: "#ffffff",

            "font-size": 17,

            "font-family":
                "Georgia, serif",

            "font-weight":
                "bold",

            "text-anchor":
                "middle"
        }
    );

    texto.textContent =
        normalizar(nome);

    add(texto);

}


/* =========================================================
   ATUALIZAR INFORMAÇÕES
   ========================================================= */

function atualizarInformacoes() {

    if (infoEfeito) {

        infoEfeito.textContent =
            selectEfeito.value;

    }


    if (infoElemento) {

        infoElemento.textContent =
            selectElemento.value;

    }


    if (infoForma) {

        infoForma.textContent =
            selectForma.value;

    }


    if (infoTraducao) {

        infoTraducao.textContent =
            criarTraducao();

    }

}


/* =========================================================
   GERAR CÍRCULO
   ========================================================= */

function gerarCirculo() {

    /*
       Se por algum motivo o SVG não existir,
       mostra erro no console.
    */

    if (!svg) {

        console.error(
            "ERRO: não encontrei #circuloMagico."
        );

        return;

    }


    /*
       Limpar.
    */

    svg.innerHTML = "";


    /*
       Tamanho.
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


    svg.setAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg"
    );


    /*
       Construção.
    */

    criarFundo();

    criarGradiente();

    criarCirculos();

    linhasRadiais();

    criarGeometria();

    pontosDecorativos();

    losangos();

    arvoreDaVida();

    estrelaCentral();

    escritaMagica();

    pontosCardeais();

    cruzCentral();

    nomeCentral();


    /*
       Informações.
    */

    atualizarInformacoes();

}


/* =========================================================
   TAMANHO
   ========================================================= */

function atualizarTamanho() {

    if (!sliderTamanho) {

        return;

    }


    const valor =
        sliderTamanho.value;


    if (tamanhoValor) {

        tamanhoValor.textContent =
            valor + " px";

    }


    svg.style.width =
        valor + "px";

    svg.style.height =
        "auto";

}


/* =========================================================
   DOWNLOAD SVG
   ========================================================= */

function baixarSVG() {

    /*
       Clonar o SVG.
    */

    const copia =
        svg.cloneNode(true);


    copia.setAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg"
    );


    copia.setAttribute(
        "width",
        "800"
    );


    copia.setAttribute(
        "height",
        "800"
    );


    /*
       Transformar em texto.
    */

    const codigo =
        new XMLSerializer()
        .serializeToString(copia);


    /*
       Criar arquivo.
    */

    const blob =
        new Blob(
            [codigo],
            {
                type:
                    "image/svg+xml"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "circulo-magico.svg";


    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );


    setTimeout(
        () => URL.revokeObjectURL(url),
        1000
    );

}


/* =========================================================
   DOWNLOAD PNG
   ========================================================= */

function baixarPNG() {

    /*
       Primeiro criamos uma cópia.
    */

    const copia =
        svg.cloneNode(true);


    copia.setAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg"
    );


    copia.setAttribute(
        "width",
        "800"
    );


    copia.setAttribute(
        "height",
        "800"
    );


    /*
       Serializar.
    */

    const codigo =
        new XMLSerializer()
        .serializeToString(copia);


    /*
       Criar Blob.
    */

    const blob =
        new Blob(
            [codigo],
            {
                type:
                    "image/svg+xml"
            }
        );


    const url =
        URL.createObjectURL(blob);


    /*
       Criar imagem temporária.
    */

    const imagem =
        new Image();


    imagem.onload = function () {

        const canvas =
            document.createElement(
                "canvas"
            );


        canvas.width = 1600;

        canvas.height = 1600;


        const ctx =
            canvas.getContext("2d");


        /*
           Fundo.
        */

        ctx.fillStyle =
            FUNDO;


        ctx.fillRect(
            0,
            0,
            1600,
            1600
        );


        /*
           Desenhar.
        */

        try {

            ctx.drawImage(
                imagem,
                0,
                0,
                1600,
                1600
            );


            /*
               Converter.
            */

            canvas.toBlob(
                function (arquivo) {

                    if (!arquivo) {

                        alert(
                            "O navegador não conseguiu criar o PNG. " +
                            "Use o download SVG."
                        );

                        URL.revokeObjectURL(
                            url
                        );

                        return;

                    }


                    const pngURL =
                        URL.createObjectURL(
                            arquivo
                        );


                    const link =
                        document.createElement(
                            "a"
                        );


                    link.href =
                        pngURL;


                    link.download =
                        "circulo-magico.png";


                    document.body.appendChild(
                        link
                    );


                    link.click();


                    document.body.removeChild(
                        link
                    );


                    setTimeout(
                        () => {

                            URL.revokeObjectURL(
                                pngURL
                            );

                        },
                        1000
                    );

                },
                "image/png"
            );

        } catch (erro) {

            console.error(
                erro
            );


            alert(
                "O PNG foi bloqueado pelo navegador. " +
                "O SVG continua disponível."
            );

        }


        URL.revokeObjectURL(url);

    };


    imagem.onerror =
        function () {

            URL.revokeObjectURL(url);

            alert(
                "Não foi possível converter o círculo para PNG."
            );

        };


    imagem.src = url;

}


/* =========================================================
   EVENTOS
   ========================================================= */

if (botaoGerar) {

    botaoGerar.onclick =
        gerarCirculo;

}


if (botaoBaixar) {

    botaoBaixar.onclick =
        baixarPNG;

}


if (selectEfeito) {

    selectEfeito.onchange =
        gerarCirculo;

}


if (selectElemento) {

    selectElemento.onchange =
        gerarCirculo;

}


if (selectForma) {

    selectForma.onchange =
        gerarCirculo;

}


if (inputNome) {

    inputNome.oninput =
        gerarCirculo;

}


if (sliderTamanho) {

    sliderTamanho.oninput =
        atualizarTamanho;

}


/* =========================================================
   TECLA S = BAIXAR SVG
   ========================================================= */

document.addEventListener(
    "keydown",
    function (evento) {

        /*
           Ctrl + Shift + S
        */

        if (
            evento.ctrlKey &&
            evento.shiftKey &&
            evento.key.toLowerCase() === "s"
        ) {

            evento.preventDefault();

            baixarSVG();

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

atualizarTamanho();

gerarCirculo();


/* =========================================================
   MENSAGEM DE TESTE
   ========================================================= */

console.log(
    "Gerador de Círculos Mágicos carregado."
);

console.log(
    "Pasta das letras:",
    LETRAS_PATH
);
```
