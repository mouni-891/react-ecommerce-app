import "./Contact.css";

function Contact() {
  return (
    <div className="contact-wrapper">
      <div className="contact-container">

        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Have questions about your order or products? Our support team is here to help.</p>

          <p><strong>Email:</strong> support@shopmate.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p><strong>Working Hours:</strong> Mon - Sat (9AM - 6PM)</p>
        </div>

        <div className="contact-form">
          <h3>Send a Message</h3>

          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message" rows="5"></textarea>

          <button>Send Message</button>
        </div>

      </div>
    </div>
  );
}

export default Contact;
