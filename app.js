// Ícone (SVG) usado nos cards de serviço
const iconeServico = `
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="6" cy="6" r="3"></circle>
    <circle cx="6" cy="18" r="3"></circle>
    <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
    <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
    <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
  </svg>`;

// Buscar os serviços da API quando a página carregar
async function carregarServicos() {
  const container = document.getElementById("lista-servicos");
  try {
    const resposta = await fetch("/api/servicos");
    const servicos = await resposta.json();

    container.innerHTML = servicos
      .map(
        (s) => `
      <article class="card-servico">
        <span class="card-icon" aria-hidden="true">${iconeServico}</span>
        <h3>${s.nome}</h3>
        <p class="preco">${s.preco}</p>
      </article>
    `
      )
      .join("");
  } catch (erro) {
    container.innerHTML =
      '<div class="estado-carregando">Erro ao carregar serviços. Tente novamente mais tarde.</div>';
  }
}

// Enviar o formulário para a API de feedback
document
  .getElementById("form-feedback")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.getElementById("form-status");
    const botao = e.target.querySelector('button[type="submit"]');

    const dados = {
      cliente: document.getElementById("nome-cliente").value.trim(),
      nota: document.getElementById("nota-cliente").value,
      comentario: document.getElementById("texto-comentario").value.trim(),
    };

    if (!dados.cliente) {
      status.textContent = "Por favor, informe seu nome.";
      status.className = "form-status erro";
      return;
    }

    botao.disabled = true;
    const textoOriginal = botao.textContent;
    botao.textContent = "Enviando...";
    status.textContent = "";
    status.className = "form-status";

    try {
      const resposta = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        status.textContent = resultado.mensagem || "Avaliação enviada!";
        status.className = "form-status sucesso";
        e.target.reset();
      } else {
        status.textContent = resultado.erro || "Não foi possível enviar.";
        status.className = "form-status erro";
      }
    } catch (erro) {
      status.textContent = "Erro de conexão. Tente novamente.";
      status.className = "form-status erro";
    } finally {
      botao.disabled = false;
      botao.textContent = textoOriginal;
    }
  });

// Ano dinâmico no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Executa ao abrir a página
carregarServicos();
