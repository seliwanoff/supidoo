import React from "react";
import "./TermsAndConditions.css"; // Import the CSS file for styling

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1>Terms and Conditions</h1>

        <section>
          <h2>1. Introduction</h2>
          <p>Welcome to Supidoo, a merchandise and affiliate platform.</p>
          <p>By registering, users agree to these Terms and Conditions.</p>
        </section>

        <section>
          <h2>2. User Agreement</h2>
          <p>Users must be at least 18 years old.</p>
          <p>Users are responsible for their account security and activity.</p>
        </section>

        <section>
          <h2>3. Intellectual Property Rights</h2>
          <p>
            Supidoo owns all platform content, except for user-generated
            content.
          </p>
          <p>
            Users retain ownership of their content, but grant Supidoo usage
            rights.
          </p>
        </section>

        <section>
          <h2>4. User Conduct</h2>
          <p>Users must comply with all applicable laws and regulations.</p>
          <p>
            Prohibited activities include spamming, harassment, and illegal
            activities.
          </p>
        </section>

        <section>
          <h2>5. Earnings and Payments</h2>
          <p>
            Supidoo will pay users for completed tasks and affiliate earnings.
          </p>
          <p>Payment terms and conditions apply.</p>
        </section>

        <section>
          <h2>5. Withdrawal Terms</h2>
          <p>
            Complete 30 consecutive days daily check-ins or refer 6 new users
            within 30 days to withdraw.
          </p>
          <p>
            Minimum withdrawal: N50,000; Maximum withdrawal: N500,000; once per
            week.
          </p>
          <p>No fees: Supidoo is not liable for bank information errors</p>
        </section>
        {/**
        <section>
          <h2>6. Digital Products</h2>
          <p>
            Supidoo sells digital products, such as ebooks, through the
            platform.
          </p>
          <p>Users agree to the terms of sale and usage rights.</p>
        </section>
        */}

        <section>
          <h2>7. Disclaimers and Limitation of Liability</h2>
          <p>
            Supidoo disclaims warranties and liabilities for user activities.
          </p>
          <p>Supidoo's liability is limited to the extent permitted by law.</p>
        </section>

        <section>
          <h2>8. Governing Law and Jurisdiction</h2>
          <p>These Terms and Conditions are governed by [State/Country] law.</p>
          <p>Disputes will be resolved through [dispute resolution process].</p>
        </section>

        <section>
          <h2>9. Changes to Terms and Conditions</h2>
          <p>
            Supidoo reserves the right to modify these Terms and Conditions.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
