import Header from "./components/header";
import { useForm } from "react-hook-form";
import Card from "./components/card";
import { useState } from "react";

function Pesquisar() {
    const { register, handleSubmit } = useForm();
    const [produtos, setProdutos] = useState([]);

    async function pesquisarProdutos(data) {
        try {
            const resposta = await fetch("")
            if (!resposta.ok) throw new Error("Erro ao buscar produtos");
            const dados = await resposta.json();
            const dadosfiltrados = dados.filter( produto =>(
                produto.marca.toUpperCase().includes(data.pesquisamc.toUpperCase) ||
                produto.categoria.toUpperCase().includes(data.pesquisamc.toUpperCase) &&
                produto.regiao.toUpperCase().includes(data.pesquisaregiao.toUpperCase)
            ))
            if (dadosfiltrados.lenght == 0) {
                alert("Nenhum produto encontrado desta marca/categoria nesta região")
            } else {
                setProdutos(dadosfiltrados)
            }
        } catch (error) {
            console.log("Error: ", error.message);
        }
    }

    const listaProdutos = produtos.map( produto => (
        <Card key={produto.id} produto={produto} />
    ))


    return (
        <>
            <Header />

            <main className="bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8">
                <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Pesquisar Produtos</h2>
                <form onSubmit={handleSubmit(pesquisarProdutos)} className="flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                        <input type="text" className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" required
                        placeholder="Marca ou Categoria"
                        {...register("pesquisamc")} />
                        <input type="text" className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" required
                        placeholder="Região"
                        {...register("pesquisaregiao")} />
                    </div>
                    <input type="submit" value="Pesquisar" className="bg-azul-destaque rounded-lg p-2 cursor-pointer" />
                </form>
                <div className='bg-preto-vibrante flex flex-wrap items-center w-[58rem] justify-around gap-y-6 py-8 rounded-lg'>
                    {listaProdutos}
                </div>
            </main>
        </>
    )
}

export default Pesquisar