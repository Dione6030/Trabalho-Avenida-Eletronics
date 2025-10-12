
import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/card'
import Header from './components/header'

function App() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await fetch("")
        if (!resposta.ok) throw new Error("Erro ao buscar produtos");
        const dados = await resposta.json();
        setProdutos(dados.reverse());
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
    buscarProdutos();
  }, []);

  const listaProdutos = produtos.map( produto => (
    <Card key={produto.id} produto={produto} />
  ))
  return (
    <>
      <Header />

      <main className='bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8'>
        <h2 className='text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante'>Lista de Produtos</h2>
        <div className='bg-preto-vibrante flex flex-wrap items-center w-[58rem] justify-around gap-y-6 py-8 rounded-lg'>
          {listaProdutos}
        </div>
      </main>
    </>
  )
}

export default App
