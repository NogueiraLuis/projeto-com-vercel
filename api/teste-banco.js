import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  try {
    // Faz uma pergunta simples para o banco: "Que horas são aí?"
    const resultado = await sql`SELECT NOW();`;

    return res.status(200).json({
      sucesso: true,
      mensagem: "Conexão estabelecida com sucesso! O banco respondeu.",
      horario_do_banco: resultado.rows[0].now,
    });
  } catch (error) {
    // Se der qualquer erro de senha ou conexão, ele vai te avisar aqui
    return response.status(500).json({
      sucesso: false,
      erro: error.message,
    });
  }
}
