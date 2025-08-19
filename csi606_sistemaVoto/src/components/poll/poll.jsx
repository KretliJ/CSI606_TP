import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

function Poll() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { currentUser } = useAuth();

  const generateRandomColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
    );
  };

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const docRef = doc(db, "polls", pollId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const pollData = docSnap.data();
          const optionsWithColors = pollData.options.map((opt) => ({
            ...opt,
            color: opt.color || generateRandomColor(),
          }));

          setPoll({ ...pollData, options: optionsWithColors });

          if (currentUser && pollData.voted.includes(currentUser.email)) {
            setHasVoted(true);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching poll:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoll();
  }, [pollId, currentUser]);

  const handleVote = async () => {
    if (selectedOption === null) {
      alert("Please select an option to vote.");
      return;
    }
    if (!currentUser) {
      alert("You must be logged in to vote.");
      return;
    }
    if (hasVoted) {
      alert("You have already voted in this poll.");
      return;
    }

    const pollRef = doc(db, "polls", pollId);
    const newOptions = [...poll.options];
    newOptions[selectedOption].votes += 1;

    try {
      await updateDoc(pollRef, {
        options: newOptions.map(({ option, votes, color }) => ({
          option,
          votes,
          color,
        })),
        voted: arrayUnion(currentUser.email),
      });
      setPoll({ ...poll, options: newOptions });
      setHasVoted(true);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const totalVotes = poll
    ? poll.options.reduce((sum, opt) => sum + opt.votes, 0)
    : 0;

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    textAlign: "center",
    padding: "20px",
  };
  const pollBoxStyle = { width: "100%", maxWidth: "400px" };

  if (loading)
    return (
      <div className="container container-login">
        <p
          style={{
            marginLeft: 50,
            marginRight: 90,
            marginTop: 30,
            marginBottom: 5,
            textAlign: "center",
          }}
        >
          Carregando...
        </p>
      </div>
    );
  if (!poll)
    return (
      <div>
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <Link to="/">
            <button className="btn btn-sm">Voltar</button>
          </Link>
        </div>
        <div className="container container-login">
          <p
            style={{
              marginLeft: 50,
              marginRight: 90,
              marginTop: 30,
              marginBottom: 5,
              textAlign: "center",
            }}
          >
            Votação não encontrada.
          </p>
        </div>
      </div>
    );

  if (poll.isOpen === false) {
    return (
      <div style={containerStyle}>
        <div style={{ position: "absolute", top: 10, left: 10 }}>
          <Link to="/">
            <button className="btn btn-sm">Voltar</button>
          </Link>
        </div>
        <div style={pollBoxStyle}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontWeight: 600, fontSize: 20 }}>
              {poll.question}
            </label>
          </div>
          <p
            style={{
              marginTop: "20px",
              color: "red",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Esta votação foi encerrada.
          </p>
        </div>
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#333",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          <p style={{ color: "white", margin: "0 0 5px 0" }}>
            Resultados Finais ({totalVotes} votos totais):
          </p>
          <div
            style={{
              display: "flex",
              height: "30px",
              width: "100%",
              borderRadius: "5px",
              overflow: "hidden",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {poll.options.map(
              (opt, index) =>
                totalVotes > 0 &&
                opt.votes > 0 && (
                  <div
                    key={index}
                    style={{
                      width: `${(opt.votes / totalVotes) * 100}%`,
                      backgroundColor: opt.color,
                      transition: "width 0.5s ease-in-out",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      color: "#323232",
                      fontWeight: 500,
                    }}
                    title={`${opt.option}: ${opt.votes} votos`}
                  >
                    {opt.option}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <Link to="/">
          <button className="btn btn-sm">Voltar</button>
        </Link>
      </div>

      <div style={pollBoxStyle}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, fontSize: 20 }}>
            {poll.question}
          </label>
        </div>
        <div>
          {poll.options.map((option, index) => (
            <div key={index} style={{ margin: "10px 0" }}>
              <button
                onClick={() => setSelectedOption(index)}
                disabled={hasVoted}
                className="btn"
                style={{
                  backgroundColor: hasVoted ? "#555" : option.color,
                  color: "white",
                  width: "100%",
                  border:
                    !hasVoted && selectedOption === index
                      ? "3px solid #fff"
                      : "3px solid transparent",
                  boxShadow:
                    !hasVoted && selectedOption === index
                      ? "0 0 10px #fff"
                      : "none",
                  cursor: hasVoted ? "not-allowed" : "pointer",
                  opacity: hasVoted ? 0.6 : 1,
                }}
              >
                {option.option}
              </button>
            </div>
          ))}
        </div>

        {!hasVoted && (
          <button
            onClick={handleVote}
            disabled={selectedOption === null}
            className="btn"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            Confirmar Voto
          </button>
        )}

        {hasVoted && (
          <p
            style={{ marginTop: "20px", fontWeight: "bold", fontSize: "18px" }}
          >
            Ops! Você já votou!
          </p>
        )}
      </div>

      {hasVoted && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#333",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          <p style={{ color: "white", margin: "0 0 5px 0" }}>
            Resultados ({totalVotes} votos totais):
          </p>
          <div
            style={{
              display: "flex",
              height: "30px",
              width: "100%",
              borderRadius: "5px",
              overflow: "hidden",
              color: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {poll.options.map(
              (opt, index) =>
                totalVotes > 0 &&
                opt.votes > 0 && (
                  <div
                    key={index}
                    style={{
                      width: `${(opt.votes / totalVotes) * 100}%`,
                      backgroundColor: opt.color,
                      transition: "width 0.5s ease-in-out",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      color: "#323232",
                      fontWeight: 500,
                    }}
                    title={`${opt.option}: ${opt.votes} votos`}
                  >
                    {opt.option}
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Poll;
