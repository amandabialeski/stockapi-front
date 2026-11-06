"use client";

import { useEffect, useState } from "react";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregarClientes() {
      try {
        const resposta = await fetch("https://stock.dev.vilhena.ifro.edu.br/api/clientes");
        const dados = await resposta.json();
        setClientes(Array.isArray(dados) ? dados : []);
      } catch (err) {
        setErro("Erro ao carregar clientes da API.");
      } finally {
        setCarregando(false);
      }
    }

    carregarClientes();
  }, []);

  return (
    <div>
      <div className="card">
        <h1 className="titulo-pagina">Clientes</h1>
        <p className="subtitulo-pagina">Lista de clientes cadastrados no sistema.</p>

        {erro && <div className="alerta alerta-erro">{erro}</div>}

        {carregando ? (
          <p>Carregando clientes...</p>
        ) : clientes.length === 0 ? (
          <p>Nenhum cliente cadastrado.</p>
        ) : (
          <div className="tabela-responsiva">
            <table className="tabela">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente) => (
                  <tr key={cliente.id}>
                    <td>#{cliente.id}</td>
                    <td><strong>{cliente.nome}</strong></td>
                    <td>{cliente.email}</td>
                    <td>{cliente.telefone || "-"}</td>
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
