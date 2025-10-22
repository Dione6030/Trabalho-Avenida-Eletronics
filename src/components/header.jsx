import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../App.css'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
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

    async function salvarAlteracoes(payload) {
        if (!usuario) return;
        const id = usuario.id;
        const body = {
            id,
            nome: payload.nome,
            email: payload.email,
            senha: payload.senha,
            confirmarSenha: payload.confirmarSenha,
            imagem: payload.imagem && payload.imagem.trim() !== '' ? payload.imagem : '/Imagens de perfil1.png',
        };

        try {
            const resp = await fetch(`http://localhost:3000/usuarios/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (resp.ok) {
                const atualizado = await resp.json();
                localStorage.setItem('usuarioLogado', JSON.stringify(atualizado));
                setUsuario(atualizado);
                await Swal.fire({ icon: 'success', title: 'Perfil atualizado!', timer: 1400, showConfirmButton: false });
                return;
            }
        } catch {/* segue para fallback local */}

        // Fallback local
        const salvo = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
        const atualizado = { ...salvo, ...body };
        localStorage.setItem('usuarioLogado', JSON.stringify(atualizado));
        setUsuario(atualizado);
        await Swal.fire({ icon: 'info', title: 'Alterações salvas localmente', timer: 1600, showConfirmButton: false });
    }

    function sair() {
        localStorage.removeItem('usuarioLogado');
        setUsuario(null);
        navigate('/login');
    }

    async function abrirPerfilModal() {
        if (!usuario) return;
        const result = await Swal.fire({
            title: '<strong>Meu Perfil</strong>',
            html: `
                <div class="flex flex-col gap-3 text-left">
                  <label class="block text-sm mb-1">Nome</label>
                  <input id="swal-input-nome" class="swal2-input" placeholder="Seu nome" value="${usuario.nome || ''}">
                  <label class="block text-sm mb-1">Email</label>
                  <input id="swal-input-email" class="swal2-input" type="email" placeholder="email@exemplo.com" value="${usuario.email || ''}">
                  <label class="block text-sm mb-1">Senha</label>
                  <input id="swal-input-senha" class="swal2-input" type="password" placeholder="••••••" value="${usuario.senha || ''}">
                  <label class="block text-sm mb-1">Confirmar senha</label>
                  <input id="swal-input-confirmar" class="swal2-input" type="password" placeholder="••••••" value="${usuario.confirmarSenha || ''}">
                  <label class="block text-sm mb-1">URL da imagem (opcional)</label>
                  <input id="swal-input-imagem" class="swal2-input" placeholder="/Imagens de perfil1.png" value="${usuario.imagem || '/Imagens de perfil1.png'}">
                </div>
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-save"></i> Salvar',
            confirmButtonAriaLabel: 'Salvar alterações do perfil',
            cancelButtonText: '<i class="fa fa-sign-out"></i> Sair',
            cancelButtonAriaLabel: 'Sair da conta',
            preConfirm: () => {
                const nome = document.getElementById('swal-input-nome')?.value || '';
                const email = document.getElementById('swal-input-email')?.value || '';
                const senha = document.getElementById('swal-input-senha')?.value || '';
                const confirmarSenha = document.getElementById('swal-input-confirmar')?.value || '';
                const imagem = document.getElementById('swal-input-imagem')?.value || '';
                if (senha !== confirmarSenha) {
                    Swal.showValidationMessage('As senhas não coincidem.');
                    return false;
                }
                return { nome, email, senha, confirmarSenha, imagem };
            }
        });

        if (result.isConfirmed && result.value) {
            await salvarAlteracoes(result.value);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Cancel = Sair da conta
            const confirma = await Swal.fire({
                icon: 'warning',
                title: 'Deseja sair da conta?',
                showCancelButton: true,
                confirmButtonText: 'Sim, sair',
                cancelButtonText: 'Cancelar',
            });
            if (confirma.isConfirmed) sair();
        }
    }

    return (
        <>
            <header className='bg-preto-vibrante flex justify-between items-center gap-4 px-6 py-4'>
                <div className='flex items-center'>
                    <Link to="/"><img src="/Logo Tecnológico.png" alt="Logo" className='w-40 h-auto' /></Link>
                    <h1 className='font-titulo-vibrante-tec-1 text-white text-5xl'>Sua loja de eletrônicos de confiança</h1>
                </div>
                <div className='flex gap-4 items-center'>
                    {usuario ? (
                        <button type="button" onClick={abrirPerfilModal} title={usuario.nome || 'Perfil'} className='rounded-full cursor-pointer'>
                            <img src={usuario.imagem || '/Imagens de perfil1.png'} alt="Perfil" className='w-20 h-w-20 rounded-full object-cover border-2 border-white' />
                        </button>
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