import Header from "./components/header"
import Card from "./components/card"
import CardReview from "./components/cardReview"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function Reviews() {
    const { id } = useParams();
    const { register, handleSubmit, reset, setFocus } = useForm();
    const [produto, setProduto] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [logado, setLogado] = useState(false);
    const location = useLocation();
    const redirectParam = encodeURIComponent(location.pathname + location.search);

    async function enviarReview(data) {
        const produtoId = parseInt(id);
        const avaliacao = Number(data.avaliacao);
        const comentario = data.comentario;
        const exibirNome = !!data.exibirNome;

            let usuario = 'Anônimo';
            let usuarioId = null;
        try {
            const raw = localStorage.getItem('usuarioLogado');
            const u = raw ? JSON.parse(raw) : null;
                if (u?.id) usuarioId = Number(u.id);
                if (exibirNome && u?.nome) usuario = u.nome;
        } catch {/* mantém 'Anônimo' se houver erro ao ler o storage*/}

        try {
            const resposta = await fetch("http://localhost:3000/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ produtoId, usuarioId, usuario, avaliacao, comentario })
            });
            if (!resposta.ok) throw new Error("Erro ao enviar review");
            const novaReview = await resposta.json();

            alert(`Review enviada com sucesso!`);
            setReviews(prevReviews => [...prevReviews, novaReview]);
            reset({ exibirNome });
            setFocus("avaliacao");
        } catch (error) {
            console.log("Error: ", error.message);
        }
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
            if (e.key === 'usuarioLogado') loadUser();
        }
        window.addEventListener('storage', onStorage);

        async function fetchData() {
            try {
                const respostaProdutos = await fetch(`http://localhost:3000/produtos/${id}`);
                if (!respostaProdutos.ok) throw new Error("Erro ao buscar produtos");
                const dadosProdutos = await respostaProdutos.json();

                const respostaReviews = await fetch("http://localhost:3000/reviews");
                if (!respostaReviews.ok) throw new Error("Erro ao buscar reviews");
                const dadosReviews = await respostaReviews.json();

                setProduto(dadosProdutos);
                setReviews(dadosReviews.filter(review => review.produtoId === parseInt(id)));
            } catch (error) {
                console.log("Error: ", error.message);
            }
            reset();
            setFocus("avaliacao");
        }
        fetchData();
        return () => window.removeEventListener('storage', onStorage);
    }, [id, reset, setFocus]);

    return (
        <>
            <Header />
            <main className="bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8">
                <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Reviews do {produto?.nome || "Produto"}</h2>
                <section className="bg-preto-vibrante flex items-start w-[58rem] justify-around gap-y-6 py-8 rounded-lg">
                {produto && <Card produto={produto} />}
                    <div className="flex flex-col justify-center">
                        {logado ? (
                        <form className="flex flex-col gap-4 bg-cinza-vibrante p-4 rounded-lg mb-8" onSubmit={handleSubmit(enviarReview)} >
                            <h3 className="text-2xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Deixe sua Review:</h3>
                            <p className="flex items-center gap-2">
                                <input type="checkbox" id="exibirNome" defaultChecked {...register("exibirNome")} />
                                <label htmlFor="exibirNome" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.1rem]">Deseja que seu nome seja exibido?</label>
                            </p>
                            <p className="flex flex-col gap-2">
                                <label htmlFor="nota" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Nota (de 1 a 5):</label>
                                <input type="number" id="nota" min="1" max="5" required
                                className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2 w-full" 
                                {...register("avaliacao")}/>
                            </p>
                            <p className="flex flex-col gap-2">
                                <label htmlFor="Comentario" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Comentário:</label>
                                <textarea name="Escreva seu Comentário" id="Comentario" className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2 w-full" placeholder="Deixe seu Comentário" 
                                {...register("comentario")}></textarea>
                            </p>
                            <div className="flex justify-between w-full">
                                <input type="submit" value="Enviar Review" className="bg-azul-destaque rounded-lg p-2 cursor-pointer" />
                                <input type="reset" value="Limpar" className="bg-vermelho-vibrante rounded-lg p-2 cursor-pointer text-white" />
                            </div>
                        </form>
                        ) : (
                        <div className="flex flex-col gap-3 bg-cinza-vibrante p-4 rounded-lg mb-8">
                            <h3 className="text-2xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Faça login para avaliar</h3>
                            <p className="text-white">Você precisa estar logado para enviar uma review. <Link className="text-azul-destaque underline" to={`/login?redirect=${redirectParam}`}>Entrar</Link></p>
                            <p>Se não possui uma conta, <Link className="text-azul-destaque underline" to={`/cadastrar?redirect=${redirectParam}`}>clique aqui</Link> para se cadastrar.</p>
                        </div>
                        )}
                        {reviews.length > 0 ? (
                            reviews.map(review => <CardReview key={review.id} review={review} />)
                        ) : (<p className="text-2xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Nenhuma review para este produto.</p>)
                        }
                    </div>
                </section>
            </main>
        </>
    )
}

export default Reviews