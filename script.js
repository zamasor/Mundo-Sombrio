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

    // Função auxiliar para criar elementos SVG
    function elementoSVG(tag, atributos = {}) {
        const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
        for (const chave in atributos) {
            el.setAttribute(chave, atributos[chave]);
        }
        return el;
    }

    // Função para criar texto
    function texto(conteudo, x, y, tamanho = 20) {
        const el = elementoSVG("text", {
            x: x,
            y: y,
            fill: "#ffffff",
            "font-size": tamanho,
            "font-family": "Georgia, Times New Roman, serif",
            "text-anchor": "middle",
            "dominant-baseline": "middle"
        });
        el.textContent = conteudo;
        return el;
    }

    // Função para criar círculo
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

    // Função principal que gera o círculo mágico
    function gerarCirculo() {
        // Limpa o SVG
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
        svg.appendChild(circulo(400, 400, 365, 3));
        svg.appendChild(circulo(400, 400, 350, 1));
        svg.appendChild(circulo(400, 400, 280, 2));
        svg.appendChild(circulo(400, 400, 210, 1));
        svg.appendChild(circulo(400, 400, 100, 2));

        // LINHAS RADIAIS
        for (let i = 0; i < 16; i++) {
            const angulo = (i / 16) * Math.PI * 2;
            const x1 = 400 + Math.cos(angulo) * 100;
            const y1 = 400 + Math.sin(angulo) * 100;
            const x2 = 400 + Math.cos(angulo) * 350;
            const y2 = 400 + Math.sin(angulo) * 350;

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

        // ESTRELA DE 5 PONTAS
        const pontos = [];
        for (let i = 0; i < 10; i++) {
            const raio = i % 2 === 0 ? 100 : 42;
            const angulo = -Math.PI / 2 + (i * Math.PI) / 5;
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

        // NOME DA MAGIA (centro)
        const nome = nomeMagia.value.trim();
        if (nome !== "") {
            svg.appendChild(texto(nome, 400, 400, 22));
        }

        // ===== TRATAMENTO DO EFEITO (corrigido) =====
        const efeitoSelecionado = efeito.value.trim();
        let efeitoNome = "";
        let nivel = 1;

        if (efeitoSelecionado !== "") {
            const partes = efeitoSelecionado.match(/^(.*?)(?:\s+(\d+))?$/);
            if (partes) {
                efeitoNome = partes[1].trim();
                nivel = partes[2] ? parseInt(partes[2], 10) : 1;
            } else {
                efeitoNome = efeitoSelecionado;
            }
        }

        // Limita o nível para não sair da tela (máximo 6)
        nivel = Math.min(Math.max(nivel, 1), 6);

        // Escreve o efeito no topo (repetido conforme o nível)
        if (efeitoNome !== "") {
            for (let i = 0; i < nivel; i++) {
                svg.appendChild(
                    texto(efeitoNome, 400, 55 + i * 22, 14)
                );
            }
        }

        // ELEMENTO
        const valorElemento = elemento.value.trim();
        if (valorElemento !== "") {
            svg.appendChild(texto(valorElemento, 400, 740, 16));
        }

        // FORMA
        const valorForma = forma.value.trim();
        if (valorForma !== "") {
            svg.appendChild(texto(valorForma, 400, 770, 14));
        }

        // ===== ATUALIZA AS INFORMAÇÕES NA PÁGINA =====
        mostrarEfeito.textContent = efeitoSelecionado || "—";
        mostrarElemento.textContent = valorElemento || "—";
        mostrarForma.textContent = valorForma || "—";

        const transcricao = [efeitoNome, valorElemento, valorForma]
            .filter(Boolean)
            .join(" ");
        mostrarTraducao.textContent = transcricao || "—";
    }

    // Evento do botão Gerar
    gerar.addEventListener("click", gerarCirculo);

    // Gera automaticamente ao carregar a página
    gerarCirculo();

    // ===== DOWNLOAD PNG (melhorado) =====
    baixar.addEventListener("click", () => {
        try {
            const serializer = new XMLSerializer();
            const svgString = serializer.serializeToString(svg);

            const blob = new Blob([svgString], {
                type: "image/svg+xml;charset=utf-8"
            });
            const url = URL.createObjectURL(blob);

            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = 1600;
                canvas.height = 1600;
                const ctx = canvas.getContext("2d");

                // Fundo preto para garantir qualidade
                ctx.fillStyle = "#05070d";
                ctx.fillRect(0, 0, 1600, 1600);

                ctx.drawImage(img, 0, 0, 1600, 1600);
                URL.revokeObjectURL(url);

                canvas.toBlob(
                    (png) => {
                        if (!png) {
                            alert("Não foi possível gerar o PNG.");
                            return;
                        }
                        const link = document.createElement("a");
                        link.download = "circulo-magico.png";
                        link.href = URL.createObjectURL(png);
                        link.click();
                        // Libera a memória depois de um tempo
                        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
                    },
                    "image/png"
                );
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                alert("Não foi possível gerar o PNG. Tente novamente.");
            };

            img.src = url;
        } catch (erro) {
            console.error(erro);
            alert("Ocorreu um erro ao tentar baixar a imagem.");
        }
    });
});