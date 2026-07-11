import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const { cliente, nota, comentario } = request.body;

    // Validação básica
    if (!cliente || !nota) {
      return response.status(400).json({ erro: 'Nome e nota são obrigatórios!' });
    }

    // 1. Cria a tabela de feedbacks se não existir
    await sql`
      CREATE TABLE IF NOT EXISTS feedbacks (
        id SERIAL PRIMARY KEY,
        cliente VARCHAR(255) NOT NULL,
        nota INT NOT NULL,
        comentario TEXT,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Insere o feedback enviado pelo formulário de forma segura
    await sql`
      INSERT INTO feedbacks (cliente, nota, comentario)
      VALUES (${cliente}, ${nota}, ${comentario});
    `;

    return response.status(201).json({
      sucesso: true,
      mensagem: `Obrigado pelo feedback, ${cliente}! Gravado no banco de dados real.`
    });
  } catch (error) {
    return response.status(500).json({ erro: error.message });
  }
}