import Header from "./components/header"
import Card from "./components/card"
import CardReview from "./components/cardReview"
import { useForm } from "react-hook-form"
import { useEffect } from "react";

//import { useState } from "react";

function Reviews() {
    const { register, handleSubmit, reset, setFocus } = useForm();
    //const { produto, setProduto } = useState();

    async function enviarReview(data) {
        const nome = data.nome;
        const nota = data.nota;
        const comentario = data.comentario;

        try {
            const resposta = await fetch("", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    nota,
                    comentario
                })
            })
            if (!resposta.ok) throw new Error("Erro ao enviar review");
            const novaReview = await resposta.json();
            alert(`Obrigado pela sua review, ${novaReview.nome}!`);
        } catch (error) {
            console.log("Error: ", error.message);
        }
        reset();
        setFocus("nome");
    }

    useEffect(() => {
        setFocus("nome");
    }, []);

    return (
        <>
            <Header />
            <main className="bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8">
                <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Reviews do {/*Produto.nome*/}</h2>
                <section className="bg-preto-vibrante flex items-start w-[58rem] justify-around gap-y-6 py-8 rounded-lg">
                <Card />
                    <div className="flex flex-col justify-center">
                        <form className="flex flex-col gap-4 bg-cinza-vibrante p-4 rounded-lg mb-8" onSubmit={handleSubmit(enviarReview)} >
                            <h3 className="text-2xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Deixe sua Review:</h3>
                            <p className="flex flex-col gap-2">
                                <label htmlFor="nome" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Nome:</label>
                                <input type="text" id="nome" required
                                className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2 w-full" 
                                {...register("nome")}/>
                            </p>
                            <p className="flex flex-col gap-2">
                                <label htmlFor="nota" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Nota (de 1 a 5):</label>
                                <input type="number" id="nota" min="1" max="5" required
                                className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2 w-full" 
                                {...register("nota")}/>
                            </p>
                            <p className="flex flex-col gap-2">
                                <label htmlFor="Comentario" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Comentário:</label>
                                <textarea name="Escreva seu Comentário" id="Comentario" className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2 w-full" placeholder="Deixe seu Comentário" 
                                {...register("comentario")}></textarea>
                            </p>
                        </form>
                        <CardReview />
                        <CardReview />
                        <CardReview />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Reviews