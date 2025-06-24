import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <body>
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
            <button
              id="profilebutton"
              class="btn btn-sm"
              type="button"
              style={{ padding: 8 }}
            >
              Perfil
            </button>
          </div>
          <div style={{ padding: 8, position: "absolute", left: 0 }}>
            <div style={{ padding: 8, display: "inline" }}>
              <button
                id="votacaobutton"
                class="btn btn-sm"
                type="button"
                style={{ padding: 8 }}
              >
                Criar votação
              </button>
            </div>
            <div style={{ padding: 8, display: "inline" }}>
              <button
                id="votacaouserbutton"
                class="btn btn-sm"
                type="button"
                style={{ padding: 8 }}
              >
                Minhas votações
              </button>
              <div style={{ padding: 8, display: "inline" }}>
                <button
                  id="aboutbutton"
                  class="btn btn-sm buttonclean"
                  type="button"
                  style={{
                    padding: 8,
                  }}
                >
                  Sobre
                </button>
              </div>
            </div>
          </div>
        </header>

        <div id="main" class="wrapper" style={{ right: 30 }}>
          <input
            type="text"
            id="search"
            placeholder="Digite aqui o ID da votação para buscar"
          />
          <button
            class="wrapper"
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
      </body>
    </>
  );
}

export default App;
