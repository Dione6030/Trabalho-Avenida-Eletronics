import { useEffect, useState } from "react";
import Header from "./components/header";
import { useForm } from "react-hook-form";
import Card from "./components/card";

function Agendar() {
    const { register, handleSubmit, reset, setFocus } = useForm();
    //const [Produto, setProduto] = useState();

    async function ConcluirAgendamento(data) {
        const nome = data.nome;
        const regiao = data.regiao;
        const estado = data.estado;
        const cidade = data.cidade;
        const endereco = data.endereco;
        const complemento = data.complemento;

        try {
            const resposta = await fetch("", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome, regiao, estado, cidade, endereco, complemento
                })
            })
            if (!resposta.ok) throw new Error("Erro ao concluir agendamento");
            const novoAgendamento = await resposta.json();
            alert(`Agendamento concluído com sucesso, muito obrigado pela confiança, ${novoAgendamento.nome}!`);
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
            <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Agendamento para o Produto.nome</h2>
            <section className="bg-preto-vibrante flex flex-col items-center w-[58rem] justify-around gap-y-6 py-8 rounded-lg">
                {/*<Card />*/}
                <form className="bg-preto-vibrante flex flex-col items-start p-6 rounded-lg" onSubmit={handleSubmit(ConcluirAgendamento)} >
                    <div className="flex justify-around gap-8">
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="nome" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Nome Completo</label>
                            <input type="text" id="nome" required
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("nome")}/>
                        </p>
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
                </form>
            </section>

        </main>

        </>
    )
}

export default Agendar;