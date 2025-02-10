import React from 'react';
import '../PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p className="intro-text">At GameBazzar, we are committed to protecting your privacy. This policy outlines the data we collect and how we use, disclose, and safeguard your information when you interact with our website. Please take a moment to review our practices.</p>

      <section className="privacy-section">
        <h2>1. Information We Collect</h2>
        <p>We collect the following information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Your name, email address, payment details, etc., collected during registration or purchase.</li>
          <li><strong>Non-Personal Information:</strong> Includes IP addresses, browsing behavior, and device information.</li>
          <li><strong>Cookies:</strong> We use cookies to improve user experience. You may control cookie preferences via your browser settings.</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>2. How We Use Your Information</h2>
        <p>Your information is used for the following purposes:</p>
        <ul>
          <li>To process your orders and provide customer support.</li>
          <li>To enhance website functionality and personalize user experience.</li>
          <li>To send updates, promotions, or other communications you opt into.</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>3. Data Sharing and Disclosure</h2>
        <p>We do not sell your information but may share it with trusted service providers to facilitate website operations (e.g., payment processors).</p>
      </section>

      <section className="privacy-section">
        <h2>4. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, update, or delete your personal information.</li>
          <li>Opt-out of marketing communications at any time.</li>
          <li>Control cookies through browser settings.</li>
        </ul>
      </section>

      <section className="privacy-section">
        <h2>5. Data Security</h2>
        <p>We implement strong security protocols to safeguard your data, though we cannot guarantee complete security due to inherent risks in internet data transmission.</p>
      </section>

      <section className="privacy-section">
        <h2>6. Changes to This Privacy Policy</h2>
        <p>We may update this policy from time to time. We will notify you of any changes by revising the date at the top of this page.</p>
      </section>

      <section className="privacy-section">
        <h2>7. Contact Us</h2>
        <p>If you have questions or concerns regarding this Privacy Policy, please contact us at <a href="mailto:support@yourwebsite.com">gamebazzar@gmail.com</a>.</p>
      </section>

      <section className="privacy-summary">
        <h2>Summary of Key Points</h2>
        <table className="privacy-summary-table">
          <thead>
            <tr>
              <th>Key Point</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data Collection</td>
              <td>We collect both personal and non-personal data, including your name, email, and browsing information.</td>
            </tr>
            <tr>
              <td>Use of Data</td>
              <td>Your data is used for processing orders, improving our website, and sending updates.</td>
            </tr>
            <tr>
              <td>Data Sharing</td>
              <td>Your data is not sold but may be shared with trusted partners for service purposes.</td>
            </tr>
            <tr>
              <td>Security</td>
              <td>We take extensive measures to protect your data, though internet transmission carries inherent risks.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
