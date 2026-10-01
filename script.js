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


