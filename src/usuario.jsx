import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "./components/header";

function Usuario() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setFocus } = useForm();

  useEffect(() => {
    const salvo = localStorage.getItem("usuarioLogado");
    if (!salvo) {
      navigate("/login");
      return;
    }
    const usuario = JSON.parse(salvo);
    reset({
      id: usuario.id,
      nome: usuario.nome || "",
      email: usuario.email || "",
      senha: usuario.senha || "",
      confirmarSenha: usuario.confirmarSenha || "",
      imagem: usuario.imagem || "/Imagens de perfil1.png",
    });
    setFocus("nome");
  }, [navigate, reset, setFocus]);

  async function salvarAlteracoes(data) {
    const id = data.id;
    const payload = {
      id,
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      confirmarSenha: data.confirmarSenha,
      imagem: data.imagem && data.imagem.trim() !== "" ? data.imagem : "/Imagens de perfil1.png",
    };

    if (payload.confirmarSenha === payload.senha) {
      try {
        const resp = await fetch(`http://localhost:3000/usuarios/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

              if (resp.ok) {
                const atualizado = await resp.json();
                localStorage.setItem("usuarioLogado", JSON.stringify(atualizado));
                alert("Perfil atualizado com sucesso!");
              } else {
                const salvo = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
                const atualizado = { ...salvo, ...payload };
                localStorage.setItem("usuarioLogado", JSON.stringify(atualizado));
                alert("Backend indisponível. Alterações salvas localmente.");
              }
          } catch {
              const salvo = JSON.parse(localStorage.getItem("usuarioLogado") || "{}");
              const atualizado = { ...salvo, ...payload };
              localStorage.setItem("usuarioLogado", JSON.stringify(atualizado));
              alert("Erro ao atualizar no servidor. Alterações salvas localmente.");
            }
        } else {
            alert("As senhas não coincidem. Por favor, tente novamente.");
        }
    }

      function sair() {
        localStorage.removeItem("usuarioLogado");
        navigate("/login");
      }

  return (
    <>
      <Header />
      <main className="bg-cinza-vibrante w-full min-h-screen py-12 flex flex-col items-center gap-8">
        <h2 className="text-3xl font-titulo-vibrante-tec-2 font-semibold text-vermelho-vibrante">Meu Perfil</h2>

        <form onSubmit={handleSubmit(salvarAlteracoes)} className="flex flex-col gap-4 bg-preto-vibrante p-6 rounded-lg w-[32rem]">
          <input type="hidden" {...register("id")} />
          <div className="flex items-center gap-4">
            <img src="/Imagens de perfil1.png" alt="Avatar" className="w-16 h-16 rounded-full" />
            <p className="text-white">A imagem exibida é a padrão caso você não forneça uma URL.</p>
          </div>
          <p className="flex flex-col gap-2 mb-2">
            <label htmlFor="nome" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.1rem]">Nome: </label>
            <input id="nome" type="text" {...register("nome")} className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" />
          </p>
          <p className="flex flex-col gap-2 mb-2">
            <label htmlFor="email" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.1rem]">Email: </label>
            <input id="email" type="email" {...register("email")} className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" />
          </p>
          <p className="flex flex-col gap-2 mb-2">
            <label htmlFor="senha" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.1rem]">Senha: </label>
            <input id="senha" type="password" {...register("senha")} className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" />
          </p>
          <p className="flex flex-col gap-2 mb-2">
            <label htmlFor="confirmarSenha" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.1rem]">Confirmar senha: </label>
            <input id="confirmarSenha" type="password" {...register("confirmarSenha")} className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" />
          </p>
          <p className="flex flex-col gap-2 mb-4">
            <label htmlFor="imagem" className="font-texto-vibrante-tec text-vermelho-vibrante text-[1.1rem]">URL da Imagem (opcional): </label>
            <input id="imagem" type="text" placeholder="/Imagens de perfil1.png" {...register("imagem")} className="bg-cinza-primario border border-cinza-secundario rounded-lg p-2" />
          </p>
          <div className="flex justify-between w-full">
            <input type="submit" value="Salvar" className="bg-azul-destaque rounded-lg p-2 cursor-pointer" />
            <button type="button" onClick={sair} className="bg-vermelho-vibrante rounded-lg p-2 cursor-pointer text-white">Sair</button>
          </div>
        </form>
      </main>
    </>
  );
}

export default Usuario;
