import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <h2 className="footer-logo">PhysiqYou</h2>

        <p className="footer-tagline">
          AI-Powered Fitness. Personalized. Smarter. Stronger.
        </p>
        <p className="footer-quote">
          “Your body can stand almost anything. It’s your mind you have to convince.”
        </p>

        <p className="footer-copy">
          © {new Date().getFullYear()} PhysiqYou • Built with AI & Passion
        </p>

      </div>

    </footer>
  );
}

export default Footer;
