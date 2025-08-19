import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function MyPolls() {
  const [myPolls, setMyPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchMyPolls = async () => {
      if (!currentUser) {
        setLoading(false);
        setError("Você deve logar para ver suas votações.");
        return;
      }

      try {
        const q = query(
          collection(db, "polls"),
          where("createdBy", "==", currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        const polls = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyPolls(polls);
      } catch (err) {
        console.error("Erro ao buscar votações:", err);
        setError("Não foi possível encontrar suas votações.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPolls();
  }, [currentUser]);

  const handleDelete = async (pollId) => {
    if (!window.confirm("Tem certeza que quer apagar esta votação?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "polls", pollId));
      setMyPolls(myPolls.filter((poll) => poll.id !== pollId));
    } catch (err) {
      console.error("Erro ao apagar votação:", err);
      setError(
        "Não foi possível apagar esta votação. Por favor tente novamente"
      );
    }
  };

  const handleClosePoll = async (pollId) => {
    const pollRef = doc(db, "polls", pollId);
    try {
      await updateDoc(pollRef, {
        isOpen: false,
      });
      setMyPolls(
        myPolls.map((p) => (p.id === pollId ? { ...p, isOpen: false } : p))
      );
    } catch (err) {
      console.error("Erro ao fechar a votação:", err);
      setError("Não foi possível fechar a votação.");
    }
  };

  if (loading) {
    return <div>Loading your polls...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <Link to="/">
          <button className="btn btn-sm" type="button">
            Voltar
          </button>
        </Link>
      </div>
      <div className="container">
        <h2>My Polls</h2>
        {myPolls.length === 0 ? (
          <p>
            You haven't created any polls yet.{" "}
            <Link to="/userpoll">Create one now!</Link>
          </p>
        ) : (
          myPolls.map((poll) => (
            <div
              key={poll.id}
              style={{
                border: "1px solid #ccc",
                padding: "16px",
                margin: "16px 0",
                borderRadius: "8px",
                backgroundColor: poll.isOpen === false ? "#505050" : "#559555",
              }}
            >
              <h3>
                {poll.question} (ID: {poll.id})
              </h3>
              <ul>
                {poll.options.map((option, index) => (
                  <li key={index}>
                    {option.option}: {option.votes} votos
                  </li>
                ))}
              </ul>
              {poll.isOpen === false ? (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Votação Encerrada
                </p>
              ) : (
                <button
                  onClick={() => handleClosePoll(poll.id)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#ffc107",
                    color: "black",
                    marginRight: "10px",
                  }}
                >
                  Encerrar Votação
                </button>
              )}
              <button
                onClick={() => handleDelete(poll.id)}
                className="btn btn-sm"
                style={{ backgroundColor: "#dc3545", color: "white" }}
              >
                Deletar votação
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyPolls;
