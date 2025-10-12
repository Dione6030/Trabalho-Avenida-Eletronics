import { useEffect } from "react";
import Header from "./components/header";
import { useForm } from "react-hook-form";

function Adicionar() {
    const { register, handleSubmit, reset, setFocus } = useForm();

    async function cadastrarProduto(data) {
        const nome = data.nome;
        const marca = data.marca;
        const preco = data.preco;
        const regiao = data.regiao;
        const imagem = data.imagem;

        try {
            const resposta = await fetch("", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome, marca, preco, regiao, imagem
                })
            })
            if (!resposta.ok) throw new Error("Erro ao cadastrar produto");
            const novoProduto = await resposta.json();
            alert(`Produto ${novoProduto.nome} cadastrado com sucesso com o id ${novoProduto.id}!`);
        } catch (error) {
            console.log("Error: ", error.message);
        }
        reset();
        setFocus("nome");
    }

    function resetarCampos() {
        reset({
            nome: "",
            marca: "",
            preco: "",
            regiao: "",
            imagem: ""
        });
        setFocus("nome");
    }

    useEffect(() => {
        setFocus("nome");
    }, [setFocus])

    return (
        <>
            <Header />

            <main className="bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8">
                <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Adicionar Produto</h2>
                <form  className="bg-preto-vibrante flex flex-col items-start p-6 rounded-lg" onSubmit={handleSubmit(cadastrarProduto)} onReset={reset(resetarCampos)}>
                    <p className="flex flex-col gap-2 mb-4">
                        <label htmlFor="nome" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Nome do Produto</label>
                        <input type="text" id="nome" required
                        className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                        {...register("nome")} />
                    </p>
                    <div className="flex gap-4">
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="marca" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Marca do Produto</label>
                            <input type="text" id="marca" required
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("marca")} />
                        </p>
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="preco" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Preço do Produto</label>
                            <input type="number" id="preco" required
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("preco")} />
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="regiao" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Regiões disponíveis</label>
                            <input type="text" id="regiao" required
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("regiao")} />
                        </p>
                        <p className="flex flex-col gap-2 mb-4">
                            <label htmlFor="imagem" className="font-texto-vibrante-tec text-[1.25rem] text-vermelho-vibrante">Imagem do Produto</label>
                            <input type="text" id="imagem" required
                            className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2"
                            {...register("imagem")} />
                        </p>
                    </div>
                    <div className="flex justify-between w-full">
                        <input type="submit" value="Adicionar Produto" className="bg-azul-destaque rounded-lg p-2 cursor-pointer" />
                        <input type="reset" value="Limpar" className="bg-vermelho-vibrante rounded-lg p-2 cursor-pointer" />
                    </div>
                </form>
            </main>
        </>
    )
}

export default Adicionar