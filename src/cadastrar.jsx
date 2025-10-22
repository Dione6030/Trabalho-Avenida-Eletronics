import { useForm } from "react-hook-form";
import Header from "./components/header";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function Cadastrar() {
    const { register, handleSubmit, reset, setFocus } = useForm();
    const location = useLocation();
    const navigate = useNavigate();

    async function cadastrarUsuario(data) {
    const nome = data.nome;
    const email = data.email;
    const senha = data.senha;
    const confirmarSenha = data.confirmarSenha;
    // se o usuário não fornecer imagem, usamos uma imagem padrão pública
    const imagem = data.imagem && data.imagem.trim() !== "" ? data.imagem : "/Imagens de perfil2.png";

        if (senha === confirmarSenha) {
            try {
                const resposta = await fetch("http://localhost:3000/usuarios", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nome,
                        email,
                        senha,
                        imagem
                    })
                });
                if (!resposta.ok) throw new Error("Erro ao cadastrar usuário");
                const novoUsuario = await resposta.json();
                alert(`Usuário ${novoUsuario.nome} cadastrado com sucesso com o id ${novoUsuario.id}!`);
                // auto-login e redireciona para a página desejada
                localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
                const params = new URLSearchParams(location.search);
                const redirect = params.get("redirect") || "/";
                navigate(redirect);
            } catch (error) {
                console.error("Erro ao cadastrar usuário:", error);
            }
            reset();
            setFocus("nome");
        } else {
            alert("As senhas não coincidem. Por favor, tente novamente.");
            setFocus("senha");
        }
    }

    function resetarCampos() {
        reset({
            nome: "",
            email: "",
            senha: "",
            imagem: ""
        });
        setFocus("nome");
    }

    useEffect(() => {
        setFocus("nome");
    }, [setFocus]);

    return (
        <>
            <Header />
            <main className='bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8'>
                <h2 className='text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante'>Cadastro</h2>
                <form onSubmit={handleSubmit(cadastrarUsuario)} onReset={resetarCampos} className="flex flex-col gap-4 bg-preto-vibrante p-6 rounded-lg">
                    <p className="flex flex-col gap-2 mb-4">
                        <label htmlFor="nome" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Nome: </label>
                        <input type="text" id="nome" {...register("nome")} className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" required />
                    </p>
                    <p className="flex flex-col gap-2 mb-4">
                        <label htmlFor="email" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Email: </label>
                        <input type="email" id="email" {...register("email")} className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" required />
                    </p>
                    <p className="flex flex-col gap-2 mb-4">
                        <label htmlFor="senha" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Senha: </label>
                        <input type="password" id="senha" {...register("senha")} className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" required />
                    </p>
                    <p className="flex flex-col gap-2 mb-4">
                        <label className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Confirmar Senha: </label>
                        <input type="password" id="confirmarSenha" {...register("confirmarSenha")} className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" required />
                    </p>
                    <p className="flex flex-col gap-2 mb-4">
                        <label htmlFor="imagem" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">URL da Imagem (opcional): </label>
                        <input type="text" id="imagem" {...register("imagem")} placeholder="Imagem padrão" className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" />
                    </p>
                    <div className="flex justify-between w-full">
                        <input type="submit" value="Cadastrar" className="bg-azul-destaque rounded-lg p-2 cursor-pointer" />
                        <input type="reset" value="Limpar" className="bg-vermelho-vibrante rounded-lg p-2 cursor-pointer text-white" />
                    </div>
                </form>
            </main>
        </>
    )
}

export default Cadastrar;