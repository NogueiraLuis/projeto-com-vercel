import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    // 1. Cria a tabela de serviços se ela ainda não existir
    await sql`
      CREATE TABLE IF NOT EXISTS servicos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        preco VARCHAR(100) NOT NULL
      );
    `;

    // 2. Procura os serviços no banco
    let { rows: listaServicos } = await sql`SELECT * FROM servicos ORDER BY id ASC;`;
    
    // 3. Se o banco estiver totalmente vazio, insere os dados iniciais automaticamente
    if (listaServicos.length === 0) {
      await sql`
        INSERT INTO servicos (nome, preco) VALUES 
        ('Corte de Cabelo Clássico', 'R$ 45,00'),
        ('Barba Completa com Toalha Quente', 'R$ 35,00'),
        ('Combo Premium (Cabelo + Barba)', 'R$ 70,00');
      `;
      // Procura novamente após inserir os dados iniciais
      const resultado = await sql`SELECT * FROM servicos ORDER BY id ASC;`;
      listaServicos = resultado.rows;
    }

    // 4. Devolve os dados reais do banco
    return response.status(200).json(listaServicos);
  } catch (error) {
    return response.status(500).json({ erro: error.message });
  }
}