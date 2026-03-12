
import { useEffect, useState } from "react";
import "./FAQ.css";

export default function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is PhysiqYou?",
      answer:
        "PhysiqYou is a fitness tracking application that helps you monitor your calories, workouts, and weight progress. It allows you to track daily food intake, log workouts, and visualize your progress over time."
    },
    {
      question: "How do I track my daily calories?",
      answer:
        "You can track your calories by navigating to the Food Log page and adding the meals you consumed. The app automatically calculates the total calories for the day."
    },
    {
      question: "How do I log my workouts?",
      answer:
        "Go to the Workout Log page and enter the exercise name, sets, reps, and calories burned. This helps you keep track of your physical activity."
    },
    {
      question: "How does weight tracking work?",
      answer:
        "You can update your current weight on the Update Weight page. The app stores your weight history and displays progress graphs to show your improvement."
    },
    {
      question: "Can I see my weekly progress?",
      answer:
        "Yes. The Progress page shows daily, weekly, and overall goal progress using charts and graphs."
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. Your data is stored securely in the backend database and only accessible through your authenticated account."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page">

      <div className="faq-container">

        <div className="faq-hero">
          <h1>Frequently Asked Questions</h1>
          <p>
            Find answers to common questions about using PhysiqYou.
          </p>
        </div>

        <div className="faq-list">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className={`faq-card ${openIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >

              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span>{openIndex === index ? "-" : "+"}</span>
              </div>

              {openIndex === index && (
                <p className="faq-answer">{faq.answer}</p>
              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}