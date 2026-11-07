"use client";

import { useEffect, useState } from "react";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const resposta = await fetch("https://stock.dev.vilhena.ifro.edu.br/api/categorias");
        const dados = await resposta.json();
        setCategorias(Array.isArray(dados) ? dados : []);
      } catch (err) {
        setErro("Erro ao carregar categorias da API.");
      } finally {
        setCarregando(false);
      }
    }

    carregarCategorias();
  }, []);

  return (
    <div>
      <div className="card">
        <h1 className="titulo-pagina">Categorias</h1>
        <p className="subtitulo-pagina">Lista de categorias de produtos da loja.</p>

        {erro && <div className="alerta alerta-erro">{erro}</div>}

        {carregando ? (
          <p className="texto-vazio">Carregando categorias...</p>
        ) : categorias.length === 0 ? (
          <p className="texto-vazio">Nenhuma categoria cadastrada.</p>
        ) : (
          <div className="tabela-responsiva">
            <table className="tabela">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome da Categoria</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id}>
                    <td>#{categoria.id}</td>
                    <td><strong>{categoria.nome}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
