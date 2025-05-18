import { useEffect, useState } from "react";
import { useAuth } from "../App";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import "../components/Auth.css";

export default function MyTexts() {
  const { currentUser } = useAuth();
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const userTextsRef = collection(db, "users", currentUser.uid, "texts");
    const q = query(userTextsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const textsData = [];
      querySnapshot.forEach((doc) => {
        textsData.push({ id: doc.id, ...doc.data() });
      });
      setTexts(textsData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className="mytexts-container">
      <h2>My Extracted Texts</h2>
      {texts.length === 0 ? (
        <p>No texts found.</p>
      ) : (
        <ul>
          {texts.map(({ id, text, createdAt }) => (
            <li key={id} className="text-item">
              <p>{text}</p>
              <small>{createdAt?.toDate().toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
