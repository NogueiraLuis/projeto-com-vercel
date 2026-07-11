// Buscar os serviços da API quando a página carregar
async function carregarServicos() {
  try {
    const resposta = await fetch('/api/servicos');
    const servicos = await resposta.json();
    
    const container = document.getElementById('lista-servicos');
    container.innerHTML = servicos.map(s => `
      <div class="card-servico">
        <h3>${s.nome}</h3>
        <p class="preco">${s.preco}</p>
      </div>
    `).join('');
  } catch (erro) {
    document.getElementById('lista-servicos').innerText = "Erro ao carregar serviços.";
  }
}

// Enviar o formulário para a API de feedback
document.getElementById('form-feedback').addEventListener('submit', async (e) => {
  e.preventDefault();

  const dados = {
    cliente: document.getElementById('nome-cliente').value,
    nota: document.getElementById('nota-cliente').value,
    comentario: document.getElementById('texto-comentario').value
  };

  const resposta = await fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });

  const resultado = await resposta.json();
  alert(resultado.mensagem || resultado.erro);
});

// Executa ao abrir a página
carregarServicos();