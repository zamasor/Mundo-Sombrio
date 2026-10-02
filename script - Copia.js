```javascript
document.addEventListener("DOMContentLoaded", () => {

    const svg = document.getElementById("circuloMagico");

    const efeito = document.getElementById("efeito");
    const elemento = document.getElementById("elemento");
    const forma = document.getElementById("forma");

    const nomeMagia = document.getElementById("nomeMagia");

    const gerar = document.getElementById("gerar");
    const baixar = document.getElementById("baixar");

    const mostrarEfeito = document.getElementById("mostrarEfeito");
    const mostrarElemento = document.getElementById("mostrarElemento");
    const mostrarForma = document.getElementById("mostrarForma");
    const mostrarTraducao = document.getElementById("mostrarTraducao");


    function elementoSVG(tag, atributos = {}) {

        const el = document.createElementNS(
            "http://www.w3.org/2000/svg",
            tag
        );

        for (const chave in atributos) {
            el.setAttribute(chave, atributos[chave]);
        }

        return el;
    }


    function texto(texto, x, y, tamanho = 20) {

        const el = elementoSVG("text", {

            x: x,
            y: y,

            fill: "#ffffff",

            "font-size": tamanho,

            "font-family":
                "Georgia, Times New Roman, serif",

            "text-anchor":
                "middle",

            "dominant-baseline":
                "middle"

        });

        el.textContent = texto;

        return el;
    }


    function circulo(cx, cy, r, largura = 2) {

        return elementoSVG("circle", {

            cx: cx,
            cy: cy,
            r: r,

            fill: "none",

            stroke: "#ffffff",

            "stroke-width": largura

        });

    }


    function gerarCirculo() {

        svg.innerHTML = "";


        // FUNDO

        svg.appendChild(
            elementoSVG("rect", {

                width: 800,
                height: 800,

                fill: "#05070d"

            })
        );


        // CÍRCULOS PRINCIPAIS

        svg.appendChild(
            circulo(400, 400, 365, 3)
        );

        svg.appendChild(
            circulo(400, 400, 350, 1)
        );

        svg.appendChild(
            circulo(400, 400, 280, 2)
        );

        svg.appendChild(
            circulo(400, 400, 210, 1)
        );

        svg.appendChild(
            circulo(400, 400, 100, 2)
        );


        // LINHAS RADIAIS

        for (let i = 0; i < 16; i++) {

            const angulo =
                (i / 16) * Math.PI * 2;

            const x1 =
                400 + Math.cos(angulo) * 100;

            const y1 =
                400 + Math.sin(angulo) * 100;

            const x2 =
                400 + Math.cos(angulo) * 350;

            const y2 =
                400 + Math.sin(angulo) * 350;


            svg.appendChild(
                elementoSVG("line", {

                    x1,
                    y1,
                    x2,
                    y2,

                    stroke: "#ffffff",

                    "stroke-width": 1

                })
            );

        }


        // ESTRELA

        const pontos = [];

        for (let i = 0; i < 10; i++) {

            const raio =
                i % 2 === 0
                    ? 100
                    : 42;

            const angulo =
                -Math.PI / 2 +
                i * Math.PI / 5;

            pontos.push(
                `${400 + Math.cos(angulo) * raio},${400 + Math.sin(angulo) * raio}`
            );

        }


        svg.appendChild(
            elementoSVG("polygon", {

                points: pontos.join(" "),

                fill: "none",

                stroke: "#ffffff",

                "stroke-width": 2

            })
        );


        // NOME DA MAGIA

        const nome =
            nomeMagia.value.trim();

        if (nome !== "") {

            svg.appendChild(
                texto(
                    nome,
                    400,
                    400,
                    24
                )
            );

        }


        // TEXTO DO EFEITO

        const efeitoSelecionado =
            efeito.value;

        const partes =
            efeitoSelecionado.match(
                /^(.*?)(?:\s+(\d+))?$/
            );

        const efeitoNome =
            partes[1];

        const nivel =
            partes[2]
                ? parseInt(partes[2])
                : 1;


        // Efeito repetido conforme o nível

        for (let i = 0; i < nivel; i++) {

            svg.appendChild(
                texto(
                    efeitoNome,
                    400,
                    60 + i * 25,
                    15
                )
            );

        }


        // ELEMENTO

        svg.appendChild(
            texto(
                elemento.value,
                400,
                740,
                16
            )
        );


        // FORMA

        svg.appendChild(
            texto(
                forma.value,
                400,
                770,
                14
            )
        );


        // INFORMAÇÕES

        mostrarEfeito.textContent =
            efeito.value;

        mostrarElemento.textContent =
            elemento.value;

        mostrarForma.textContent =
            forma.value;


        const transcricao =
            `${efeitoNome} ${elemento.value} ${forma.value}`;

        mostrarTraducao.textContent =
            transcricao;

    }


    // GERAR

    gerar.addEventListener(
        "click",
        gerarCirculo
    );


    // Gera automaticamente

    gerarCirculo();


    // DOWNLOAD PNG

    baixar.addEventListener(
        "click",
        () => {

            const serializer =
                new XMLSerializer();

            const svgString =
                serializer.serializeToString(svg);


            const blob =
                new Blob(
                    [svgString],
                    {
                        type:
                            "image/svg+xml;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const img =
                new Image();


            img.onload = () => {

                const canvas =
                    document.createElement("canvas");

                canvas.width = 1600;
                canvas.height = 1600;


                const ctx =
                    canvas.getContext("2d");


                ctx.drawImage(
                    img,
                    0,
                    0,
                    1600,
                    1600
                );


                URL.revokeObjectURL(url);


                canvas.toBlob(
                    (png) => {

                        const link =
                            document.createElement("a");

                        link.download =
                            "circulo-magico.png";

                        link.href =
                            URL.createObjectURL(png);

                        link.click();

                    },
                    "image/png"
                );

            };


            img.onerror = () => {

                alert(
                    "Não foi possível gerar o PNG."
                );

            };


            img.src = url;

        }
    );

});
```
