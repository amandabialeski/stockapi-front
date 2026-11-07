import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="card banner">
        <h1>Controle de Estoque</h1>
        <p>Aplicação web para gerenciamento do estoque de uma loja.</p>
      </div>

      <div className="card">
        <h2 className="titulo-secao">Integrantes da Dupla</h2>
        <div className="grid-cards">
          <div className="integrante">Amanda Bialeski</div>
          <div className="integrante">Gustavo Blachtekak</div>
        </div>
      </div>

      <h2 className="titulo-secao">Acesso Rápido</h2>
      <div className="grid-cards">
        <Link href="/categorias" className="card-item">
          <h3>Categorias</h3>
          <p>Consultar categorias de produtos da loja.</p>
        </Link>

        <Link href="/produtos" className="card-item">
          <h3>Produtos</h3>
          <p>Consultar produtos cadastrados no sistema.</p>
        </Link>

        <Link href="/clientes" className="card-item">
          <h3>Clientes</h3>
          <p>Consultar lista de clientes cadastrados.</p>
        </Link>

        <Link href="/pedidos" className="card-item">
          <h3>Listar Pedidos</h3>
          <p>Visualizar todos os pedidos e seus itens.</p>
        </Link>

        <Link href="/pedidos/novo" className="card-item">
          <h3>Criar Pedido</h3>
          <p>Cadastrar um novo pedido com cliente e produtos.</p>
        </Link>
      </div>
    </div>
  );
}
