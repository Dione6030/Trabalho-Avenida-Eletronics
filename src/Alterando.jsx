import { useEffect, useState } from "react";
import Header from "./components/header";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from 'react-router-dom'


function AlterarProduto() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, setFocus, reset } = useForm();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function carregar() {
            try {
                const res = await fetch(`http://localhost:3000/produtos/${id}`)
                if (!res.ok) throw new Error('Produto não encontrado')
                const produto = await res.json()
                reset({
                    nome: produto.nome || '',
                    marca: produto.marca || '',
                    preco: produto.preco || '',
                    categoria: produto.categoria || '',
                    subcategoria: produto.subcategoria || '',
                    imagem: produto.imagem || ''
                })
            } catch (err) {
                alert(err.message)
            } finally {
                setLoading(false)
                setFocus('nome')
            }
        }
        carregar()
    }, [id, reset, setFocus])

    async function alterarProduto(data) {
        try {
            // envia apenas os campos presentes no form (partial update)
            const resposta = await fetch(`http://localhost:3000/produtos/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!resposta.ok) throw new Error("Erro ao alterar produto");
            const produtoAlterado = await resposta.json();
            alert(`Produto ${produtoAlterado.nome} alterado com sucesso!`);
            navigate('/')
        } catch (error) {
            alert(error.message);
        }
    }

    async function removerProduto() {
        if (!confirm('Tem certeza que deseja remover este produto?')) return;
        try {
            const resposta = await fetch(`http://localhost:3000/produtos/${id}`, { method: "DELETE" });
            if (!resposta.ok) throw new Error("Erro ao remover produto");
            alert("Produto removido com sucesso!");
            navigate('/')
        } catch (error) {
            alert(error.message);
        }
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">Carregando...</div>
    )

    return (
        <>
            <Header />

            <main className="bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8">
                <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Alterar Produto </h2>
                <form  className="bg-preto-vibrante flex flex-col items-start p-6 rounded-lg" onSubmit={handleSubmit(alterarProduto)}>
                 <div className="flex gap-4">
                    <p className="flex flex-col gap-2 mb-4">
                        <label htmlFor="nome" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Nome</label>
                        <input type="text" id="nome"
                        className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                        {...register("nome")} />
                    </p>
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="marca" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Marca</label>
                            <input type="text" id="marca"
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("marca")} />
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="categoria" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Categoria</label>
                            <input type="text" id="categoria"
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("categoria")} />
                        </p>
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="subcategoria" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Sub-Categoria</label>
                            <input type="text" id="subcategoria"
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("subcategoria")} />
                        </p>
                        </div>
                    <div className="flex gap-4">
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="preco" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Preço (R$)</label>
                            <input type="text" id="preco"
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("preco")} />
                        </p>
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="imagem" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Imagem</label>
                            <input type="text" id="imagem"
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("imagem")} />
                        </p>
                    </div>
                    <div className="flex justify-between w-full">
                        <input type="submit" value="Alterar Produto" className="bg-azul-destaque rounded-lg p-2 cursor-pointer" />
                        <button type="button" onClick={removerProduto} className="bg-vermelho-vibrante rounded-lg p-2 cursor-pointer text-white">Remover Produto</button>
                    </div>
                </form>
            </main>
        </>
    )
}

export default AlterarProduto