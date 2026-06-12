

import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { startChat, sendAnswer, generateRoadmap } from "../api/roadmapApi";
import Navbar from "../components/Navbar";
import "../styles/chat.css";

function Chat() {
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const [chatId, setChatId] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmapStatus, setRoadmapStatus] = useState("");

  // Array to maintain conversational message history state
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    initializeChat();
  }, []);

  // Forces the message container viewport to track and lock scroll onto fresh text items
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const initializeChat = async () => {
    try {
      const data = await startChat(user.userId);
      setChatId(data.chatId);
      
      // Inject the initial question coming from your system model
      if (data.nextQuestion) {
        setMessages([
          { sender: "ai", text: data.nextQuestion }
        ]);
      }
    } catch (error) {
      console.error("Initialization error:", error);
    }
  };

  const handleNext = async () => {
    if (!answer.trim() || loading || roadmapStatus) return;

    const currentUserAnswer = answer;
    setAnswer(""); // Clean user input textbox entry area instantly
    setLoading(true);

    // 1. Immediately push user text onto the display window interface
    setMessages((prev) => [...prev, { sender: "user", text: currentUserAnswer }]);

    try {
      const data = await sendAnswer(chatId, currentUserAnswer);

      if (data.nextQuestion) {
        // 2. Append the next incoming systemic question element block 
        setMessages((prev) => [...prev, { sender: "ai", text: data.nextQuestion }]);
      } else {
        // 3. Handle termination logic frame when interview completes
        setRoadmapStatus("generating");
        setMessages((prev) => [
          ...prev, 
          { sender: "ai", text: "Thank you! Processing your answers to create a personalized roadmap..." }
        ]);

        await generateRoadmap(chatId);
        setRoadmapStatus("completed");
        
        setMessages((prev) => [
          ...prev, 
          { sender: "ai", text: "🎉 Your custom roadmap has been generated successfully! Go check your Dashboard." }
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev, 
        { sender: "ai", text: "⚠️ Error sending answer. Please check connection." }
      ]);
    }

    setLoading(false);
  };

  // Submit on Pressing 'Enter' key inside user message panel grid
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  return (
    <div className="chat-layout-wrapper">
      <Navbar />

      <div className="chat-window-container">
        {/* Messages Stream Viewport Area */}
        <div className="chat-messages-stream">
          {messages.map((msg, index) => (
            <div key={index} className={`message-row ${msg.sender}`}>
              <div className="message-avatar">
                {msg.sender === "ai" ? "🤖" : "👤"}
              </div>
              <div className="message-bubble-content">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator Loading Skeleton Blocks */}
          {loading && !roadmapStatus && (
            <div className="message-row ai processing">
              <div className="message-avatar">🤖</div>
              <div className="message-bubble-content loading-dots">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}

          {/* Anchor pointer reference target for window autoscrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Interface Utility Bar Area */}
        <div className="chat-input-toolbar">
          <div className="input-inner-shield">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={roadmapStatus === "completed" ? "Roadmap completed!" : "Type your answer here..."}
              className="chatgpt-input-field"
              disabled={loading || roadmapStatus === "completed"}
            />
            <button
              onClick={handleNext}
              className={`chatgpt-send-btn ${!answer.trim() || loading ? "disabled" : ""}`}
              disabled={!answer.trim() || loading || roadmapStatus === "completed"}
            >
              ➔
            </button>
          </div>
          <p className="input-footer-caption">AI Roadmap Builder can make mistakes. Verify critical concepts.</p>
        </div>
      </div>
    </div>
  );
}

export default Chat;
