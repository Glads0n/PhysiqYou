import { useState, useEffect } from "react";
import api from "../api/axios";
import "./Feedback.css";

export default function Feedback() {

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [feedback, setFeedback] = useState("");

  const sendFeedback = async (e) => {

    e.preventDefault();

    try {

      await api.post("send-feedback/", {
        message: feedback
      });

      alert("Feedback sent successfully!");

      setFeedback("");

    } catch (err) {
      console.error(err);
      alert("Failed to send feedback");
    }
  };

  return (

    <div className="feedback-page">

      <div className="feedback-container">

        <div className="feedback-hero">

          <h1>Send Feedback</h1>

          <p>
            Your feedback helps us improve PhysiqYou.
          </p>

        </div>


        <div className="glass-card">

          <h3>Write your feedback</h3>

          <form onSubmit={sendFeedback}>

            <textarea
              placeholder="Write your feedback here..."
              value={feedback}
              onChange={(e)=> setFeedback(e.target.value)}
              required
            />

            <button type="submit">
              Send Feedback
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}