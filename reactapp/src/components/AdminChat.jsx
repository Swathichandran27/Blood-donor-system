import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const AdminChat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Connect to WebSocket backend
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // auto reconnect
      onConnect: () => {
        console.log("✅ Admin connected to WebSocket");
        setConnected(true);

        // Subscribe to public topic
        client.subscribe("/topic/public", (msg) => {
          const body = JSON.parse(msg.body);
          console.log("📩 Admin received:", body);
          setMessages((prev) => [...prev, body]);
        });
      },
      onDisconnect: () => {
        console.log("❌ Admin disconnected");
        setConnected(false);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && connected && input.trim() !== "") {
      const message = {
        sender: "Admin", // 👈 mark sender as admin
        content: input,
      };
      stompClient.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(message),
      });
      setInput("");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>💬 Admin Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "Admin" ? "right" : "left",
              marginBottom: "5px",
            }}
          >
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your reply..."
        style={{ width: "75%", padding: "8px" }}
      />
      <button onClick={sendMessage} style={{ width: "20%", padding: "8px" }}>
        Send
      </button>
    </div>
  );
};

export default AdminChat;
