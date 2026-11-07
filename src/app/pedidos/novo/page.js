"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CriarPedido() {
  const router = useRouter();

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteId, setClienteId] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  useEffect(() => {
    async function carregarOpcoes() {
      try {
        const [resClientes, resProdutos] = await Promise.all([
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/clientes"),
          fetch("https://stock.dev.vilhena.ifro.edu.br/api/produtos"),
        ]);

        const dadosClientes = await resClientes.json();
        const dadosProdutos = await resProdutos.json();

        setClientes(Array.isArray(dadosClientes) ? dadosClientes : []);
        setProdutos(Array.isArray(dadosProdutos) ? dadosProdutos : []);
      } catch (err) {
        setErro("Erro ao carregar clientes ou produtos.");
      } finally {
        setCarregando(false);
      }
    }

    carregarOpcoes();
  }, []);

  function adicionarItem(e) {
    e.preventDefault();
    setErro("");

    if (!produtoId) {
      setErro("Selecione um produto.");
      return;
    }

    if (Number(quantidade) <= 0) {
      setErro("A quantidade deve ser maior que zero.");
      return;
    }

    const produtoEncontrado = produtos.find((p) => String(p.id) === String(produtoId));
    if (!produtoEncontrado) {
      setErro("Produto não encontrado.");
      return;
    }

    const novoItem = {
      produto_id: produtoEncontrado.id,
      nome: produtoEncontrado.nome,
      preco: Number(produtoEncontrado.preco),
      quantidade: Number(quantidade),
      subtotal: Number(produtoEncontrado.preco) * Number(quantidade),
    };

    setItens([...itens, novoItem]);
    setProdutoId("");
    setQuantidade(1);
  }

  function removerItem(indexRemover) {
    setItens(itens.filter((_, index) => index !== indexRemover));
  }

  async function salvarPedido(e) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!clienteId) {
      setErro("Selecione um cliente para o pedido.");
      return;
    }

    if (itens.length === 0) {
      setErro("Adicione pelo menos um produto ao pedido.");
      return;
    }

    setSalvando(true);

    try {
      const resPedido = await fetch("https://stock.dev.vilhena.ifro.edu.br/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_id: Number(clienteId),
          status: "pendente",
        }),
      });

      if (!resPedido.ok) {
        throw new Error("Erro ao criar pedido na API.");
      }

      const pedidoCriado = await resPedido.json();
      const pedidoIdCriado = pedidoCriado.id;

      for (const item of itens) {
        const resItem = await fetch("https://stock.dev.vilhena.ifro.edu.br/api/itens_pedido", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pedido_id: Number(pedidoIdCriado),
            produto_id: Number(item.produto_id),
            quantidade: Number(item.quantidade),
            preco_unitario: Number(item.preco),
          }),
        });

        if (!resItem.ok) {
          throw new Error("Erro ao salvar um dos itens do pedido.");
        }
      }

      setSucesso("Pedido criado com sucesso!");
      setTimeout(() => {
        router.push("/pedidos");
      }, 1500);
    } catch (err) {
      setErro(err.message || "Ocorreu um erro ao salvar o pedido.");
    } finally {
      setSalvando(false);
    }
  }

  const totalPedido = itens.reduce((soma, item) => soma + item.subtotal, 0);

  if (carregando) {
    return (
      <div className="card">
        <p className="texto-vazio">Carregando dados para criação do pedido...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h1 className="titulo-pagina">Criar Pedido</h1>
        <p className="subtitulo-pagina">Selecione o cliente e adicione os produtos desejados.</p>

        {erro && <div className="alerta alerta-erro">{erro}</div>}
        {sucesso && <div className="alerta alerta-sucesso">{sucesso}</div>}

        <div className="grupo-campo">
          <label className="rotulo">Cliente *</label>
          <select
            className="campo"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="">Selecione um cliente...</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                #{cliente.id} - {cliente.nome} ({cliente.email})
              </option>
            ))}
          </select>
        </div>

        <div className="caixa">
          <h2 className="titulo-secao">Adicionar Produto ao Pedido</h2>

          <div className="linha-formulario">
            <div className="grupo-campo">
              <label className="rotulo">Produto</label>
              <select
                className="campo"
                value={produtoId}
                onChange={(e) => setProdutoId(e.target.value)}
              >
                <option value="">Selecione um produto...</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome} - R$ {Number(produto.preco).toFixed(2)} (Estoque: {produto.quantidade_estoque})
                  </option>
                ))}
              </select>
            </div>

            <div className="grupo-campo">
              <label className="rotulo">Quantidade</label>
              <input
                type="number"
                min="1"
                className="campo"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
              />
            </div>

            <button type="button" className="botao" onClick={adicionarItem}>
              + Adicionar Item
            </button>
          </div>
        </div>

        <h2 className="titulo-secao">Itens do Pedido ({itens.length})</h2>

        {itens.length === 0 ? (
          <p className="texto-vazio">Nenhum produto adicionado ainda.</p>
        ) : (
          <div>
            <div className="tabela-responsiva">
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço Unitário</th>
                    <th>Quantidade</th>
                    <th>Subtotal</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nome}</td>
                      <td>R$ {item.preco.toFixed(2)}</td>
                      <td>{item.quantidade}</td>
                      <td>R$ {item.subtotal.toFixed(2)}</td>
                      <td>
                        <button
                          type="button"
                          className="botao botao-perigo botao-pequeno"
                          onClick={() => removerItem(index)}
                        >
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="total">Total: R$ {totalPedido.toFixed(2)}</p>
          </div>
        )}

        <div className="acoes">
          <button
            type="button"
            className="botao botao-sucesso"
            disabled={salvando}
            onClick={salvarPedido}
          >
            {salvando ? "Salvando Pedido..." : "Finalizar e Salvar Pedido"}
          </button>
          <Link href="/pedidos" className="botao botao-secundario">
            Cancelar
          </Link>
        </div>
      </div>
    </div>
  );
}
