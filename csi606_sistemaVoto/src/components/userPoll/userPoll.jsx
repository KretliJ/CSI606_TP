import React, { useState } from "react";
import { db } from "../firebase";
import { collection, doc, runTransaction } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

function UserPoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length <= 2) {
      alert("Uma votação deve ter pelo menos duas opções.");
      return;
    }
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!currentUser) {
      alert("Você deve logar para criar uma votação.");
      return;
    }

    setLoading(true);
    try {
      const newPollId = await runTransaction(db, async (transaction) => {
        const counterRef = doc(db, "counters", "polls");
        const counterDoc = await transaction.get(counterRef);

        let newId = 1;
        if (counterDoc.exists()) {
          newId = counterDoc.data().currentId + 1;
        }

        transaction.set(counterRef, { currentId: newId });

        const pollData = {
          question,
          options: options.map((option) => ({ option, votes: 0 })),
          createdBy: currentUser.email,
          voted: [],
          isOpen: true,
        };

        const newPollRef = doc(db, "polls", newId.toString());
        transaction.set(newPollRef, pollData);

        return newId.toString();
      });

      console.log("Document written with ID: ", newPollId);
      navigate(`/poll/${newPollId}`);
    } catch (err) {
      console.error("Erro na criação: ", err);
      setError(
        "Não foi possível criar a votação, cheque a conexão com a rede."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
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
      <h2 style={{ textAlign: "center", width: "100%" }}>Create a New Poll</h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div>
          <label></label>
          <input
            type="text"
            value={question}
            style={{
              borderRadius: 10,
              width: "100%",
              height: 35,
              padding: 5,
              marginBottom: 20,
              boxSizing: "border-box",
            }}
            placeholder="Digite aqui o nome da sua votação"
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 600 }}>Opções</label>
          </div>
          {options.map((option, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <input
                type="text"
                value={option}
                placeholder="Digite aqui uma opção"
                style={{
                  borderRadius: 10,
                  width: "100%",
                  height: 35,
                  padding: 5,
                  flexGrow: 1,
                  boxSizing: "border-box",
                }}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="btn btn-sm"
                  style={{ marginLeft: "8px", flexShrink: 0 }}
                >
                  Remover
                </button>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            type="button"
            onClick={addOption}
            className="btn btn-sm"
            style={{ padding: 10, margin: 10 }}
          >
            Adicionar opção
          </button>
          <button type="submit" className="btn btn-sm" disabled={loading}>
            {loading ? "Criando..." : "Criar votação"}
          </button>
        </div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      </form>
    </div>
  );
}

export default UserPoll;
