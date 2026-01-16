// components/WhatsAppIntegration.jsx
import React, { useState } from 'react';

const WhatsAppIntegration = () => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiry, setInquiry] = useState('');

  const sendOrderViaWhatsApp = (orderDetails) => {
    const phone = '+2348167137498';
    const message = `New Order from Strong Delight Website:\n\n${orderDetails}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  const sendInquiry = () => {
    if (inquiry.trim()) {
      const phone = '+2348167137498';
      const message = `Inquiry from Strong Delight Website:\n\n${inquiry}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
      setInquiry('');
      setShowInquiry(false);
    }
  };

  return (
    <>
      <div className="whatsapp-float" onClick={() => setShowInquiry(true)}>
        <i className="fab fa-whatsapp"></i>
      </div>

      {showInquiry && (
        <div className="inquiry-modal">
          <div className="inquiry-content">
            <h3>Contact via WhatsApp</h3>
            <textarea
              placeholder="Type your inquiry here... You can ask about quotes, custom orders, or special requests."
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              rows="4"
            />
            <div className="inquiry-buttons">
              <button onClick={sendInquiry} className="send-btn">
                Send Inquiry
              </button>
              <button onClick={() => setShowInquiry(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppIntegration;