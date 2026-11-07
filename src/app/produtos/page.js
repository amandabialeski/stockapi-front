"use client";

import { useEffect, useState } from "react";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resProdutos, resCategorias] = await Promise.all([
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/produtos"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/categorias"),
        ]);

        const dadosProdutos = await resProdutos.json();
        const dadosCategorias = await resCategorias.json();

        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
        setCategorias(Array.isArray(dadosCategorias) ? dadosCategorias : []);
      } catch (err) {
        setErro("Erro ao carregar produtos da API.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  function obterNomeCategoria(categoriaId) {
    const categoria = categorias.find((c) => c.id === categoriaId);
    return categoria ? categoria.nome : "-";
  }

  return (
    <div>
      <div className="card">
        <h1 className="titulo-pagina">Produtos</h1>
        <p className="subtitulo-pagina">Lista de produtos cadastrados no sistema.</p>

        {erro && <div className="alerta alerta-erro">{erro}</div>}

        {carregando ? (
          <p className="texto-vazio">Carregando produtos...</p>
        ) : produtos.length === 0 ? (
          <p className="texto-vazio">Nenhum produto cadastrado.</p>
        ) : (
          <div className="tabela-responsiva">
            <table className="tabela">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Categoria</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => (
                  <tr key={produto.id}>
                    <td data-label="ID">#{produto.id}</td>
                    <td data-label="Nome"><strong>{produto.nome}</strong></td>
                    <td data-label="Descrição">{produto.descricao || "-"}</td>
                    <td data-label="Categoria">{obterNomeCategoria(produto.categoria_id)}</td>
                    <td data-label="Preço" className="preco">R$ {Number(produto.preco).toFixed(2)}</td>
                    <td data-label="Estoque">{produto.quantidade_estoque} un</td>
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
