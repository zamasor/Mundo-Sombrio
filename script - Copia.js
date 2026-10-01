```javascript
/* ============================================================
   GERADOR DE CÍRCULOS MÁGICOS
   ============================================================

   ALFABETO PERSONALIZADO

   A.png
   B.png
   C.png
   ...
   Z.png
   Ç.png

   Todos os arquivos devem estar dentro da pasta:

   letras/

   ============================================================ */


/* ============================================================
   1. ELEMENTOS DO HTML
   ============================================================ */

const svg = document.getElementById("circuloMagico");

const efeito = document.getElementById("efeito");
const elemento = document.getElementById("elemento");
const forma = document.getElementById("forma");

const nomeMagia = document.getElementById("nomeMagia");

const botaoGerar = document.getElementById("gerar");
const botaoBaixar = document.getElementById("baixar");

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


/* ============================================================
   2. CONFIGURAÇÕES
   ============================================================ */

const CENTRO_X = 400;
const CENTRO_Y = 400;

const TAMANHO_SVG = 800;

const PASTA_LETRAS = "letras/";

const TAMANHO_LETRA = 28;

const COR_PRINCIPAL = "#dce4ff";

const COR_SECUNDARIA = "#8997d2";

const COR_FUNDO = "#05070d";


/* ============================================================
   3. MAPA DO ALFABETO
   ============================================================ */


/*
   IMPORTANTE:

   Os nomes dos arquivos estão com letras MAIÚSCULAS.

   Portanto:

   A -> A.png
   B -> B.png
   C -> C.png

   etc.

   Ç -> Ç.png
*/

const letras = {

    "A": "letras/A.png",
    "B": "letras/B.png",
    "C": "letras/C.png",
    "D": "letras/D.png",
    "E": "letras/E.png",
    "F": "letras/F.png",
    "G": "letras/G.png",
    "H": "letras/H.png",
    "I": "letras/I.png",
    "J": "letras/J.png",
    "K": "letras/K.png",
    "L": "letras/L.png",
    "M": "letras/M.png",
    "N": "letras/N.png",
    "O": "letras/O.png",
    "P": "letras/P.png",
    "Q": "letras/Q.png",
    "R": "letras/R.png",
    "S": "letras/S.png",
    "T": "letras/T.png",
    "U": "letras/U.png",
    "V": "letras/V.png",
    "W": "letras/W.png",
    "X": "letras/X.png",
    "Y": "letras/Y.png",
    "Z": "letras/Z.png",
    "Ç": "letras/Ç.png"

};


/* ============================================================
   4. CRIAR ELEMENTO SVG
   ============================================================ */

function criarElemento(tag, atributos = {}) {

    const elementoSVG =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            tag
        );

    Object.keys(atributos).forEach(chave => {

        elementoSVG.setAttribute(
            chave,
            atributos[chave]
        );

    });

    return elementoSVG;

}


/* ============================================================
   5. ADICIONAR AO SVG
   ============================================================ */

function adicionar(elementoSVG) {

    svg.appendChild(elementoSVG);

}


/* ============================================================
   6. NORMALIZAÇÃO
   ============================================================ */


/*
   Remove acentos de letras normais.

   Porém preserva o Ç.

   Exemplo:

   Água
   vira
   Agua

   Elétrico
   vira
   Eletrico

   Psíquico
   vira
   Psiquico

   Mas:

   Ç
   continua
   Ç
*/

function normalizarTexto(texto) {

    return texto
        .replace(/ç/gi, "Ç")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/Ç/g, "Ç")
        .toUpperCase();

}


/* ============================================================
   7. PEGAR APENAS LETRAS
   ============================================================ */

function somenteLetras(texto) {

    texto = normalizarTexto(texto);

    return texto
        .replace(/[^A-ZÇ]/g, "");

}


/* ============================================================
   8. CRIAR CÍRCULO
   ============================================================ */

function criarCirculo(
    raio,
    espessura = 1,
    cor = COR_PRINCIPAL
) {

    adicionar(

        criarElemento("circle", {

            cx: CENTRO_X,

            cy: CENTRO_Y,

            r: raio,

            fill: "none",

            stroke: cor,

            "stroke-width": espessura

        })

    );

}


/* ============================================================
   9. CÍRCULOS PRINCIPAIS
   ============================================================ */

function criarCirculosPrincipais() {

    criarCirculo(375, 2);

    criarCirculo(355, 1);

    criarCirculo(330, 1);

    criarCirculo(305, 1);

    criarCirculo(280, 1);

    criarCirculo(250, 1);

    criarCirculo(220, 1);

    criarCirculo(180, 1);

    criarCirculo(145, 1);

}


/* ============================================================
   10. POLÍGONO
   ============================================================ */

function criarPoligono(
    lados,
    raio,
    rotacao = -Math.PI / 2,
    cor = COR_PRINCIPAL,
    espessura = 1
) {

    let pontos = [];

    for (
        let i = 0;
        i < lados;
        i++
    ) {

        const angulo =
            rotacao +
            i * Math.PI * 2 / lados;

        const x =
            CENTRO_X +
            Math.cos(angulo) *
            raio;

        const y =
            CENTRO_Y +
            Math.sin(angulo) *
            raio;

        pontos.push(
            `${x},${y}`
        );

    }


    adicionar(

        criarElemento("polygon", {

            points:
                pontos.join(" "),

            fill:
                "none",

            stroke:
                cor,

            "stroke-width":
                espessura

        })

    );

}


/* ============================================================
   11. GEOMETRIA MÁGICA
   ============================================================ */

function criarGeometria() {

    /*
       Triângulo para cima.
    */

    criarPoligono(
        3,
        290,
        -Math.PI / 2,
        COR_SECUNDARIA,
        1
    );


    /*
       Triângulo invertido.
    */

    criarPoligono(
        3,
        290,
        Math.PI / 2,
        COR_SECUNDARIA,
        1
    );


    /*
       Quadrado.
    */

    criarPoligono(
        4,
        250,
        Math.PI / 4,
        COR_SECUNDARIA,
        1
    );


    /*
       Hexágono.
    */

    criarPoligono(
        6,
        215,
        -Math.PI / 2,
        COR_PRINCIPAL,
        1
    );


    /*
       Octógono.
    */

    criarPoligono(
        8,
        175,
        Math.PI / 8,
        COR_SECUNDARIA,
        1
    );

}


/* ============================================================
   12. LINHAS RADIAIS
   ============================================================ */

function criarLinhasRadiais(
    quantidade,
    raioInterno,
    raioExterno
) {

    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const angulo =
            i *
            Math.PI *
            2 /
            quantidade;


        const x1 =
            CENTRO_X +
            Math.cos(angulo) *
            raioInterno;


        const y1 =
            CENTRO_Y +
            Math.sin(angulo) *
            raioInterno;


        const x2 =
            CENTRO_X +
            Math.cos(angulo) *
            raioExterno;


        const y2 =
            CENTRO_Y +
            Math.sin(angulo) *
            raioExterno;


        adicionar(

            criarElemento("line", {

                x1: x1,

                y1: y1,

                x2: x2,

                y2: y2,

                stroke:
                    COR_SECUNDARIA,

                "stroke-width":
                    1

            })

        );

    }

}


/* ============================================================
   13. PONTOS DECORATIVOS
   ============================================================ */

function criarPontosDecorativos() {

    const quantidade = 32;

    const raio = 350;


    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const angulo =
            i *
            Math.PI *
            2 /
            quantidade;


        const x =
            CENTRO_X +
            Math.cos(angulo) *
            raio;


        const y =
            CENTRO_Y +
            Math.sin(angulo) *
            raio;


        adicionar(

            criarElemento("circle", {

                cx: x,

                cy: y,

                r: 3,

                fill:
                    COR_PRINCIPAL

            })

        );

    }

}


/* ============================================================
   14. LOSANGOS
   ============================================================ */

function criarLosangos() {

    const quantidade = 16;

    const raio = 315;

    const tamanho = 6;


    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const angulo =
            i *
            Math.PI *
            2 /
            quantidade;


        const x =
            CENTRO_X +
            Math.cos(angulo) *
            raio;


        const y =
            CENTRO_Y +
            Math.sin(angulo) *
            raio;


        const pontos = [

            `${x},${y - tamanho}`,

            `${x + tamanho},${y}`,

            `${x},${y + tamanho}`,

            `${x - tamanho},${y}`

        ];


        adicionar(

            criarElemento("polygon", {

                points:
                    pontos.join(" "),

                fill:
                    "none",

                stroke:
                    COR_PRINCIPAL,

                "stroke-width":
                    1

            })

        );

    }

}


/* ============================================================
   15. ÁRVORE DA VIDA
   ============================================================ */

function criarArvoreDaVida() {

    const pontos = [

        [0, -145],

        [-75, -75],

        [75, -75],

        [-100, 0],

        [0, 0],

        [100, 0],

        [-75, 75],

        [75, 75],

        [0, 145]

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


    /*
       Linhas da Árvore.
    */

    conexoes.forEach(
        conexao => {

            const a =
                pontos[conexao[0]];

            const b =
                pontos[conexao[1]];


            adicionar(

                criarElemento("line", {

                    x1:
                        CENTRO_X + a[0],

                    y1:
                        CENTRO_Y + a[1],

                    x2:
                        CENTRO_X + b[0],

                    y2:
                        CENTRO_Y + b[1],

                    stroke:
                        COR_SECUNDARIA,

                    "stroke-width":
                        1

                })

            );

        }
    );


    /*
       Esferas da Árvore.
    */

    pontos.forEach(
        ponto => {

            adicionar(

                criarElemento(
                    "circle",
                    {

                        cx:
                            CENTRO_X +
                            ponto[0],

                        cy:
                            CENTRO_Y +
                            ponto[1],

                        r: 9,

                        fill:
                            COR_FUNDO,

                        stroke:
                            COR_PRINCIPAL,

                        "stroke-width":
                            1.5

                    }
                )

            );

        }
    );

}


/* ============================================================
   16. ESTRELA CENTRAL
   ============================================================ */

function criarEstrelaCentral() {

    let pontos = [];

    const quantidade = 16;


    for (
        let i = 0;
        i < quantidade;
        i++
    ) {

        const raio =
            i % 2 === 0
                ? 145
                : 65;


        const angulo =
            -Math.PI / 2 +
            i *
            Math.PI *
            2 /
            quantidade;


        const x =
            CENTRO_X +
            Math.cos(angulo) *
            raio;


        const y =
            CENTRO_Y +
            Math.sin(angulo) *
            raio;


        pontos.push(
            `${x},${y}`
        );

    }


    adicionar(

        criarElemento("polygon", {

            points:
                pontos.join(" "),

            fill:
                "none",

            stroke:
                COR_PRINCIPAL,

            "stroke-width":
                1.5

        })

    );

}


/* ============================================================
   17. PONTOS CARDINAIS
   ============================================================ */

function criarPontosCardeais() {

    const pontos = [

        [400, 25],

        [775, 400],

        [400, 775],

        [25, 400]

    ];


    pontos.forEach(
        ponto => {

            adicionar(

                criarElemento(
                    "circle",
                    {

                        cx:
                            ponto[0],

                        cy:
                            ponto[1],

                        r: 6,

                        fill:
                            COR_FUNDO,

                        stroke:
                            COR_PRINCIPAL,

                        "stroke-width":
                            2

                    }
                )

            );

        }
    );

}


/* ============================================================
   18. CRUZ CENTRAL
   ============================================================ */

function criarCruzCentral() {

    adicionar(

        criarElemento("line", {

            x1: 375,

            y1: 400,

            x2: 425,

            y2: 400,

            stroke:
                COR_SECUNDARIA,

            "stroke-width":
                1

        })

    );


    adicionar(

        criarElemento("line", {

            x1: 400,

            y1: 375,

            x2: 400,

            y2: 425,

            stroke:
                COR_SECUNDARIA,

            "stroke-width":
                1

        })

    );


    adicionar(

        criarElemento("circle", {

            cx: 400,

            cy: 400,

            r: 7,

            fill:
                COR_FUNDO,

            stroke:
                COR_PRINCIPAL,

            "stroke-width":
                1.5

        })

    );

}


/* ============================================================
   19. EFEITO + NÍVEL
   ============================================================ */

function obterEfeito() {

    const valor =
        efeito.value.trim();


    const resultado =
        valor.match(
            /^(.*?)(?:\s+(\d+))?$/
        );


    if (!resultado) {

        return {

            nome:
                valor,

            nivel:
                1

        };

    }


    return {

        nome:
            resultado[1],

        nivel:
            Number(
                resultado[2] || 1
            )

    };

}


/* ============================================================
   20. CONSTRUIR TRADUÇÃO
   ============================================================ */

function construirTraducao() {

    const dados =
        obterEfeito();


    let palavras = [];


    /*
       Repetição do efeito.
    */

    for (
        let i = 0;
        i < dados.nivel;
        i++
    ) {

        palavras.push(
            dados.nome
        );

    }


    /*
       Elemento.
    */

    palavras.push(
        elemento.value
    );


    /*
       Forma.
    */

    palavras.push(
        forma.value
    );


    return palavras.join(" ");

}


/* ============================================================
   21. PALAVRAS DA MAGIA
   ============================================================ */

function obterPalavrasMagia() {

    const dados =
        obterEfeito();


    let palavras = [];


    for (
        let i = 0;
        i < dados.nivel;
        i++
    ) {

        palavras.push(
            dados.nome
        );

    }


    palavras.push(
        elemento.value
    );


    palavras.push(
        forma.value
    );


    return palavras;

}


/* ============================================================
   22. CRIAR LETRA NORMAL COMO FALLBACK
   ============================================================ */

function criarLetraFallback(
    letra,
    x,
    y,
    angulo,
    tamanho
) {

    const texto =
        criarElemento(
            "text",
            {

                x: x,

                y: y,

                fill:
                    COR_PRINCIPAL,

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


    texto.textContent =
        letra;


    adicionar(texto);

}


/* ============================================================
   23. CRIAR IMAGEM DA LETRA
   ============================================================ */

function criarImagemLetra(
    letra,
    x,
    y,
    angulo,
    tamanho
) {

    /*
       Se não existir no mapa,
       usa fallback.
    */

    if (!letras[letra]) {

        criarLetraFallback(
            letra,
            x,
            y,
            angulo,
            tamanho
        );

        return;

    }


    const imagem =
        criarElemento(
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
                    letras[letra],

                preserveAspectRatio:
                    "xMidYMid meet",

                transform:
                    `rotate(${angulo} ${x} ${y})`

            }
        );


    /*
       Se a imagem não carregar,
       usamos a letra normal.
    */

    imagem.addEventListener(
        "error",
        function () {

            imagem.remove();


            criarLetraFallback(
                letra,
                x,
                y,
                angulo,
                tamanho
            );

        }
    );


    adicionar(imagem);

}


/* ============================================================
   24. TRANSFORMAR TEXTO EM LETRAS
   ============================================================ */

function obterLetras(texto) {

    return somenteLetras(texto)
        .split("");

}


/* ============================================================
   25. TEXTO CIRCULAR
   ============================================================ */

function colocarTextoCircular(
    texto,
    raio,
    tamanho,
    inicio = -90
) {

    const lista =
        obterLetras(texto);


    if (!lista.length)
        return;


    const quantidade =
        lista.length;


    lista.forEach(
        (letra, indice) => {

            let angulo;


            if (
                quantidade === 1
            ) {

                angulo =
                    inicio;

            } else {

                angulo =
                    inicio +
                    indice *
                    (
                        360 /
                        quantidade
                    );

            }


            const radianos =
                angulo *
                Math.PI /
                180;


            const x =
                CENTRO_X +
                Math.cos(radianos) *
                raio;


            const y =
                CENTRO_Y +
                Math.sin(radianos) *
                raio;


            /*
               +90 deixa o símbolo
               acompanhando o círculo.
            */

            criarImagemLetra(

                letra,

                x,

                y,

                angulo + 90,

                tamanho

            );

        }
    );

}


/* ============================================================
   26. ESCRITA MÁGICA
   ============================================================ */

function criarEscritaMagica() {

    const dados =
        obterEfeito();


    /*
       Efeito.
    */

    colocarTextoCircular(
        dados.nome,
        330,
        25,
        -90
    );


    /*
       Nível 2.
    */

    if (
        dados.nivel >= 2
    ) {

        colocarTextoCircular(
            dados.nome,
            295,
            23,
            -90
        );

    }


    /*
       Nível 3.
    */

    if (
        dados.nivel >= 3
    ) {

        colocarTextoCircular(
            dados.nome,
            260,
            21,
            -90
        );

    }


    /*
       Nível 4.
    */

    if (
        dados.nivel >= 4
    ) {

        colocarTextoCircular(
            dados.nome,
            225,
            19,
            -90
        );

    }


    /*
       ELEMENTO

       Fica em um anel externo.
    */

    colocarTextoCircular(
        elemento.value,
        350,
        22,
        0
    );


    /*
       FORMA

       Fica em um anel interno.
    */

    colocarTextoCircular(
        forma.value,
        180,
        21,
        0
    );

}


/* ============================================================
   27. NOME PERSONALIZADO
   ============================================================ */

function criarNomeCentral() {

    const nome =
        nomeMagia.value.trim();


    if (!nome)
        return;


    /*
       Linha acima.
    */

    adicionar(

        criarElemento("line", {

            x1: 320,

            y1: 355,

            x2: 480,

            y2: 355,

            stroke:
                COR_SECUNDARIA,

            "stroke-width":
                1

        })

    );


    /*
       Nome.
    */

    const texto =
        criarElemento(
            "text",
            {

                x:
                    CENTRO_X,

                y:
                    350,

                fill:
                    "#ffffff",

                "font-size":
                    16,

                "font-family":
                    "Georgia, serif",

                "font-weight":
                    "bold",

                "text-anchor":
                    "middle"

            }
        );


    texto.textContent =
        nome.toUpperCase();


    adicionar(texto);

}


/* ============================================================
   28. FUNDO
   ============================================================ */

function criarFundo() {

    adicionar(

        criarElemento("rect", {

            x: 0,

            y: 0,

            width: 800,

            height: 800,

            fill:
                COR_FUNDO

        })

    );

}


/* ============================================================
   29. GRADIENTE CENTRAL
   ============================================================ */

function criarGradiente() {

    const defs =
        criarElemento("defs");


    const gradiente =
        criarElemento(
            "radialGradient",
            {
                id:
                    "brilhoCentral"
            }
        );


    gradiente.appendChild(

        criarElemento(
            "stop",
            {

                offset:
                    "0%",

                "stop-color":
                    "#26345e",

                "stop-opacity":
                    "0.65"

            }
        )

    );


    gradiente.appendChild(

        criarElemento(
            "stop",
            {

                offset:
                    "65%",

                "stop-color":
                    "#10172c",

                "stop-opacity":
                    "0.3"

            }
        )

    );


    gradiente.appendChild(

        criarElemento(
            "stop",
            {

                offset:
                    "100%",

                "stop-color":
                    "#05070d",

                "stop-opacity":
                    "0"

            }
        )

    );


    defs.appendChild(
        gradiente
    );


    adicionar(defs);


    adicionar(

        criarElemento("circle", {

            cx:
                CENTRO_X,

            cy:
                CENTRO_Y,

            r:
                310,

            fill:
                "url(#brilhoCentral)"

        })

    );

}


/* ============================================================
   30. GERAR CÍRCULO
   ============================================================ */

function gerarCirculo() {

    /*
       Limpar o círculo antigo.
    */

    svg.innerHTML = "";


    /*
       Configuração SVG.
    */

    svg.setAttribute(
        "viewBox",
        "0 0 800 800"
    );


    svg.setAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg"
    );


    /*
       Fundo.
    */

    criarFundo();


    /*
       Brilho.
    */

    criarGradiente();


    /*
       Círculos.
    */

    criarCirculosPrincipais();


    /*
       Linhas radiais.
    */

    criarLinhasRadiais(
        16,
        280,
        350
    );


    /*
       Geometria.
    */

    criarGeometria();


    /*
       Decoração.
    */

    criarPontosDecorativos();

    criarLosangos();


    /*
       Árvore da Vida.
    */

    criarArvoreDaVida();


    /*
       Estrela.
    */

    criarEstrelaCentral();


    /*
       Escrita.
    */

    criarEscritaMagica();


    /*
       Pontos cardeais.
    */

    criarPontosCardeais();


    /*
       Cruz.
    */

    criarCruzCentral();


    /*
       Nome.
    */

    criarNomeCentral();


    /*
       Informações.
    */

    atualizarInformacoes();

}


/* ============================================================
   31. ATUALIZAR INFORMAÇÕES
   ============================================================ */

function atualizarInformacoes() {

    if (mostrarEfeito) {

        mostrarEfeito.textContent =
            efeito.value;

    }


    if (mostrarElemento) {

        mostrarElemento.textContent =
            elemento.value;

    }


    if (mostrarForma) {

        mostrarForma.textContent =
            forma.value;

    }


    if (mostrarTraducao) {

        mostrarTraducao.textContent =
            construirTraducao();

    }

}


/* ============================================================
   32. TAMANHO
   ============================================================ */

function atualizarTamanho() {

    if (!tamanho)
        return;


    const valor =
        tamanho.value;


    if (tamanhoValor) {

        tamanhoValor.textContent =
            valor + " px";

    }


    svg.style.width =
        valor + "px";

}


/* ============================================================
   33. EVENTOS
   ============================================================ */


/*
   Botão gerar.
*/

if (botaoGerar) {

    botaoGerar.addEventListener(
        "click",
        gerarCirculo
    );

}


/*
   Efeito.
*/

if (efeito) {

    efeito.addEventListener(
        "change",
        gerarCirculo
    );

}


/*
   Elemento.
*/

if (elemento) {

    elemento.addEventListener(
        "change",
        gerarCirculo
    );

}


/*
   Forma.
*/

if (forma) {

    forma.addEventListener(
        "change",
        gerarCirculo
    );

}


/*
   Nome.
*/

if (nomeMagia) {

    nomeMagia.addEventListener(
        "input",
        gerarCirculo
    );

}


/*
   Tamanho.
*/

if (tamanho) {

    tamanho.addEventListener(
        "input",
        atualizarTamanho
    );

}


/* ============================================================
   34. DOWNLOAD SVG
   ============================================================ */

function baixarSVG() {

    const copia =
        svg.cloneNode(true);


    copia.setAttribute(
        "xmlns",
        "http://www.w3.org/2000/svg"
    );


    const dados =
        new XMLSerializer()
        .serializeToString(copia);


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


    const link =
        document.createElement("a");


    link.href =
        url;


    link.download =
        "circulo-magico.svg";


    document.body.appendChild(
        link
    );


    link.click();


    document.body.removeChild(
        link
    );


    URL.revokeObjectURL(
        url
    );

}


/* ============================================================
   35. DOWNLOAD PNG
   ============================================================ */

function baixarPNG() {

    /*
       Serializar SVG.
    */

    const dadosSVG =
        new XMLSerializer()
        .serializeToString(svg);


    /*
       Criar Blob.
    */

    const blob =
        new Blob(
            [dadosSVG],
            {
                type:
                    "image/svg+xml;charset=utf-8"
            }
        );


    /*
       Criar URL temporária.
    */

    const url =
        URL.createObjectURL(blob);


    /*
       Criar imagem.
    */

    const imagem =
        new Image();


    imagem.onload = function () {

        /*
           PNG final.
        */

        const canvas =
            document.createElement(
                "canvas"
            );


        const tamanhoPNG =
            1600;


        canvas.width =
            tamanhoPNG;


        canvas.height =
            tamanhoPNG;


        const contexto =
            canvas.getContext(
                "2d"
            );


        /*
           Fundo.
        */

        contexto.fillStyle =
            COR_FUNDO;


        contexto.fillRect(
            0,
            0,
            tamanhoPNG,
            tamanhoPNG
        );


        /*
           Desenhar SVG.
        */

        contexto.drawImage(
            imagem,
            0,
            0,
            tamanhoPNG,
            tamanhoPNG
        );


        /*
           Criar link.
        */

        const link =
            document.createElement(
                "a"
            );


        link.download =
            "circulo-magico.png";


        link.href =
            canvas.toDataURL(
                "image/png"
            );


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );


        URL.revokeObjectURL(
            url
        );

    };


    imagem.onerror =
        function () {

            URL.revokeObjectURL(
                url
            );


            alert(
                "Não foi possível gerar o PNG. " +
                "Tente baixar o SVG."
            );

        };


    imagem.src =
        url;

}


/* ============================================================
   36. BOTÃO BAIXAR
   ============================================================ */

if (botaoBaixar) {

    botaoBaixar.addEventListener(
        "click",
        baixarPNG
    );

}


/*
   Shift + clique:

   baixa SVG em vez de PNG.
*/

if (botaoBaixar) {

    botaoBaixar.addEventListener(
        "click",
        function (evento) {

            if (evento.shiftKey) {

                evento.preventDefault();

                baixarSVG();

            }

        }
    );

}


/* ============================================================
   37. VERIFICAR IMAGEM
   ============================================================ */

function verificarImagem(letra) {

    return new Promise(
        resolver => {

            const imagem =
                new Image();


            imagem.onload =
                function () {

                    resolver(true);

                };


            imagem.onerror =
                function () {

                    resolver(false);

                };


            imagem.src =
                letras[letra];

        }
    );

}


/* ============================================================
   38. VERIFICAR ALFABETO
   ============================================================ */

async function verificarAlfabeto() {

    const resultado = {};


    const alfabeto =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ";


    for (
        const letra of alfabeto
    ) {

        resultado[letra] =
            await verificarImagem(
                letra
            );

    }


    return resultado;

}


/* ============================================================
   39. INICIALIZAÇÃO
   ============================================================ */


/*
   Atualiza o tamanho.
*/

atualizarTamanho();


/*
   Gera o círculo automaticamente.
*/

gerarCirculo();


/* ============================================================
   FIM DO SCRIPT
   ============================================================ */
```
