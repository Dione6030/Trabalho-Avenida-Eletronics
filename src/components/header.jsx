import { Link } from 'react-router-dom'
import '../App.css'

export default function Header() {
    return (
        <>
            <header className='bg-preto-vibrante flex items-center gap-4 p-4'>
                <Link to="/"><img src="/Logo Tecnológico.png" alt="Logo" className='w-3xs h-auto' /></Link>
                <div>
                    <h1>Avenida Eletrônicos</h1>
                    <h2>Sua loja de eletrônicos de confiança</h2>
                </div>
            </header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/pesquisar">Pesquisar</Link>
                <Link to="/adicionar">Adicionar Produto</Link>
            </nav>
        </>
    )
}