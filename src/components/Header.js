"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [aberto, setAberto] = useState(false);

  function alternarMenu() {
    setAberto(!aberto);
  }

  function fecharMenu() {
    setAberto(false);
  }

  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        <Link href="/" className="logo" onClick={fecharMenu}>
          Controle de Estoque
        </Link>

        <button className="botao-menu" onClick={alternarMenu}>
          {aberto ? "✕ Fechar" : "☰ Menu"}
        </button>

        <nav className={`navegacao ${aberto ? "aberto" : ""}`}>
          <Link href="/" className="link-nav" onClick={fecharMenu}>
            Início
          </Link>
          <Link href="/pedidos" className="link-nav" onClick={fecharMenu}>
            Pedidos
          </Link>
          <Link href="/pedidos/novo" className="link-nav" onClick={fecharMenu}>
            Criar Pedido
          </Link>
          <Link href="/produtos" className="link-nav" onClick={fecharMenu}>
            Produtos
          </Link>
          <Link href="/clientes" className="link-nav" onClick={fecharMenu}>
            Clientes
          </Link>
          <Link href="/categorias" className="link-nav" onClick={fecharMenu}>
            Categorias
          </Link>
        </nav>
      </div>
    </header>
  );
}
