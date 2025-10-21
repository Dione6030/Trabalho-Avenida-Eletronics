import { Link } from 'react-router-dom'
import '../App.css'

export default function Header() {
    return (
        <>
            <header className='bg-preto-vibrante flex items-center gap-4 p-4'>
                <Link to="/"><img src="/Logo Tecnológico.png" alt="Logo" className='w-40 h-auto' /></Link>
                <div>
                    <h1 className='font-titulo-vibrante-tec-1 text-white text-5xl'>Sua loja de eletrônicos de confiança</h1>
                </div>
                <div className='flex gap-4'>
                    <Link to="/login" className='bg-vermelho-vibrante text-ciano-destaque font-medium font-texto-vibrante-tec py-2 px-4 rounded-lg'>Login</Link>
                    <Link to="/cadastrar" className='bg-vermelho-vibrante text-ciano-destaque font-medium font-texto-vibrante-tec py-2 px-4 rounded-lg'>Cadastre-se</Link>
                </div>
            </header>
            <nav className='flex justify-end gap-8 px-9 py-4 bg-cinza-vibrante'>
                <Link to="/" className='bg-preto-vibrante text-vermelho-vibrante py-2 px-3 rounded-lg'>Home</Link>
                <Link to="/pesquisar" className='bg-preto-vibrante text-vermelho-vibrante py-2 px-3 rounded-lg'>Pesquisar</Link>
                <Link to="/adicionar" className='bg-preto-vibrante text-vermelho-vibrante py-2 px-3 rounded-lg'>Adicionar Produto</Link>
            </nav>
        </>
    )
}