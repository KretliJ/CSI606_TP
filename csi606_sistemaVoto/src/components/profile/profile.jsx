import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./profile.css";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("user not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      alert(error);
    }
  }
  return (
    <>
      <div>
        {userDetails ? (
          <>
            <Link to="/">
              <button
                className="btn btn-sm"
                type="button"
                style={{ padding: 8, position: "absolute", right: 20, top: 10 }}
              >
                SistemaVoto
              </button>
            </Link>
            <h3>Bem-vindo(a) {userDetails.firstName}</h3>
            <div>
              <p>Email: {userDetails.email}</p>
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
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
        )}
      </div>
    </>
  );
}

export default Profile;
