import { useEffect, useState } from "react";
import Header from "./components/header";
import { useForm } from "react-hook-form";

function AlterarProduto(id, novoProduto) {
    const { register, handleSubmit, setFocus } = useForm();
    const [produtos, setProdutos] = useState([]);

    async function alterarProduto(data) {
        const nome = data.nome;
        const marca = data.marca;
        const preco = data.preco;
        const regiao = data.regiao;
        const imagem = data.imagem;

        try {
            const resposta = await fetch(`${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome, marca, preco, regiao, imagem
                })
            })
            if (!resposta.ok) throw new Error("Erro ao alterar produto");
            const produtoAlterado = await resposta.json();
            alert(`Produto ${produtoAlterado.nome} alterado com sucesso!`);
        } catch (error) {
            alert(error.message);
        }
        setFocus("nome");
    }

    useEffect(() => {
        setFocus("nome");
    }, []);

    return (
        <>
            <Header />

            <main className="bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8">
                <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Alterar Produto </h2>
                <form  className="bg-preto-vibrante flex flex-col items-start p-6 rounded-lg" onSubmit={handleSubmit(alterarProduto)}>
                    <p className="flex flex-col gap-2 mb-4">
                        <label htmlFor="nome" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Nome do Produto</label>
                        <input type="text" id="nome" 
                        className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                        defaultValue={produtos.nome}
                        {...register("nome")} />
                    </p>
                    <div className="flex gap-4">
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="marca" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Marca do Produto</label>
                            <input type="text" id="marca" 
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            defaultValue={produtos.marca}
                            {...register("marca")} />
                        </p>
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="preco" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Preço do Produto</label>
                            <input type="number" id="preco" 
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            defaultValue={produtos.preco}
                            {...register("preco")} />
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="regiao" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Regiões disponíveis</label>
                            <input type="text" id="regiao" 
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            defaultValue={produtos.regiao}
                            {...register("regiao")} />
                        </p>
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="imagem" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Imagem do Produto</label>
                            <input type="text" id="imagem" 
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            defaultValue={produtos.imagem}
                            {...register("imagem")} />
                        </p>
                    </div>
                    <div className="flex justify-between w-full">
                        <input type="submit" value="Alterar Produto" className="bg-azul-destaque rounded-lg p-2 cursor-pointer" />
                    </div>
                </form>
            </main>
        </>
    )
}

export default AlterarProduto