
import './App.css'
import Card from './components/card'
import Header from './components/header'

function App() {
  

  return (
    <>
      <Header />
      <main className='bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8'>
        <h2 className='text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante'>Lista de Produtos</h2>
        <div className='bg-preto-vibrante flex flex-wrap items-center justify-around gap-4 py-8 rounded-lg'>
          {<Card />}
          {<Card />}
          {<Card />}
          {<Card />}
          {<Card />}
          {<Card />}
        </div>
      </main>
    </>
  )
}

export default App
