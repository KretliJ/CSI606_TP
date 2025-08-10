import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function landing() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header
        className="fixed-header"
        style={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: -2,
          width: "100%",
        }}
      >
        <div style={{ padding: 8, position: "absolute", right: 0 }}>
          <Link to="/Login">
            <button
              id="profilebutton"
              className="btn btn-sm"
              type="button"
              style={{ padding: 8 }}
            >
              Fazer login{" "}
            </button>
          </Link>
        </div>
        <div style={{ padding: 8, position: "absolute", right: 100 }}>
          <div style={{ padding: 8, display: "inline" }}>
            <Link to="/About">
              <button
                id="aboutbutton"
                className="btn btn-sm buttonclean"
                type="button"
                style={{
                  padding: 8,
                }}
              >
                Sobre
              </button>
            </Link>
          </div>
        </div>
      </header>
      <div className="container">
        <div id="main" className="wrapper" style={{ right: 30 }}>
          <input
            type="text"
            id="search"
            placeholder="Digite aqui o ID da votação para buscar"
          />
          <button
            className="wrapper"
            style={{
              justifyContent: "center",
              right: -63,
              top: 4,
              borderRadius: 15,
              height: 43,
            }}
          >
            <svg
              style={{ display: "inline" }}
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentcolor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M00h24v24H0z" fill="none"></path>
              <path d="M5 12l14 0"></path>
              <path d="M13 18l6 -6"></path>
              <path d="M13 6l6 6"></path>
            </svg>
          </button>
        </div>
        <div style={{ position: "relative", bottom: -10 }}>
          <button
            id="votacaobutton"
            className="btn btn-sm"
            type="button"
            style={{
              padding: 8,
              margin: 8,
              width: "40%",
              display: "inline-block",
            }}
          >
            Criar votação
          </button>
          <button
            id="votacaouserbutton"
            className="btn btn-sm"
            type="button"
            style={{
              padding: 8,
              margin: 8,
              width: "40%",
              display: "inline-block",
            }}
          >
            Minhas votações
          </button>
        </div>
      </div>
    </>
  );
}

export default landing;
