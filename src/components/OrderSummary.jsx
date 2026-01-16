// components/OrderSummary.jsx
import React, { useState } from 'react';
import WhatsAppIntegration from './WhatsAppIntegration';

const OrderSummary = ({ orderDetails, onClose, cart, removeFromCart }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDate: ''
  });

  const formatOrderForWhatsApp = () => {
    let orderText = `*NEW ORDER - STRONG DELIGHT*\n\n`;
    orderText += `*Customer Information:*\n`;
    orderText += `Name: ${customerInfo.name}\n`;
    orderText += `Phone: ${customerInfo.phone}\n`;
    orderText += `Address: ${customerInfo.address}\n`;
    orderText += `Preferred Delivery: ${customerInfo.deliveryDate}\n\n`;
    
    orderText += `*Order Items:*\n`;
    cart.forEach((item, index) => {
      orderText += `${index + 1}. ${item.name} - ₦${item.price.toLocaleString()}\n`;
    });
    
    orderText += `\n*Total Amount:* ₦${orderDetails.total.toLocaleString()}\n\n`;
    orderText += `*Note:* ${orderDetails.deliveryNote}`;
    
    return orderText;
  };

  const submitOrder = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Please fill in all required customer information');
      return;
    }

    const orderText = formatOrderForWhatsApp();
    const phone = '+2348167137498';
    const encodedMessage = encodeURIComponent(orderText);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
    onClose();
  };

  return (
    <div className="order-summary-modal">
      <div className="order-summary-content">
        <button onClick={onClose} className="close-modal">×</button>
        
        <h2>Order Summary</h2>
        
        <div className="cart-items">
          <h3>Selected Items ({cart.length})</h3>
          {cart.map(item => (
            <div key={item.cartId} className="cart-item">
              <span>{item.name}</span>
              <div className="cart-item-actions">
                <span>₦{item.price.toLocaleString()}</span>
                <button onClick={() => removeFromCart(item.cartId)} className="remove-item">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="total-section">
          <h3>Total: ₦{orderDetails.total?.toLocaleString()}</h3>
          <p className="delivery-note">{orderDetails.deliveryNote}</p>
        </div>

        <div className="customer-info">
          <h3>Customer Information</h3>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Delivery Address *</label>
            <textarea
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
              placeholder="Enter complete delivery address"
              rows="2"
              required
            />
          </div>
          <div className="form-group">
            <label>Preferred Delivery Date</label>
            <input
              type="date"
              value={customerInfo.deliveryDate}
              onChange={(e) => setCustomerInfo({...customerInfo, deliveryDate: e.target.value})}
              min={new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString().split('T')[0]}
            />
            <small>Minimum 48 hours from now</small>
          </div>
        </div>

        <div className="order-actions">
          <button onClick={submitOrder} className="submit-order-btn">
            Submit Order via WhatsApp
          </button>
          <button onClick={onClose} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;