export default function handler(req, res) {
  // Garantir que só aceitamos requisições do tipo GET
  if (req.method !== "GET") {
    return res.status(405).json({ erro: "Método não permitido" });
  }

  const listagem = [
    { id: 1, nome: "Corte de Cabelo Clássico", preco: "R$ 45,00" },
    { id: 2, nome: "Barba Completa com Toalha Quente", preco: "R$ 35,00" },
    { id: 3, nome: "Combo Premium (Cabelo + Barba)", preco: "R$ 70,00" },
    { id: 4, nome: "Tratamento Capilar Profundo", preco: "R$ 60,00" },
    { id: 5, nome: "Hidratação Profunda", preco: "R$ 50,00" },
    { id: 6, nome: "Coloração e Tonalização", preco: "R$ 80,00" },
    { id: 7, nome: "Design de Sobrancelhas", preco: "R$ 25,00" },
    { id: 8, nome: "Depilação Facial", preco: "R$ 30,00" },
    { id: 9, nome: "Massagem Relaxante", preco: "R$ 90,00" },
    { id: 10, nome: "Pacote de Noivado (Cabelo + Barba + Massagem)", preco: "R$ 150,00" },
  ];

  // A Vercel cuida do envio dos cabeçalhos de resposta automaticamente
  return res.status(200).json(listagem);
}
