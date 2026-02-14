const uploadBtn = document.querySelector('#upload-btn');
const inputUpload = document.querySelector('#image-upload');

uploadBtn.addEventListener('click', () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({
                url: leitor.result, 
                nome: arquivo.name
            });
        };

        leitor.onerror = () => {
            const motivoReal = leitor.error;
            reject(`Erro no arquivo ${arquivo.name}: ${motivoReal}`);
        };

        leitor.readAsDataURL(arquivo);
    });
};

const imagemPrincipal = document.querySelector('.main-imagem');
const nomeDaImagem = document.querySelector('.container-imagem-nome p')

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];
    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error(erro);
        }
    }
});

const inputTags = document.querySelector('#input-tags')
const listaTags = document.querySelector('.lista-tags')

listaTags.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('remove-tag')) {
        const tagParaRemover = evento.target.parentElement;
        tagParaRemover.remove();
    }
});

const tagsDisponiveis = ["Front-end", "Back-End", "Full Stack", "Mobile", "HTML", "CSS", "JavaScript", "Python", "SQL", "React"];

async function verificaTagsDisponiveis(tagTexto) {
    const tagsEmMinusculo = tagsDisponiveis.map(tag => tag.toLowerCase());

    return tagsEmMinusculo.includes(tagTexto.toLowerCase());
};

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();

        if (tagTexto === "") {return};

        try {
            const tagExiste = await verificaTagsDisponiveis(tagTexto);

            const listaElementos = Array.from(listaTags.querySelectorAll('p'));
            const tagsJaCriadas = listaElementos.map(p => p.textContent.toLowerCase());
            const jaAdicionada = tagsJaCriadas.includes(tagTexto.toLowerCase());

            if (tagExiste && !jaAdicionada){
                const tagNova = document.createElement('li');
                tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`;
                listaTags.appendChild(tagNova);
                inputTags.value = "";
            } else if (jaAdicionada) {
                alert('Tag já adicionada.')
            } else {
                alert('Tag não encontrada nas opções disponíveis')
            }

        } catch (erro) {
            console.error(`Erro: ${erro}`)
        }
    }
});

const botaoPublicar = document.querySelector('.botao-publicar');

async function publicarProjeto(nomeDoProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5; //Vale ressaltar que é apenas uma simulação de envio de dados para uma api

            if (deuCerto) {
                resolve('Dados enviados comn sucesso!')
            } else {
                reject('Ocorreu um erro no envio dos dados;')
            }
        }, 1000)
    })
};

async function validarFormulario(nome, descricao, tags) {
    if (!nome || !descricao) {
        throw new Error('Por favor, preencha todos os campos obrigatórios (nome e descrição).');
    }
    if (tags.length === 0) {
        throw new Error('Adicione pelo menos uma tag ao projeto.');
    }
}

botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const nomeProjeto = document.querySelector('#nome').value;
    const descricaoProjeto = document.querySelector('#descricao').value;

    const elementosAdicionados = Array.from(listaTags.querySelectorAll('p'));
    const tagsProjeto = elementosAdicionados.map(tag => tag.textContent.toLowerCase());

    try {
        await validarFormulario(nomeProjeto, descricaoProjeto, tagsProjeto)

        const resultado = await publicarProjeto(nomeProjeto, descricaoProjeto, tagsProjeto);

        console.log(resultado);
        alert('Deu certo! Para mais detalhes, verifique o console.');
    } catch (error) {
        console.error(`Erro: ${error}`);
        alert(error);
    }
});

const botaoDescartar = document.querySelector('.botao-descartar')

botaoDescartar.addEventListener('click', (evento) => {
    evento.preventDefault();

    const form = document.querySelector('form');
    form.reset();

    imagemPrincipal.src = "./img/imagem1.png";
    nomeDaImagem.textContent = "image.projeto.png";

    listaTags.innerHTML = "";
})

const containerNomeImagem = document.querySelector('.container-imagem-nome')

containerNomeImagem.addEventListener('click', (evento) => {
    if (evento.target.classList.contains('remove-imagem')) {
        imagemPrincipal.src = "./img/imagem1.png";
        nomeDaImagem.textContent = "image.projeto.png";
    }
})