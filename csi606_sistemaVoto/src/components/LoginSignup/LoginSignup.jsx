import React, { useState } from "react";
import "./LoginSignup.css";
import user_ico from "../assets/person.png";
import email_ico from "../assets/email.png";
import password_ico from "../assets/password.png";

const LoginSignup = () => {
  const [action, setAction] = useState("Cadastrar");

  return (
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
              id="userfield"
              type="text"
              placeholder="Digite seu nome de usuário"
            />
          </div>
        )}
        <div className="input input-login">
          <img src={email_ico} alt="" />
          <input id="emailfield" type="email" placeholder="Digite seu e-mail" />
        </div>
        <div className="input input-login">
          <img src={password_ico} alt="" />
          <input id="insert" type="password" placeholder="Digite sua senha" />
        </div>

        {action === "Entrar" ? (
          <div></div>
        ) : (
          <div className="input input-login">
            <img src={password_ico} alt="" />
            <input
              id="confirm"
              type="password"
              placeholder="Confirme sua senha"
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
          onClick={() => {
            setAction("Cadastrar");
          }}
        >
          Cadastrar
        </div>
        <div
          className={
            action === "Cadastrar"
              ? "submit submit-login gray"
              : "submit submit-login"
          }
          onClick={() => {
            setAction("Entrar");
          }}
        >
          Entrar
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
