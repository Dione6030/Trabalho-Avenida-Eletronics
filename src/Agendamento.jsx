import { useEffect, useState } from "react";
import Header from "./components/header";
import { useForm } from "react-hook-form";
import Card from "./components/card";
import { Link, useLocation, useParams } from "react-router-dom";


function Agendar() {
    const { id } = useParams();
    const location = useLocation();
    const redirectParam = encodeURIComponent(location.pathname + location.search);
    const { register, handleSubmit, reset, setFocus } = useForm();
    const [Produto, setProduto] = useState(null);
    const [logado, setLogado] = useState(false);

    async function ConcluirAgendamento(data) {
        const produtoId = parseInt(id);
        const regiao = data.regiao;
        const estado = data.estado;
        const cidade = data.cidade;
        const endereco = data.endereco;
        const complemento = data.complemento;

            let usuarioNome = 'Cliente';
            let usuarioId = null;
        try {
            const raw = localStorage.getItem('usuarioLogado');
            const u = raw ? JSON.parse(raw) : null;
                if (u?.id) usuarioId = Number(u.id);
                if (u?.nome) usuarioNome = u.nome;
        } catch {/* mantém 'Cliente' se houver erro ao ler o storage*/}

        try {
            const resposta = await fetch("http://localhost:3000/agendamentos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    produtoId, usuarioId, usuarioNome, regiao, estado, cidade, endereco, complemento
                })
            })
            if (!resposta.ok) throw new Error("Erro ao concluir agendamento");
            const novoAgendamento = await resposta.json();
            alert(`Agendamento concluído com sucesso, muito obrigado pela confiança, ${novoAgendamento.nome}!`);
        } catch (error) {
            console.log("Error: ", error.message);
        }
        reset();
        setFocus("regiao");
    }

    useEffect(() => {
        function loadUser() {
            try {
                const raw = localStorage.getItem('usuarioLogado');
                setLogado(!!raw);
            } catch {
                setLogado(false);
            }
        }
        loadUser();
        function onStorage(e) {
            if (e.key === 'usuarioLogado') {
                loadUser();
            }
        }
        window.addEventListener('storage', onStorage);

        async function fetchProduto() {
            try {
                const resposta = await fetch(`http://localhost:3000/produtos/${id}`);
                if (!resposta.ok) throw new Error("Erro ao buscar produto");
                const produtoData = await resposta.json();
                setProduto(produtoData);
            } catch (error) {
                console.log("Error: ", error.message);
            }
            setFocus("regiao");
        }
        fetchProduto();
            return () => window.removeEventListener('storage', onStorage);
    }, [ id, setFocus]);

    return (
        <>
        <Header />

        <main className="bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8">
            <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Agendamento para o {Produto?.nome}</h2>
            <section className="bg-preto-vibrante flex flex-col items-center w-[58rem] justify-around gap-y-6 py-8 rounded-lg">
                {Produto && <Card produto={Produto} />}
                {logado ? (
                <form className="bg-preto-vibrante flex flex-col items-start p-6 rounded-lg" onSubmit={handleSubmit(ConcluirAgendamento)} >
                    <div className="flex justify-around gap-8">
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="regiao" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Região</label>
                            <input type="text" id="regiao" required
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("regiao")}/>
                        </p>
                    </div>
                    <div className="flex justify-around gap-6">
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="estado" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Estado em que mora</label>
                            <input type="text" id="estado" required
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("estado")}/>
                        </p>
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="cidade" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Cidade em que mora</label>
                            <input type="text" id="cidade" required
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("cidade")}/>
                        </p>
                    </div>
                    <div className="flex justify-around gap-8">
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="endereco" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Endereço Completo</label>
                            <input type="text" id="endereco" required
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("endereco")}/>
                        </p>
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="complemento" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Complemento</label>
                            <input type="text" id="complemento" required
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("complemento")}/>
                        </p>
                    </div>
                    <input type="submit" value="Concluir Agendamento" className="bg-azul-destaque rounded-lg p-2 cursor-pointer" />
                </form>) :(
                    <div className="flex flex-col gap-3 bg-cinza-vibrante p-4 rounded-lg mb-8">
                        <h3 className="text-2xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Faça login para avaliar</h3>
                        <p className="text-white">Você precisa estar logado para enviar uma review. <Link className="text-azul-destaque underline" to={`/login?redirect=${redirectParam}`}>Entrar</Link></p>
                        <p>Se não possui uma conta, <Link className="text-azul-destaque underline" to={`/cadastrar?redirect=${redirectParam}`}>clique aqui</Link> para se cadastrar.</p>
                    </div>
                )}
            </section>

        </main>

        </>
    )
}

export default Agendar;