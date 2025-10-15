import Header from "./components/header"
import Card from "./components/card"
import CardReview from "./components/cardReview"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//import { useState } from "react";

function Reviews() {
    const { id } = useParams();
    const { register, handleSubmit, reset, setFocus } = useForm();
    const [produto, setProduto] = useState(null);
    const [reviews, setReviews] = useState([]);

    async function enviarReview(data) {
        const produtoId = parseInt(id);
        const usuario = data.usuario;
        const avaliacao = data.avaliacao;
        const comentario = data.comentario;

        try {
            const resposta = await fetch("http://localhost:3000/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ produtoId, usuario, avaliacao, comentario })
            });
            if (!resposta.ok) throw new Error("Erro ao enviar review");
            const novaReview = await resposta.json();

            alert(`Review enviada com sucesso!`);
            setReviews(prevReviews => [...prevReviews, novaReview]);
            reset();
            setFocus("nome");
        } catch (error) {
            console.log("Error: ", error.message);
        }
    }

    useEffect(() => {
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
            setFocus("nome");
        }
        fetchData();
    }, [id, reset, setFocus]);

    return (
        <>
            <Header />
            <main className="bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8">
                <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Reviews do {produto?.nome || "Produto"}</h2>
                <section className="bg-preto-vibrante flex items-start w-[58rem] justify-around gap-y-6 py-8 rounded-lg">
                {produto && <Card produto={produto} />}
                    <div className="flex flex-col justify-center">
                        <form className="flex flex-col gap-4 bg-cinza-vibrante p-4 rounded-lg mb-8" onSubmit={handleSubmit(enviarReview)} >
                            <h3 className="text-2xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Deixe sua Review:</h3>
                            <p className="flex flex-col gap-2">
                                <label htmlFor="nome" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Nome:</label>
                                <input type="text" id="nome" required
                                className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2 w-full" 
                                {...register("usuario")}/>
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
                                <input type="reset" value="Limpar" className="bg-vermelho-vibrante rounded-lg p-2 cursor-pointer" />
                            </div>
                        </form>
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