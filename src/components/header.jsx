import { Link, useLocation } from 'react-router-dom'
import '../App.css'
import { useEffect, useState } from 'react'

export default function Header() {
    const location = useLocation();
    const redirectParam = encodeURIComponent(location.pathname + location.search);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        function load() {
            try {
                const raw = localStorage.getItem('usuarioLogado');
                if (raw) setUsuario(JSON.parse(raw));
                else setUsuario(null);
            } catch {
                setUsuario(null);
            }
        }

        load();
        function onStorage(e) {
            if (e.key === 'usuarioLogado') load();
        }
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    return (
        <>
            <header className='bg-preto-vibrante flex items-center gap-4 p-4'>
                <Link to="/"><img src="/Logo Tecnológico.png" alt="Logo" className='w-40 h-auto' /></Link>
                <div>
                    <h1 className='font-titulo-vibrante-tec-1 text-white text-5xl'>Sua loja de eletrônicos de confiança</h1>
                </div>
                <div className='flex gap-4 items-center'>
                    {usuario ? (
                        <Link to="/usuario" title={usuario.nome || 'Perfil'}>
                            <img src={usuario.imagem || '/Imagens de perfil1.png'} alt="Perfil" className='w-12 h-12 rounded-full object-cover border-2 border-white' />
                        </Link>
                    ) : (
                        <>
                            <Link to={`/login?redirect=${redirectParam}`} className='bg-vermelho-vibrante text-ciano-destaque font-medium font-texto-vibrante-tec py-2 px-4 rounded-lg'>Login</Link>
                            <Link to={`/cadastrar?redirect=${redirectParam}`} className='bg-vermelho-vibrante text-ciano-destaque font-medium font-texto-vibrante-tec py-2 px-4 rounded-lg'>Cadastre-se</Link>
                        </>
                    )}
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