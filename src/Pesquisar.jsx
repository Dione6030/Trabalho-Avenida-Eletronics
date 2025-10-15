import Header from "./components/header";
import { useForm } from "react-hook-form";
import Card from "./components/card";
import { useState } from "react";

function Pesquisar() {
    const { register, handleSubmit } = useForm();
    const [produtos, setProdutos] = useState([]);

    async function pesquisarProdutos(data) {
        try {
            const resposta = await fetch("http://localhost:3000/produtos");
            if (!resposta.ok) throw new Error("Erro ao buscar produtos");
            const dados = await resposta.json();
            const pesquisaMarca = (data.pesquisamarca || '').toString().toUpperCase();
            const pesquisaCateg = (data.pesquisacateg || '').toString().toUpperCase();
            const pesquisaSCateg = (data.pesquisascateg || '').toString().toUpperCase();

            if (!pesquisaMarca && (!pesquisaCateg || !pesquisaSCateg)) {
                setProdutos(dados);
                return;
            }

            const dadosfiltrados = dados.filter(produto => {
                const marca = (produto?.marca || '').toString().toUpperCase();
                const categoria = (produto?.categoria || '').toString().toUpperCase();
                const subcategoria = (produto?.subcategoria || '').toString().toUpperCase();

                const puxaMarca = pesquisaMarca ? marca === pesquisaMarca : true;
                const puxaCateg = pesquisaCateg ? categoria === pesquisaCateg : true;
                const puxaSCateg = pesquisaSCateg ? subcategoria === pesquisaSCateg : true;
                
                return puxaMarca && puxaCateg && puxaSCateg;
            });

            if (dadosfiltrados.length === 0) {
                alert("Nenhum produto encontrado desta marca ou categoria");
                setProdutos([]);
            } else {
                setProdutos(dadosfiltrados);
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
                        <input type="text" className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                        placeholder="Marca"
                        {...register("pesquisamarca")} />
                        <input type="text" className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                        placeholder="Categoria"
                        {...register("pesquisacateg")}
                        {...register("pesquisascateg")} />
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