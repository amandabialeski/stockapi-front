"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListarPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resPedidos, resClientes, resProdutos, resItens] = await Promise.all([
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/pedidos"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/clientes"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/produtos"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/itens_pedido"),
        ]);

        const dadosPedidos = await resPedidos.json();
        const dadosClientes = await resClientes.json();
        const dadosProdutos = await resProdutos.json();
        const dadosItens = await resItens.json();

        setPedidos(Array.isArray(dadosPedidos) ? dadosPedidos : []);
        setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
        setItens(Array.isArray(dadosItens) ? dadosItens : []);
      } catch (err) {
        setErro("Falha ao carregar dados da API.");
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  function obterNomeCliente(clienteId) {
    const cliente = clientes.find((c) => c.id === clienteId);
    return cliente ? cliente.nome : `Cliente #${clienteId}`;
  }

  function obterNomeProduto(produtoId) {
    const produto = produtos.find((p) => p.id === produtoId);
    return produto ? produto.nome : `Produto #${produtoId}`;
  }

  function itensDoPedido(pedidoId) {
    return itens.filter(
      (item) => item.pedido_numero === pedidoId || item.pedido_id === pedidoId
    );
  }

  function formatarData(dataStr) {
    if (!dataStr) return "-";
    const data = new Date(dataStr);
    return data.toLocaleString("pt-BR");
  }

  function alternarDetalhes(pedidoId) {
    if (pedidoSelecionado === pedidoId) {
      setPedidoSelecionado(null);
    } else {
      setPedidoSelecionado(pedidoId);
    }
  }

  return (
    <div>
      <div className="card">
        <div className="topo-pagina">
          <div>
            <h1 className="titulo-pagina">Listar Pedidos</h1>
            <p className="subtitulo-pagina">Visualização de pedidos e seus respectivos itens.</p>
          </div>
          <Link href="/pedidos/novo" className="botao botao-sucesso">
            + Novo Pedido
          </Link>
        </div>

        {erro && <div className="alerta alerta-erro">{erro}</div>}

        {carregando ? (
          <p className="texto-vazio">Carregando pedidos da API...</p>
        ) : pedidos.length === 0 ? (
          <p className="texto-vazio">Nenhum pedido encontrado.</p>
        ) : (
          <div className="tabela-responsiva">
            <table className="tabela">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Itens</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => {
                  const itensPedido = itensDoPedido(pedido.id);
                  const estaAberto = pedidoSelecionado === pedido.id;

                  return (
                    <tr key={pedido.id}>
                      <td data-label="ID">#{pedido.id}</td>
                      <td data-label="Cliente">{obterNomeCliente(pedido.cliente_id)}</td>
                      <td data-label="Data">{formatarData(pedido.data_pedido)}</td>
                      <td data-label="Status">
                        <span className={`badge badge-${pedido.status}`}>
                          {pedido.status}
                        </span>
                      </td>
                      <td data-label="Itens">
                        {itensPedido.length === 0 ? (
                          <span>Sem itens</span>
                        ) : (
                          <div>
                            <span>{itensPedido.length} produto(s)</span>
                            {estaAberto && (
                              <ul className="lista-itens">
                                {itensPedido.map((item) => (
                                  <li key={item.id}>
                                    {obterNomeProduto(item.produto_id)} - Qtd: {item.quantidade} (R$ {Number(item.preco_unitario).toFixed(2)})
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </td>
                      <td data-label="Ações">
                        {itensPedido.length > 0 ? (
                          <button
                            className="botao botao-secundario botao-pequeno"
                            onClick={() => alternarDetalhes(pedido.id)}
                          >
                            {estaAberto ? "Ocultar" : "Ver Itens"}
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
