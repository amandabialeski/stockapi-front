import "./globals.css";
import Header from "../components/Header";

export const metadata = {
  title: "Controle de Estoque - Amanda",
  description: "Aplicação web responsiva para controle de estoque",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main className="container">{children}</main>
        <footer className="rodape">
          Aplicação de Controle de Estoque - Dupla: Amanda e JC
        </footer>
      </body>
    </html>
  );
}
