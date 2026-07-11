export default function handler(req, res) {
  // Garantir que só aceitamos requisições do tipo GET
  if (req.method !== "GET") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const listagem = [
    { id: 1, nome: "Corte de Cabelo Clássico", preco: "R$ 45,00" },
    { id: 2, nome: "Barba Completa com Toalha Quente", preco: "R$ 35,00" },
    { id: 3, nome: "Combo Premium (Cabelo + Barba)", preco: "R$ 70,00" },
  ];

  // A Vercel cuida do envio dos cabeçalhos de resposta automaticamente
  return res.status(200).json(listagem);
}
