import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth, loginWithGoogle, logout, db } from "../firebase";

const ChatRoom = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatList, setChatList] = useState([]);

  // Listen status login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Listen chat realtime tanpa perlu login
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setChatList(messages);
    });

    return () => unsubscribe();
  }, []);

  // Kirim pesan (hanya jika login)
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Silahkan login terlebih dahulu untuk mengirim pesan.");
      return;
    }

    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: message,
        uid: user.uid,
        name: user.displayName,
        photo: user.photoURL,
        timestamp: serverTimestamp(),
      });

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-center text-3xl font-bold mb-4">Chat Room</h1>

      {/* Header user */}
      <div className="flex items-center justify-between mb-4 bg-gray-800 p-3 rounded-lg">
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-semibold">{user.displayName}</span>
            </>
          ) : (
            <span className="text-gray-400">Belum Login</span>
          )}
        </div>

        {/* LOGIN / LOGOUT BUTTON */}
        {!user ? (
          <button
            onClick={loginWithGoogle}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div className="bg-gray-800 h-[60vh] overflow-y-auto p-4 rounded-lg mb-4">
        {chatList.map((chat) => (
          <div
            key={chat.id}
            className={`mb-3 flex ${
              user && chat.uid === user.uid ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-xl ${
                user && chat.uid === user.uid
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              <p className="text-sm font-bold mb-1">
                {chat.name || "Unknown"}
              </p>
              <p className="leading-normal break-words">{chat.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Chat */}
      <form onSubmit={sendMessage} className="flex gap-2 w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            user ? "Ketik pesan..." : "Login untuk mengirim pesan..."
          }
          disabled={!user}
          className="flex-1 min-w-0 bg-gray-800 px-4 py-2 rounded-lg outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          className={`px-5 py-2 rounded-lg shrink-0 ${
            user
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {user ? "Kirim" : "Login dulu"}
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
