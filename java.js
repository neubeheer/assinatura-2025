// Cria o elemento HTML
const html = document.createElement('html');
html.setAttribute('lang', 'pt-BR');

// Cria o elemento head
const head = document.createElement('head');
const metaCharset = document.createElement('meta');
metaCharset.setAttribute('charset', 'UTF-8');
const metaViewport = document.createElement('meta');
metaViewport.setAttribute('name', 'viewport');
metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');

// Adiciona os meta tags ao head
head.appendChild(metaCharset);
head.appendChild(metaViewport);

// Cria o elemento style
const style = document.createElement('style');
style.textContent = `
    /* Estilos para a folha A4 */
    @page {
        size: A4;
        margin: 0;
    }
    body {
        width: 190mm; /* Largura de uma folha A4 */
        height: 297mm; /* Altura de uma folha A4 */
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
        box-sizing: border-box;
        background-color: white; /* Fundo branco para o PDF */
    }

    /* Estilos para a tabela */
    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 8pt; /* Tamanho da fonte da tabela */
        margin-bottom: 15px; /* Espaçamento abaixo da tabela */
    }
    th, td {
        border: 1px solid #000;
        padding: 6px; /* Reduzido de 8px para economizar espaço */
        text-align: center;
    }

    /* Estilos para as letras */
    .text-large {
        font-size: 14pt; /* Tamanho da fonte maior */
    }
    .text-medium {
        font-size: 12pt; /* Tamanho da fonte médio */
    }
    .text-small {
        font-size: 8pt; /* Tamanho da fonte pequeno */
    }

    /* Estilos para os modais (pop-ups) */
    .modal {
        display: none; /* Escondido por padrão */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro */
        justify-content: center;
        align-items: center;
    }
    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        position: relative; /* Permite posicionar a linha guia */
        width: 90%; /* Largura do modal em dispositivos móveis */
        max-width: 400px; /* Largura máxima do modal */
    }
    canvas {
        border: 1px solid #000;
        margin-top: 20px;
        width: 100%; /* Canvas responsivo */
        height: auto; /* Altura automática */
    }
    .signature-button {
        background-color: white; /* Cor de fundo branca */
        border: 0px solid #000; /* Contorno preto */
        color: #000; /* Cor do texto preto */
        padding: 5px 10px; /* Ajuste o padding conforme necessário */
        cursor: pointer; /* Mantém o cursor como pointer */
        margin-top: 10px;
        padding: 10px 20px;
        font-size: 16px;
    }

    /* Estilo para o ícone do lápis dentro do botão */
    .signature-button .pencil-icon {
        color: #000; /* Cor do ícone preto */
    }

    /* Estilo para o container das assinaturas e data */
    .signature-container {
        display: flex; /* Usa Flexbox para alinhar os itens */
        justify-content: space-between; /* Espaço entre os itens */
        align-items: flex-end; /* Alinha os itens na parte inferior */
        margin-top: 20px; /* Espaçamento acima do container */
        flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */
    }

    /* Estilo para cada bloco de assinatura */
    .signature-block {
        display: flex;
        flex-direction: column; /* Alinha os itens verticalmente */
        align-items: flex-start; /* Alinha os itens à esquerda */
        margin-bottom: 10px; /* Espaçamento entre os blocos */
    }

    /* Estilo para a linha de assinatura */
    .signature-line {
        display: inline-block;
        width: 150px;
        border-bottom: 1px solid #000;
        margin-top: 5px; /* Espaço entre o texto e a linha */
        position: relative; /* Permite posicionar a assinatura sobre a linha */
    }

    /* Estilo para o ícone do lápis */
    .pencil-icon {
        font-size: 20px;
        line-height: 1;
        margin-right: 5px;
    }

    /* Estilo para a imagem da assinatura */
    .signature-image {
        position: absolute;
        bottom: -10px; /* Ajusta a posição vertical da assinatura */
        left: 25px; /* Ajusta a posição horizontal da assinatura */
        width: 120px; /* Largura da assinatura */
        height: auto; /* Mantém a proporção da imagem */
    }

    /* Estilo para a data */
    .date-container {
        font-size: 12pt;
        margin: 0 20px; /* Espaço entre a data e as assinaturas */
    }

    /* Estilo para a linha guia no modal */
    .guide-line {
        position: absolute;
        top: 50%; /* Posiciona a linha no meio do modal */
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #ccc; /* Cor da linha guia */
        z-index: 1; /* Garante que a linha fique acima do canvas */
    }

    /* Responsividade para dispositivos móveis */
    @media (max-width: 768px) {
        body {
            padding: 10px;
        }
        .modal-content {
            width: 80%; /* Ocupa 80% da tela em dispositivos móveis */
        }
        .signature-container {
            flex-direction: column; /* Alinha os itens verticalmente */
            align-items: center; /* Centraliza os itens */
        }
        .signature-block {
            align-items: center; /* Centraliza os itens */
        }
        .date-container {
            margin: 10px 0; /* Ajusta o espaçamento */
        }
    }

    /* Estilo para o botão SALVAR */
    .save-button {
        background-color: #4CAF50; /* Cor de fundo verde */
        color: white; /* Cor do texto branco */
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 20px auto; /* Centraliza o botão */
        border-radius: 5px; /* Bordas arredondadas */
    }
    .save-button .floppy-icon {
        font-size: 18px; /* Tamanho do ícone */
    }

    /* Estilo para o botão SALVAR (DRIVER) */
    .save-driver-button {
        background-color: #2196F3; /* Cor de fundo azul */
        color: white; /* Cor do texto branco */
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 20px auto; /* Centraliza o botão */
        border-radius: 5px; /* Bordas arredondadas */
    }
    .save-driver-button .floppy-icon {
        font-size: 18px; /* Tamanho do ícone */
    }

    /* Estilo para o botão ASSINADO */
    .signed-button {
        background-color: #FFC107; /* Cor de fundo amarela */
        color: black; /* Cor do texto preto */
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 20px auto; /* Centraliza o botão */
        border-radius: 5px; /* Bordas arredondadas */
    }
    .signed-button .check-icon {
        font-size: 18px; /* Tamanho do ícone */
    }

    /* Estilo para o botão Exportar HTML */
    .export-button {
        background-color: #007bff; /* Cor de fundo azul */
        color: white; /* Cor do texto branco */
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 20px auto; /* Centraliza o botão */
        border-radius: 5px; /* Bordas arredondadas */
    }
    .export-button .download-icon {
        font-size: 18px; /* Tamanho do ícone */
    }
`;

// Adiciona o estilo ao head
head.appendChild(style);

// Cria o elemento body
const body = document.createElement('body');

// Cria o conteúdo principal
const mainDiv = document.createElement('div');
const h1 = document.createElement('h1');
h1.textContent = 'FEEDBACK - OMINI/TALK';
h1.style.textAlign = 'center';

// Cria a tabela
const table = document.createElement('table');
table.classList.add('text-small');
const thead = document.createElement('thead');
const trHead = document.createElement('tr');
trHead.classList.add('text-small');
const headers = ['CÓDIGO DO COLABORADOR', 'TME', 'TMA', 'TMIA', 'TAXA DE TRANS', 'AB/PROD', 'PENDÊNCIAS', 'O.S/LOG', 'PERÍODO', 'SEMANA'];

headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    trHead.appendChild(th);
});

thead.appendChild(trHead);
table.appendChild(thead);

const tbody = document.createElement('tbody');
table.appendChild(tbody);

mainDiv.appendChild(h1);
mainDiv.appendChild(table);

// Adiciona o conteúdo principal ao body
body.appendChild(mainDiv);

// Adiciona o head e o body ao html
html.appendChild(head);
html.appendChild(body);

// Adiciona o html ao documento
document.documentElement.replaceWith(html);

// Restante do código JavaScript (modais, assinaturas, etc.)
const supervisorModal = document.createElement('div');
supervisorModal.id = 'supervisor-signature-modal';
supervisorModal.classList.add('modal');

const supervisorModalContent = document.createElement('div');
supervisorModalContent.classList.add('modal-content');

const supervisorModalTitle = document.createElement('h2');
supervisorModalTitle.textContent = 'Assinatura do Supervisor';

const supervisorGuideLine = document.createElement('div');
supervisorGuideLine.classList.add('guide-line');

const supervisorCanvas = document.createElement('canvas');
supervisorCanvas.id = 'supervisor-signature-pad';
supervisorCanvas.width = 400;
supervisorCanvas.height = 200;

const supervisorClearButton = document.createElement('button');
supervisorClearButton.id = 'clear-supervisor-signature';
supervisorClearButton.textContent = 'Limpar';

const supervisorSaveButton = document.createElement('button');
supervisorSaveButton.id = 'save-supervisor-signature';
supervisorSaveButton.textContent = 'Assinar';

const supervisorCloseButton = document.createElement('button');
supervisorCloseButton.id = 'close-supervisor-signature-modal';
supervisorCloseButton.textContent = 'Fechar';

supervisorModalContent.appendChild(supervisorModalTitle);
supervisorModalContent.appendChild(supervisorGuideLine);
supervisorModalContent.appendChild(supervisorCanvas);
supervisorModalContent.appendChild(supervisorClearButton);
supervisorModalContent.appendChild(supervisorSaveButton);
supervisorModalContent.appendChild(supervisorCloseButton);

supervisorModal.appendChild(supervisorModalContent);

// Adiciona o modal ao body
body.appendChild(supervisorModal);

// Adiciona os event listeners para o modal do supervisor
const openSupervisorModalButton = document.createElement('button');
openSupervisorModalButton.id = 'open-signature-modal-supervisor';
openSupervisorModalButton.classList.add('signature-button');

const pencilIconSupervisor = document.createElement('span');
pencilIconSupervisor.classList.add('pencil-icon');
pencilIconSupervisor.textContent = '✏️';

const supervisorSignatureLine = document.createElement('span');
supervisorSignatureLine.id = 'supervisor-signature-line';
supervisorSignatureLine.classList.add('signature-line');

openSupervisorModalButton.appendChild(pencilIconSupervisor);
openSupervisorModalButton.appendChild(supervisorSignatureLine);

openSupervisorModalButton.addEventListener('click', () => {
    supervisorModal.style.display = 'flex';
});

supervisorClearButton.addEventListener('click', () => {
    supervisorSignaturePad.clear();
    drawGuideLine(supervisorCanvas);
});

supervisorSaveButton.addEventListener('click', () => {
    if (supervisorSignaturePad.isEmpty()) {
        alert('Por favor, forneça uma assinatura.');
    } else {
        const dataURL = supervisorSignaturePad.toDataURL();
        const signatureImage = document.createElement('img');
        signatureImage.src = dataURL;
        signatureImage.classList.add('signature-image');
        supervisorSignatureLine.innerHTML = '';
        supervisorSignatureLine.appendChild(signatureImage);
        supervisorModal.style.display = 'none';
    }
});

supervisorCloseButton.addEventListener('click', () => {
    supervisorModal.style.display = 'none';
});

// Adiciona o botão de abrir o modal do supervisor ao body
body.appendChild(openSupervisorModalButton);

// Repete o processo para o modal do colaborador
const colaboradorModal = document.createElement('div');
colaboradorModal.id = 'colaborador-signature-modal';
colaboradorModal.classList.add('modal');

const colaboradorModalContent = document.createElement('div');
colaboradorModalContent.classList.add('modal-content');

const colaboradorModalTitle = document.createElement('h2');
colaboradorModalTitle.textContent = 'Assinatura do Colaborador(a)';

const colaboradorGuideLine = document.createElement('div');
colaboradorGuideLine.classList.add('guide-line');

const colaboradorCanvas = document.createElement('canvas');
colaboradorCanvas.id = 'colaborador-signature-pad';
colaboradorCanvas.width = 400;
colaboradorCanvas.height = 200;

const colaboradorClearButton = document.createElement('button');
colaboradorClearButton.id = 'clear-colaborador-signature';
colaboradorClearButton.textContent = 'Limpar';

const colaboradorSaveButton = document.createElement('button');
colaboradorSaveButton.id = 'save-colaborador-signature';
colaboradorSaveButton.textContent = 'Assinar';

const colaboradorCloseButton = document.createElement('button');
colaboradorCloseButton.id = 'close-colaborador-signature-modal';
colaboradorCloseButton.textContent = 'Fechar';

colaboradorModalContent.appendChild(colaboradorModalTitle);
colaboradorModalContent.appendChild(colaboradorGuideLine);
colaboradorModalContent.appendChild(colaboradorCanvas);
colaboradorModalContent.appendChild(colaboradorClearButton);
colaboradorModalContent.appendChild(colaboradorSaveButton);
colaboradorModalContent.appendChild(colaboradorCloseButton);

colaboradorModal.appendChild(colaboradorModalContent);

// Adiciona o modal ao body
body.appendChild(colaboradorModal);

// Adiciona os event listeners para o modal do colaborador
const openColaboradorModalButton = document.createElement('button');
openColaboradorModalButton.id = 'open-signature-modal-colaborador';
openColaboradorModalButton.classList.add('signature-button');

const pencilIconColaborador = document.createElement('span');
pencilIconColaborador.classList.add('pencil-icon');
pencilIconColaborador.textContent = '✏️';

const colaboradorSignatureLine = document.createElement('span');
colaboradorSignatureLine.id = 'colaborador-signature-line';
colaboradorSignatureLine.classList.add('signature-line');

openColaboradorModalButton.appendChild(pencilIconColaborador);
openColaboradorModalButton.appendChild(colaboradorSignatureLine);

openColaboradorModalButton.addEventListener('click', () => {
    colaboradorModal.style.display = 'flex';
});

colaboradorClearButton.addEventListener('click', () => {
    colaboradorSignaturePad.clear();
    drawGuideLine(colaboradorCanvas);
});

colaboradorSaveButton.addEventListener('click', () => {
    if (colaboradorSignaturePad.isEmpty()) {
        alert('Por favor, forneça uma assinatura.');
    } else {
        const dataURL = colaboradorSignaturePad.toDataURL();
        const signatureImage = document.createElement('img');
        signatureImage.src = dataURL;
        signatureImage.classList.add('signature-image');
        colaboradorSignatureLine.innerHTML = '';
        colaboradorSignatureLine.appendChild(signatureImage);
        colaboradorModal.style.display = 'none';
    }
});

colaboradorCloseButton.addEventListener('click', () => {
    colaboradorModal.style.display = 'none';
});

// Adiciona o botão de abrir o modal do colaborador ao body
body.appendChild(openColaboradorModalButton);

// Função para desenhar a linha guia no canvas
function drawGuideLine(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
}

// Inicializa os Signature Pads
const supervisorSignaturePad = new SignaturePad(supervisorCanvas);
const colaboradorSignaturePad = new SignaturePad(colaboradorCanvas);

// Desenha as linhas guia
drawGuideLine(supervisorCanvas);
drawGuideLine(colaboradorCanvas);

// Função para formatar a data no formato DD/MM/AAAA
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Função para exibir a data atual
function displayCurrentDate() {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    document.getElementById('current-date').textContent = formattedDate;
}

// Função para carregar os dados da planilha
async function loadSheetData() {
    const spreadsheetId = '1mlWkSU2NgBKhs1IVi50A6ecSADbnjPeikKKGplCFaoQ';
    const range = 'FORMATAÇÃO!A2:J2';
    const apiKey = 'AIzaSyDiCYaVwgq3gmuQWhZIICEJoN5iTwbo-AY';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.values) {
            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = '';

            data.values.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');
                row.forEach((cell, cellIndex) => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        } else {
            console.error('Nenhum dado encontrado na planilha.');
        }
    } catch (error) {
        console.error('Erro ao carregar os dados da planilha:', error);
    }
}

// Carrega os dados e exibe a data ao carregar a página
window.onload = function () {
    displayCurrentDate();
    loadSheetData();
};

// Função para converter a página em PDF e fazer o download
document.getElementById('save-button').addEventListener('click', () => {
    const element = document.body;
    const options = {
        margin: [10, 10],
        filename: 'feedback.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).save();
});

// Função para salvar o PDF no GitHub e atualizar a célula K2
document.getElementById('save-driver-button').addEventListener('click', async () => {
    const element = document.body;
    const options = {
        margin: [10, 10],
        filename: 'feedback_driver.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const pdfBlob = await html2pdf().from(element).set(options).output('blob');

    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];

        await uploadToGitHub(base64Data);

        await updateSheetCell('OK');
    };
});

// Função para atualizar a célula K2 com um valor específico
async function updateSheetCell(value) {
    const spreadsheetId = '1mlWkSU2NgBKhs1IVi50A6ecSADbnjPeikKKGplCFaoQ';
    const range = 'FORMATAÇÃO!A2';
    const apiKey = 'AIzaSyDiCYaVwgq3gmuQWhZIICEJoN5iTwbo-AY';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                range: range,
                values: [[value]],
            }),
        });

        if (response.ok) {
            console.log(`Célula K2 atualizada com sucesso: ${value}`);
        } else {
            const errorData = await response.json();
            console.error('Erro ao atualizar a célula:', errorData);
        }
    } catch (error) {
        console.error('Erro ao atualizar a célula:', error);
    }
}

// Função para enviar o PDF para o GitHub
async function uploadToGitHub(base64Data) {
    const repoOwner = 'neubeheer';
    const repoName = 'assinatura-digital';
    const filePath = 'feedback_driver.pdf';
    const commitMessage = 'Adiciona feedback do driver';
    const token = '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';

    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: commitMessage,
            content: base64Data,
            branch: 'main',
        }),
    });

    if (response.ok) {
        alert('Arquivo salvo com sucesso no GitHub!');
    } else {
        const errorData = await response.json();
        console.error('Erro ao salvar o arquivo:', errorData);
        alert('Erro ao salvar o arquivo no GitHub.');
    }
}

// Função para exportar o HTML
document.getElementById('export-html-button').addEventListener('click', () => {
    const htmlContent = document.documentElement.outerHTML;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pagina_exportada.html';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Função para enviar o conteúdo por e-mail
document.getElementById('send-email-button').addEventListener('click', () => {
    const htmlContent = document.documentElement.outerHTML;
    const encodedHtmlContent = encodeURIComponent(htmlContent);
    const recipient = 'jefferson.mk.torres@gmail.com';
    const subject = 'Assinatura 2025';
    const body = `Segue o conteúdo HTML em anexo:\n\n${encodedHtmlContent}`;
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
});

// Função para marcar como "Assinado"
document.getElementById('signed-button').addEventListener('click', async () => {
    await updateSheetCell('Assinado');
    alert('Célula K2 marcada como "Assinado" com sucesso!');
});
