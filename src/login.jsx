import { useForm } from "react-hook-form";
import Header from "./components/header";
import { useEffect } from "react";


function Login() {
    const { register, handleSubmit, setFocus } = useForm();

    async function entrarUsuario(data) {
        const email = data.email;
        const senha = data.senha;

        try {
            const resposta = await fetch("http://localhost:3000/usuarios?email=" + encodeURIComponent(email) + "&senha=" + encodeURIComponent(senha));
            if (!resposta.ok) throw new Error("Erro ao buscar usuário");
            const usuarios = await resposta.json();
            alert(`Seja bem-vindo, ${usuarios[0].nome}!`);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
        setFocus("email");
    }
    useEffect(() => {
        setFocus("email");
    }, []);

    return (
        <>
        <Header />
        <main className="bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8">
            <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Login</h2>
            <form onSubmit={handleSubmit(entrarUsuario)} className="flex flex-col gap-4 bg-preto-vibrante p-6 rounded-lg">
                <p className="flex flex-col gap-2 mb-4">
                    <label  className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Email: </label>
                    <input type="email" className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" {...register("email")} required />
                </p>
                <p className="flex flex-col gap-2 mb-4">
                    <label  className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.25rem]">Senha: </label>
                    <input type="password" className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" {...register("senha")} required />
                </p>
                <input type="submit" value="Entrar" className="bg-azul-destaque rounded-lg p-2 cursor-pointer"/>
            </form>
        </main>
        </>
    )
}

export default Login;