import { Link } from 'react-router'
import '../App.css'

export default function Header() {
    return (
        <>
            <header>
                <Link to="/"><img src="./Logo Tecnológico.jpeg" alt="Logo" /></Link>
                <div>
                    <h1>Avenida Eletrônicos</h1>
                    <h2>Sua loja de eletrônicos de confiança</h2>
                </div>
            </header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Pesquisar">Pesquisar</Link>
                <Link to="/Adicionar">Adicionar Produto</Link>
            </nav>
        </>
    )
}