export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Use o método POST' });
  }

  // A Vercel já faz o parse do corpo da requisição automaticamente (req.body)
  const { cliente, nota, comentario } = req.body;

  if (!cliente || !nota) {
    return res.status(400).json({ erro: 'Nome e nota são obrigatórios!' });
  }

  // Aqui você conectaria a um banco de dados real no futuro.
  // Por enquanto, vamos simular que salvou com sucesso.
  return res.status(201).json({
    sucesso: true,
    mensagem: `Obrigado pelo feedback, ${cliente}! Registro recebido.`
  });
}