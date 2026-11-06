import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="card">
        <h1 className="titulo-pagina">Controle de Estoque</h1>
        <p className="subtitulo-pagina">
          Aplicação web para gerenciamento e controle de estoque de loja.
        </p>

        <div className="alerta alerta-info">
          <strong>Integrantes da Dupla:</strong> Amanda e JC
        </div>
      </div>

      <div className="grid-cards">
        <Link href="/pedidos" className="card-item">
          <h3>Listar Pedidos</h3>
          <p>Visualizar todos os pedidos e seus itens cadastrados.</p>
        </Link>

        <Link href="/pedidos/novo" className="card-item">
          <h3>Criar Pedido</h3>
          <p>Cadastrar um novo pedido com cliente e produtos.</p>
        </Link>

        <Link href="/produtos" className="card-item">
          <h3>Produtos</h3>
          <p>Consultar produtos cadastrados no sistema.</p>
        </Link>

        <Link href="/clientes" className="card-item">
          <h3>Clientes</h3>
          <p>Consultar lista de clientes cadastrados.</p>
        </Link>

        <Link href="/categorias" className="card-item">
          <h3>Categorias</h3>
          <p>Consultar categorias de produtos da loja.</p>
        </Link>
      </div>
    </div>
  );
}
