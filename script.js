```javascript
/* ===== ALFABETO ===== */

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
"abcdefghijklmnopqrstuvwxyzç".split("").forEach(l =>
    letras[l] = `letras/${l}.png`
);


/* ===== ELEMENTOS ===== */

const svg = document.getElementById("circuloMagico");
const efeito = document.getElementById("efeito");
const elemento = document.getElementById("elemento");
const forma = document.getElementById("forma");
const nome = document.getElementById("nomeMagia");

const gerar = document.getElementById("gerar");
const baixar = document.getElementById("baixar");

const tamanho = document.getElementById("tamanho");
const tamanhoValor = document.getElementById("tamanhoValor");

const infoEfeito = document.getElementById("mostrarEfeito");
const infoElemento = document.getElementById("mostrarElemento");
const infoForma = document.getElementById("mostrarForma");
const infoTraducao = document.getElementById("mostrarTraducao");


/* ===== CONFIGURAÇÃO ===== */

const C = 400;


/* ===== CRIAR SVG ===== */

function el(tag, a = {}) {
    const e = document.createElementNS(
        "http://www.w3.org/2000/svg", tag
    );

    for (let k in a) e.setAttribute(k, a[k]);

    return e;
}


/* ===== TEXTO SEM ACENTOS ===== */

function normalizar(t) {
    return t.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}


/* ===== CÍRCULO ===== */

function circle(r, w = 1) {
    svg.appendChild(el("circle", {
        cx: C,
        cy: C,
        r: r,
        fill: "none",
        stroke: "#dce4ff",
        "stroke-width": w
    }));
}


/* ===== POLÍGONO ===== */

function polygon(n, r) {

    let p = [];

    for (let i = 0; i < n; i++) {

        let a = -Math.PI / 2 + i * Math.PI * 2 / n;

        p.push(
            `${C + Math.cos(a) * r},${C + Math.sin(a) * r}`
        );

    }

    svg.appendChild(el("polygon", {
        points: p.join(" "),
        fill: "none",
        stroke: "#dce4ff",
        "stroke-width": 1
    }));
}


/* ===== ÁRVORE DA VIDA ===== */

function arvore() {

    const p = [
        [0,-150],[-80,-80],[80,-80],
        [-90,0],[0,0],[90,0],
        [-80,80],[80,80],[0,150]
    ];

    const linhas = [
        [0,1],[0,2],[1,3],[1,4],
        [2,4],[2,5],[3,4],[4,5],
        [3,6],[4,6],[4,7],[5,7],
        [6,8],[7,8],[6,7]
    ];

    linhas.forEach(x => {

        svg.appendChild(el("line", {
            x1: C+p[x[0]][0],
            y1: C+p[x[0]][1],
            x2: C+p[x[1]][0],
            y2: C+p[x[1]][1],
            stroke: "#8997d2",
            "stroke-width": 1
        }));

    });

    p.forEach(x => {

        svg.appendChild(el("circle", {
            cx: C+x[0],
            cy: C+x[1],
            r: 9,
            fill: "#05070d",
            stroke: "#dce4ff",
            "stroke-width": 1.5
        }));

    });
}


/* ===== TEXTO NO CÍRCULO ===== */

function textoCircular(texto) {

    texto = normalizar(texto)
        .replace(/[^a-z]/g, "");

    if (!texto) return;

    texto.split("").forEach((l, i) => {

        let angulo = i * 360 / texto.length;

        let t = el("text", {
            x: C,
            y: 75,
            fill: "#eef2ff",
            "font-size": 17,
            "text-anchor": "middle",
            transform:
                `rotate(${angulo} ${C} ${C})`
        });

        t.textContent = l.toUpperCase();

        svg.appendChild(t);
    });
}


/* ===== CONSTRUIR MAGIA ===== */

function magia() {

    let m = efeito.value.match(
        /^(.*?)(?:\s+(\d+))?$/
    );

    let nomeEfeito = m[1];
    let nivel = Number(m[2] || 1);

    let partes = [];

    for (let i = 0; i < nivel; i++)
        partes.push(nomeEfeito);

    partes.push(elemento.value);
    partes.push(forma.value);

    return partes.join(" ");
}


/* ===== GERAR ===== */

function gerarCirculo() {

    svg.innerHTML = "";

    svg.setAttribute("viewBox","0 0 800 800");

    /* fundo */

    svg.appendChild(el("rect", {
        width: 800,
        height: 800,
        fill: "#05070d"
    }));

    /* círculos */

    circle(375,2);
    circle(350,1);
    circle(300,1);
    circle(240,1);
    circle(190,1);

    /* geometria */

    polygon(6,290);
    polygon(8,245);

    /* árvore */

    arvore();

    /* escrita */

    let texto = magia();

    textoCircular(texto);

    /* nome */

    if (nome.value.trim()) {

        let t = el("text", {
            x:C,
            y:C+5,
            fill:"#fff",
            "font-size":18,
            "text-anchor":"middle"
        });

        t.textContent =
            nome.value.toUpperCase();

        svg.appendChild(t);
    }

    /* informações */

    infoEfeito.textContent = efeito.value;
    infoElemento.textContent = elemento.value;
    infoForma.textContent = forma.value;
    infoTraducao.textContent = texto;
}


/* ===== TAMANHO ===== */

tamanho.addEventListener("input", () => {

    tamanhoValor.textContent =
        tamanho.value + " px";

    svg.style.width =
        tamanho.value + "px";
});


/* ===== EVENTOS ===== */

gerar.onclick = gerarCirculo;

efeito.onchange = gerarCirculo;
elemento.onchange = gerarCirculo;
forma.onchange = gerarCirculo;
nome.oninput = gerarCirculo;


/* ===== DOWNLOAD PNG ===== */

baixar.onclick = () => {

    const xml =
        new XMLSerializer()
        .serializeToString(svg);

    const blob = new Blob(
        [xml],
        {type:"image/svg+xml"}
    );

    const url =
        URL.createObjectURL(blob);

    const img = new Image();

    img.onload = () => {

        const canvas =
            document.createElement("canvas");

        canvas.width = 1600;
        canvas.height = 1600;

        const ctx =
            canvas.getContext("2d");

        ctx.fillStyle = "#05070d";

        ctx.fillRect(
            0,0,1600,1600
        );

        ctx.drawImage(
            img,
            0,0,
            1600,1600
        );

        const link =
            document.createElement("a");

        link.download =
            "circulo-magico.png";

        link.href =
            canvas.toDataURL("image/png");

        link.click();

        URL.revokeObjectURL(url);
    };

    img.src = url;
};


/* ===== INICIAR ===== */

gerarCirculo();
```
