```javascript
/* ============================================================
   GERADOR DE CÍRCULOS MÁGICOS
   ============================================================

   Estrutura das letras:

   letras/
      a.png
      b.png
      c.png
      ...
      z.png

   Cada imagem representa uma letra da linguagem do RPG.

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

const mostrarEfeito = document.getElementById("mostrarEfeito");
const mostrarElemento = document.getElementById("mostrarElemento");
const mostrarForma = document.getElementById("mostrarForma");
const mostrarTraducao = document.getElementById("mostrarTraducao");


/* ============================================================
   2. CONFIGURAÇÕES
   ============================================================ */

const TAMANHO_SVG = 800;

const CENTRO_X = 400;
const CENTRO_Y = 400;


/*
   Pasta onde ficam as imagens das letras.
*/
const PASTA_LETRAS = "letras/";


/*
   Tamanho padrão das imagens das letras.
*/
const TAMANHO_LETRA = 25;


/*
   Cor principal do círculo.
*/
const COR_PRINCIPAL = "#dce4ff";


/*
   Cor secundária.
*/
const COR_SECUNDARIA = "#8997d2";


/*
   Fundo.
*/
const COR_FUNDO = "#05070d";


/* ============================================================
   3. ALFABETO
   ============================================================ */


/*
   Cria automaticamente:

   a -> letras/a.png
   b -> letras/b.png
   c -> letras/c.png

   etc.
*/

const letras = {};

"abcdefghijklmnopqrstuvwxyz".split("").forEach(letra => {

    letras[letra] =
        PASTA_LETRAS + letra + ".png";

});


/* ============================================================
   4. FUNÇÕES BÁSICAS DE SVG
   ============================================================ */


/*
   Cria um elemento SVG.
*/
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


/*
   Adiciona um elemento ao SVG.
*/
function adicionar(elementoSVG) {

    svg.appendChild(elementoSVG);

}


/* ============================================================
   5. NORMALIZAÇÃO DE TEXTO
   ============================================================ */


/*
   Remove acentos.

   Exemplo:

   "Água" -> "Agua"
   "Elétrico" -> "Eletrico"
   "Psíquico" -> "Psiquico"
*/
function normalizar(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

}


/*
   Remove tudo que não seja letra.

   Exemplo:

   "Repulsão 2" -> "repulsao"
*/
function somenteLetras(texto) {

    return normalizar(texto)
        .replace(/[^a-z]/g, "");

}


/* ============================================================
   6. CÍRCULOS
   ============================================================ */


/*
   Cria um círculo.
*/
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


/*
   Cria vários círculos concêntricos.
*/
function criarCirculosPrincipais() {

    criarCirculo(375, 2);
    criarCirculo(350, 1);
    criarCirculo(315, 1);
    criarCirculo(285, 1);
    criarCirculo(250, 1);
    criarCirculo(215, 1);
    criarCirculo(175, 1);

}


/* ============================================================
   7. POLÍGONOS
   ============================================================ */


/*
   Cria um polígono regular.

   lados = quantidade de lados
   raio = distância do centro
*/
function criarPoligono(
    lados,
    raio,
    rotacao = -Math.PI / 2,
    cor = COR_PRINCIPAL,
    espessura = 1
) {

    let pontos = [];

    for (let i = 0; i < lados; i++) {

        const angulo =
            rotacao +
            i * Math.PI * 2 / lados;

        const x =
            CENTRO_X +
            Math.cos(angulo) * raio;

        const y =
            CENTRO_Y +
            Math.sin(angulo) * raio;

        pontos.push(
            `${x},${y}`
        );

    }

    adicionar(

        criarElemento("polygon", {

            points: pontos.join(" "),

            fill: "none",

            stroke: cor,

            "stroke-width": espessura

        })

    );

}


/*
   Geometria principal.
*/
function criarGeometria() {

    criarPoligono(
        3,
        290,
        -Math.PI / 2,
        COR_SECUNDARIA,
        1
    );

    criarPoligono(
        3,
        290,
        Math.PI / 2,
        COR_SECUNDARIA,
        1
    );

    criarPoligono(
        4,
        250,
        Math.PI / 4,
        COR_SECUNDARIA,
        1
    );

    criarPoligono(
        6,
        290,
        -Math.PI / 2,
        COR_PRINCIPAL,
        1.5
    );

    criarPoligono(
        8,
        240,
        -Math.PI / 8,
        COR_SECUNDARIA,
        1
    );

}


/* ============================================================
   8. LINHAS RADIAIS
   ============================================================ */


/*
   Cria linhas saindo do centro.
*/
function criarLinhasRadiais(
    quantidade,
    raioInterno,
    raioExterno
) {

    for (let i = 0; i < quantidade; i++) {

        const angulo =
            i * Math.PI * 2 / quantidade;

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

                stroke: COR_SECUNDARIA,

                "stroke-width": 1

            })

        );

    }

}


/* ============================================================
   9. PEQUENOS SÍMBOLOS
   ============================================================ */


/*
   Cria pequenos círculos ao redor do círculo.
*/
function criarPontosDecorativos() {

    const quantidade = 24;

    const raio = 350;

    for (let i = 0; i < quantidade; i++) {

        const angulo =
            i * Math.PI * 2 / quantidade;

        const x =
            CENTRO_X +
            Math.cos(angulo) * raio;

        const y =
            CENTRO_Y +
            Math.sin(angulo) * raio;

        adicionar(

            criarElemento("circle", {

                cx: x,
                cy: y,

                r: 3,

                fill: COR_PRINCIPAL

            })

        );

    }

}


/*
   Cria pequenos losangos decorativos.
*/
function criarLosangos() {

    const quantidade = 12;

    const raio = 315;

    for (let i = 0; i < quantidade; i++) {

        const angulo =
            i * Math.PI * 2 / quantidade;

        const x =
            CENTRO_X +
            Math.cos(angulo) * raio;

        const y =
            CENTRO_Y +
            Math.sin(angulo) * raio;

        const tamanho = 7;

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

                fill: "none",

                stroke:
                    COR_PRINCIPAL,

                "stroke-width": 1

            })

        );

    }

}


/* ============================================================
   10. ÁRVORE DA VIDA
   ============================================================ */


/*
   Representação simplificada da Árvore da Vida.

             1

          2     3

        4    5    6

          7     8

             9
*/
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


    /*
       Conexões entre as esferas.
    */
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
       Linhas.
    */
    conexoes.forEach(conexao => {

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

    });


    /*
       Esferas.
    */
    pontos.forEach(ponto => {

        adicionar(

            criarElemento("circle", {

                cx:
                    CENTRO_X + ponto[0],

                cy:
                    CENTRO_Y + ponto[1],

                r: 10,

                fill: COR_FUNDO,

                stroke:
                    COR_PRINCIPAL,

                "stroke-width":
                    1.5

            })

        );

    });

}


/* ============================================================
   11. ESTRELA CENTRAL
   ============================================================ */


/*
   Estrela de oito pontas.
*/
function criarEstrelaCentral() {

    let pontos = [];

    const quantidade = 16;

    for (let i = 0; i < quantidade; i++) {

        const raio =
            i % 2 === 0
                ? 145
                : 65;

        const angulo =
            -Math.PI / 2 +
            i * Math.PI * 2 / quantidade;

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

            fill: "none",

            stroke:
                COR_PRINCIPAL,

            "stroke-width": 1.5

        })

    );

}


/* ============================================================
   12. EFEITO E NÍVEL
   ============================================================ */


/*
   Obtém:

   "Fortalecimento 3"

   como:

   nome = Fortalecimento
   nivel = 3
*/
function obterEfeito() {

    const valor =
        efeito.value.trim();

    const resultado =
        valor.match(
            /^(.*?)(?:\s+(\d+))?$/
        );

    if (!resultado) {

        return {

            nome: valor,

            nivel: 1

        };

    }

    return {

        nome:
            resultado[1],

        nivel:
            Number(resultado[2] || 1)

    };

}


/* ============================================================
   13. CONSTRUÇÃO DA PALAVRA MÁGICA
   ============================================================ */


/*
   Cria a frase que será transformada
   em símbolos.

   Exemplo:

   Fortalecimento 2
   Água
   Explosão

   vira:

   Fortalecimento Fortalecimento Água Explosão
*/
function construirTraducao() {

    const dados =
        obterEfeito();

    let palavras = [];


    /*
       Repete o efeito de acordo
       com seu nível.
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
       Adiciona elemento.
    */
    palavras.push(
        elemento.value
    );


    /*
       Adiciona forma.
    */
    palavras.push(
        forma.value
    );


    return palavras.join(" ");

}


/* ============================================================
   14. CRIAÇÃO DAS LETRAS
   ============================================================ */


/*
   Converte uma frase para:

   letras individuais.

   Exemplo:

   "Agua"

   vira:

   A G U A
*/
function obterLetras(texto) {

    return somenteLetras(texto)
        .split("");

}


/* ============================================================
   15. LETRAS DE FALLBACK
   ============================================================ */


/*
   Se a imagem da letra não existir,
   mostramos a letra normal.

   Isso evita que o círculo fique
   quebrado.
*/
function criarLetraFallback(
    letra,
    x,
    y,
    angulo
) {

    const texto =
        criarElemento("text", {

            x: x,

            y: y,

            fill:
                COR_PRINCIPAL,

            "font-size":
                17,

            "font-family":
                "serif",

            "font-weight":
                "bold",

            "text-anchor":
                "middle",

            "dominant-baseline":
                "middle",

            transform:
                `rotate(${angulo} ${x} ${y})`

        });

    texto.textContent =
        letra.toUpperCase();

    adicionar(texto);

}


/* ============================================================
   16. IMAGENS DAS LETRAS
   ============================================================ */


/*
   Cria uma imagem SVG para representar
   uma letra.
*/
function criarImagemLetra(
    letra,
    x,
    y,
    angulo,
    tamanho
) {

    const imagem =
        criarElemento("image", {

            x:
                x - tamanho / 2,

            y:
                y - tamanho / 2,

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

        });


    /*
       Caso a imagem não exista,
       troca automaticamente pela letra.
    */
    imagem.addEventListener(
        "error",
        function () {

            imagem.remove();

            criarLetraFallback(
                letra,
                x,
                y,
                angulo
            );

        }
    );


    adicionar(imagem);

}


/* ============================================================
   17. TEXTO CIRCULAR
   ============================================================ */


/*
   Coloca todas as letras de uma palavra
   ao redor de um círculo.

   O texto é distribuído uniformemente.
*/
function colocarTextoCircular(
    texto,
    raio = 325,
    tamanho = TAMANHO_LETRA,
    inicio = -90
) {

    const letrasTexto =
        obterLetras(texto);

    if (!letrasTexto.length)
        return;


    const quantidade =
        letrasTexto.length;


    letrasTexto.forEach(
        (letra, indice) => {

            let angulo;

            if (quantidade === 1) {

                angulo =
                    inicio;

            } else {

                angulo =
                    inicio +
                    indice *
                    (360 / quantidade);

            }


            const radianos =
                angulo *
                Math.PI / 180;


            const x =
                CENTRO_X +
                Math.cos(radianos) *
                raio;

            const y =
                CENTRO_Y +
                Math.sin(radianos) *
                raio;


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
   18. TEXTO EM ANEL
   ============================================================ */


/*
   Em vez de colocar tudo em um único círculo,
   podemos dividir as palavras em anéis.

   Isso deixa o símbolo mais parecido
   com um círculo mágico.
*/
function colocarPalavrasEmAnel(
    palavras
) {

    const raios = [

        330,
        300,
        270,
        240,
        210,
        180

    ];


    palavras.forEach(
        (palavra, indice) => {

            const raio =
                raios[
                    indice %
                    raios.length
                ];


            colocarTextoCircular(
                palavra,
                raio,
                22,
                -90
            );

        }
    );

}


/* ============================================================
   19. SEPARAÇÃO DA MAGIA
   ============================================================ */


/*
   Obtém as palavras que compõem a magia.
*/
function obterPalavrasMagia() {

    const dados =
        obterEfeito();

    let palavras = [];


    /*
       Efeito repetido.
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


    return palavras;

}


/* ============================================================
   20. CÍRCULO DAS PALAVRAS
   ============================================================ */


/*
   Cria anéis específicos para cada
   componente da magia.
*/
function criarEscritaMagica() {

    const palavras =
        obterPalavrasMagia();


    /*
       Primeiro anel:
       efeito.
    */
    const dados =
        obterEfeito();


    colocarTextoCircular(
        dados.nome,
        325,
        23,
        -90
    );


    /*
       Se o efeito for nível 2,
       3 ou 4, ele aparece novamente
       em outros anéis.
    */
    if (dados.nivel >= 2) {

        colocarTextoCircular(
            dados.nome,
            285,
            21,
            -90
        );

    }


    if (dados.nivel >= 3) {

        colocarTextoCircular(
            dados.nome,
            245,
            19,
            -90
        );

    }


    if (dados.nivel >= 4) {

        colocarTextoCircular(
            dados.nome,
            205,
            17,
            -90
        );

    }


    /*
       Elemento.
    */
    colocarTextoCircular(
        elemento.value,
        350,
        20,
        0
    );


    /*
       Forma.
    */
    colocarTextoCircular(
        forma.value,
        175,
        19,
        0
    );

}


/* ============================================================
   21. MARCAS DOS PONTOS CARDINAIS
   ============================================================ */


/*
   Pequenas marcas em quatro pontos.
*/
function criarPontosCardeais() {

    const pontos = [

        [400, 25],
        [775, 400],
        [400, 775],
        [25, 400]

    ];


    pontos.forEach(ponto => {

        adicionar(

            criarElemento("circle", {

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

            })

        );

    });

}


/* ============================================================
   22. CRUZ CENTRAL
   ============================================================ */


/*
   Pequena cruz no centro.
*/
function criarCruzCentral() {

    adicionar(

        criarElemento("line", {

            x1: 375,
            y1: 400,

            x2: 425,
            y2: 400,

            stroke:
                COR_SECUNDARIA,

            "stroke-width": 1

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

            "stroke-width": 1

        })

    );


    adicionar(

        criarElemento("circle", {

            cx: 400,
            cy: 400,

            r: 8,

            fill:
                COR_FUNDO,

            stroke:
                COR_PRINCIPAL,

            "stroke-width": 1.5

        })

    );

}


/* ============================================================
   23. NOME DA MAGIA
   ============================================================ */


/*
   Mostra o nome personalizado no centro.
*/
function criarNomeCentral() {

    const nome =
        nomeMagia.value.trim();


    if (!nome)
        return;


    /*
       Linha decorativa superior.
    */
    adicionar(

        criarElemento("line", {

            x1: 330,
            y1: 350,

            x2: 470,
            y2: 350,

            stroke:
                COR_SECUNDARIA,

            "stroke-width": 1

        })

    );


    /*
       Nome.
    */
    const texto =
        criarElemento("text", {

            x:
                CENTRO_X,

            y:
                355,

            fill:
                "#ffffff",

            "font-size":
                16,

            "font-family":
                "serif",

            "font-weight":
                "bold",

            "text-anchor":
                "middle"

        });


    texto.textContent =
        nome.toUpperCase();


    adicionar(texto);

}


/* ============================================================
   24. FUNDO DO SVG
   ============================================================ */


/*
   Fundo preto/azul.
*/
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
   25. BRILHO CENTRAL
   ============================================================ */


/*
   Cria um brilho sutil usando gradiente.
*/
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
                offset: "0%",
                "stop-color":
                    "#202a4d",
                "stop-opacity":
                    "0.8"
            }
        )

    );


    gradiente.appendChild(

        criarElemento(
            "stop",
            {
                offset: "70%",
                "stop-color":
                    "#0b1020",
                "stop-opacity":
                    "0.4"
            }
        )

    );


    gradiente.appendChild(

        criarElemento(
            "stop",
            {
                offset: "100%",
                "stop-color":
                    "#05070d",
                "stop-opacity":
                    "0"
            }
        )

    );


    defs.appendChild(gradiente);

    adicionar(defs);


    /*
       Aplicar brilho.
    */
    adicionar(

        criarElemento("circle", {

            cx:
                CENTRO_X,

            cy:
                CENTRO_Y,

            r:
                300,

            fill:
                "url(#brilhoCentral)"

        })

    );

}


/* ============================================================
   26. GERAÇÃO COMPLETA
   ============================================================ */


/*
   Esta é a função principal.

   Ela apaga o círculo anterior
   e cria tudo novamente.
*/
function gerarCirculo() {

    /*
       Limpa o SVG.
    */
    svg.innerHTML = "";


    /*
       Configuração.
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
       Gradiente.
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
        285,
        350
    );


    /*
       Geometria.
    */
    criarGeometria();


    /*
       Pontos.
    */
    criarPontosDecorativos();


    /*
       Losangos.
    */
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
       Escrita mágica.
    */
    criarEscritaMagica();


    /*
       Pontos cardeais.
    */
    criarPontosCardeais();


    /*
       Cruz central.
    */
    criarCruzCentral();


    /*
       Nome.
    */
    criarNomeCentral();


    /*
       Atualizar informações.
    */
    atualizarInformacoes();

}


/* ============================================================
   27. INFORMAÇÕES DA INTERFACE
   ============================================================ */


/*
   Atualiza o painel "Composição".
*/
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
   28. TAMANHO DO CÍRCULO
   ============================================================ */


/*
   Atualiza o tamanho visual.
*/
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
   29. EVENTOS
   ============================================================ */


/*
   Botão GERAR.
*/
if (botaoGerar) {

    botaoGerar.addEventListener(
        "click",
        gerarCirculo
    );

}


/*
   Mudança de efeito.
*/
if (efeito) {

    efeito.addEventListener(
        "change",
        gerarCirculo
    );

}


/*
   Mudança de elemento.
*/
if (elemento) {

    elemento.addEventListener(
        "change",
        gerarCirculo
    );

}


/*
   Mudança de forma.
*/
if (forma) {

    forma.addEventListener(
        "change",
        gerarCirculo
    );

}


/*
   Nome personalizado.
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
   30. DOWNLOAD SVG
   ============================================================ */


/*
   Cria uma cópia do SVG para download.
*/
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


    link.href = url;

    link.download =
        "circulo-magico.svg";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


/* ============================================================
   31. CONVERSÃO PARA PNG
   ============================================================ */


/*
   Esta função transforma o SVG em PNG.

   O PNG terá 1600 x 1600 pixels.
*/
function baixarPNG() {

    const svgData =
        new XMLSerializer()
        .serializeToString(svg);


    const blob =
        new Blob(
            [svgData],
            {
                type:
                    "image/svg+xml;charset=utf-8"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const imagem =
        new Image();


    imagem.onload = function () {

        const canvas =
            document.createElement(
                "canvas"
            );


        const tamanhoPNG = 1600;


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
           Criar arquivo.
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


    imagem.onerror = function () {

        URL.revokeObjectURL(url);

        alert(
            "Não foi possível transformar o círculo em PNG. " +
            "Você ainda pode baixar o SVG."
        );

    };


    imagem.src = url;

}


/* ============================================================
   32. BOTÃO DE DOWNLOAD
   ============================================================ */


/*
   O botão existente no HTML
   continua baixando PNG.
*/
if (botaoBaixar) {

    botaoBaixar.addEventListener(
        "click",
        baixarPNG
    );

}


/* ============================================================
   33. DUPLO CLIQUE NO BOTÃO DE DOWNLOAD
   ============================================================ */


/*
   Shift + clique no botão:
   baixa SVG.

   Isso é útil caso o navegador bloqueie
   o PNG por causa das imagens externas.
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
   34. TESTE DAS IMAGENS
   ============================================================ */


/*
   Verifica se uma letra existe.
*/
function testarLetra(letra) {

    return new Promise(
        resolver => {

            const imagem =
                new Image();


            imagem.onload =
                () => resolver(true);


            imagem.onerror =
                () => resolver(false);


            imagem.src =
                letras[letra];

        }
    );

}


/*
   Verifica todas as letras.

   Não impede o programa de funcionar.
*/
async function verificarAlfabeto() {

    const resultado = {};


    for (
        const letra of
        "abcdefghijklmnopqrstuvwxyz"
    ) {

        resultado[letra] =
            await testarLetra(letra);

    }


    return resultado;

}


/* ============================================================
   35. PREPARAÇÃO INICIAL
   ============================================================ */


/*
   Define tamanho inicial.
*/
atualizarTamanho();


/*
   Gera o círculo assim que a página carrega.
*/
gerarCirculo();


/* ============================================================
   FIM
   ============================================================ */
```
