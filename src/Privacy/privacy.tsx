import React from "react";
import "./PrivacyPolicy.css"; // Import the CSS file for styling

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy">
        <h1>Privacy Policy</h1>

        <section>
          <h2>1. Introduction</h2>
          <p>Supidoo values user privacy and data protection.</p>
        </section>

        <section>
          <h2>2. Information Collection</h2>
          <p>
            Supidoo collects user data, including name, email, and task
            completion data.
          </p>
        </section>

        <section>
          <h2>3. Use of Information</h2>
          <p>
            Supidoo uses data for platform improvement, user communication, and
            affiliate tracking.
          </p>
        </section>

        <section>
          <h2>4. Information Sharing</h2>
          <p>
            Supidoo shares data with affiliates and partners for task completion
            and earnings tracking.
          </p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            Supidoo implements reasonable security measures to protect user
            data.
          </p>
        </section>

        <section>
          <h2>6. User Rights</h2>
          <p>Users have the right to access, correct, and delete their data.</p>
        </section>

        <section>
          <h2>7. Changes to Privacy Policy</h2>
          <p>Supidoo reserves the right to modify this Privacy Policy.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
