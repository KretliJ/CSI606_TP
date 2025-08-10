import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginSignup.css";
import user_ico from "../assets/person.png";
import email_ico from "../assets/email.png";
import password_ico from "../assets/password.png";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const LoginSignup = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [action, setAction] = useState("Cadastrar");

  const resetPasswordFields = () => {
    setPassword("");
    setCPassword("");
  };

  const resetUserFields = () => {
    setUser("");
    setEmail("");
  };
  const handleRegister = async (event) => {
    event.preventDefault();

    if (password !== cPassword) {
      alert("As senhas não coincidem.");
      resetPasswordFields();
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const authUser = auth.currentUser;
      if (authUser) {
        await setDoc(doc(db, "Users", authUser.uid), {
          email: authUser.email,
          firstName: user,
        });
      }
      alert("Cadastro realizado com sucesso!");
      resetPasswordFields();
      resetUserFields();
      setAction("Entrar");
    } catch (error) {
      // tratamento de erros do Firebase
      console.error("Erro detalhado do Firebase:", error); // Log para o desenvolvedor

      let userMessage =
        "Ocorreu um erro ao tentar fazer o cadastro. Tente novamente.";

      switch (error.code) {
        case "auth/email-already-in-use":
          alert(
            "Este e-mail já está em uso. Tente fazer login ou use um e-mail diferente."
          );
          break;
        case "auth/invalid-email":
          alert("O formato do e-mail é inválido. Verifique e tente novamente.");
          break;
        case "auth/weak-password":
          alert("A senha é muito fraca. Ela deve ter pelo menos 6 caracteres.");
          break;
        case "auth/operation-not-allowed":
          alert(
            "O cadastro com e-mail e senha não está habilitado. Contate o suporte."
          );
          break;
        case "auth/network-request-failed":
          alert("Falha de rede. Verifique sua conexão com a internet.");
          break;
        default:
          // Mensagem genérica para outros erros
          alert(
            "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
          );
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("login realizado");
      window.location.href = "/profile";
    } catch (error) {
      alert("Erro no login. Verifique email e senha!");
    }
  };

  return (
    <form onSubmit={action === "Cadastrar" ? handleRegister : handleLogin}>
      <div className="container container-login">
        <div className="header header-login">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Entrar" ? (
            <div></div>
          ) : (
            <div className="input input-login">
              <img src={user_ico} alt="" />
              <input
                type="text"
                placeholder="Digite seu nome de usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input input-login">
            <img src={email_ico} alt="" />
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input input-login">
            <img src={password_ico} alt="" />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {action === "Entrar" ? (
            <div></div>
          ) : (
            <div className="input input-login">
              <img src={password_ico} alt="" />
              <input
                type="password"
                placeholder="Confirme sua senha"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
              />
            </div>
          )}
        </div>
        {action === "Cadastrar" ? (
          <div></div>
        ) : (
          <div className="forgot-password">Esqueci minha senha</div>
        )}
        <div className="submit-container">
          <div
            className={
              action === "Entrar"
                ? "submit submit-login gray"
                : "submit submit-login"
            }
            onClick={() => setAction("Cadastrar")}
          >
            Cadastrar
          </div>
          <div
            className={
              action === "Cadastrar"
                ? "submit submit-login gray"
                : "submit submit-login"
            }
            onClick={() => setAction("Entrar")}
          >
            Entrar
          </div>
        </div>

        {/* Este é o botão que realmente envia o formulário */}

        {action === "Cadastrar" ? (
          <button
            type="submit"
            className="submit-main-button"
            style={{ marginInline: 40, borderRadius: 20 }}
          >
            Confirmar cadastro
          </button>
        ) : (
          <button
            type="submit"
            className="submit-main-button"
            style={{ marginInline: 40, borderRadius: 20 }}
          >
            Clique para entrar
          </button>
        )}

        <div
          className="text-black p-0"
          style={{ position: "absolute", top: 10, left: 10 }}
        >
          <Link to="/">
            <button className="btn btn-sm" type="button">
              Voltar
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginSignup;
