// App.jsx - Updated with working cart and checkout
import React, { useState, useEffect } from 'react';
import './App.css';
import AdminPortal from './components/AdminPortal';
import MenuDisplay from './components/MenuDisplay';
import WhatsAppIntegration from './components/WhatsAppIntegration';
import OrderSummary from './components/OrderSummary';
import LoginModal from './components/LoginModal';

const App = () => {
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('strongDelightMenu');
    return saved ? JSON.parse(saved) : {
      yogurt: [
        { id: 1, name: 'Drinking Yogurt', price: 2200, category: 'yogurt', description: 'Refreshing probiotic drink packed with live cultures', popular: true },
        { id: 2, name: 'Fura Yogurt', price: 2300, category: 'yogurt', description: 'Traditional millet balls served with creamy yogurt', popular: false },
        { id: 3, name: 'Greek Yogurt', price: 2500, category: 'yogurt', description: 'Thick, protein-rich yogurt with strained consistency', popular: true }
      ],
      parfaits: [
        { id: 4, name: 'Yogurt Parfait', price: 2800, category: 'parfait', description: 'Layered yogurt with fresh fruits and homemade granola', popular: true },
        { id: 5, name: 'Cake Parfait', price: 3200, category: 'parfait', description: 'Layered cake with premium cream and seasonal toppings', popular: false }
      ],
      bakery: [
        { id: 6, name: 'Premium Granola', price: 1800, category: 'bakery', description: 'Homemade crunchy granola with nuts and honey', popular: true },
        { id: 7, name: 'Cake Slices', price: 1500, category: 'bakery', description: 'Assorted premium cake slices daily selection', popular: true },
        { id: 8, name: 'Custom Cake', price: 0, category: 'bakery', description: 'Customized celebration cakes (price on consultation)', popular: false }
      ],
      snacks: [
        { id: 9, name: 'Small Chops Platter', price: 2500, category: 'snacks', description: 'Assorted bite-sized Nigerian snacks assortment', popular: true },
        { id: 10, name: 'Frozen Chops Pack', price: 3000, category: 'snacks', description: 'Prepared frozen snacks ready for frying', popular: false }
      ],
      fruits: [
        { id: 11, name: 'Fresh Fruit Juice', price: 1200, category: 'fruits', description: 'Freshly squeezed seasonal fruit juice', popular: true },
        { id: 12, name: 'Premium Fruit Salad', price: 2000, category: 'fruits', description: 'Mixed fresh fruit salad with special dressing', popular: true },
        { id: 13, name: 'Complete Food Pack', price: 3500, category: 'fruits', description: 'Balanced meal pack with fruits and snacks', popular: false }
      ],
      packs: [
        { id: 14, name: 'Daily Health Pack', price: 3500, category: 'pack', description: '7 bottles/week (₦500 per bottle), perfect for daily consumption', popular: true, tag: 'Most Popular' },
        { id: 15, name: 'Family Starter Pack', price: 7000, category: 'pack', description: '14 bottles (2 weeks supply) for families', popular: false },
        { id: 16, name: 'Yogurt Drink Pack', price: 27600, category: 'pack', description: '12 bottles pack (₦2,200 per bottle) bulk savings', popular: false }
      ]
    };
  });

  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  // Save menu to localStorage
  useEffect(() => {
    localStorage.setItem('strongDelightMenu', JSON.stringify(menuItems));
  }, [menuItems]);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1, cartId: Date.now() }]);
    }
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, delta) => {
    const newCart = cart.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = item.quantity + delta;
        if (newQuantity < 1) {
          return null; // Will be filtered out
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean);
    
    setCart(newCart);
  };

  const updateItemPrice = (category, id, newPrice) => {
    setMenuItems(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, price: newPrice } : item
      )
    }));
  };

  const addMenuItem = (category, newItem) => {
    setMenuItems(prev => ({
      ...prev,
      [category]: [...prev[category], { ...newItem, id: Date.now() }]
    }));
  };

  const removeMenuItem = (category, id) => {
    setMenuItems(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  const handleAdminLogin = (password) => {
    if (password === 'strongdelight2026') {
      setIsAdmin(true);
      setShowLogin(false);
      return true;
    }
    return false;
  };

  const prepareOrder = () => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setOrderDetails({
      items: cart,
      total,
      orderDate: new Date().toISOString(),
      deliveryNote: 'Please deliver 48 hours after order confirmation'
    });
    setShowOrderSummary(true);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Function to open cart
  const openCart = () => {
    if (cart.length > 0) {
      prepareOrder();
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo-section">
            <div className="logo-circle">
              <div className="logo-text">
                <span className="logo-main">SD</span>
              </div>
              <div className="logo-glow"></div>
            </div>
            <div className="brand">
              <h1 className="brand-name">STRONG DELIGHT</h1>
              <p className="brand-tagline">GOOD HEALTH, GOOD LIFE</p>
            </div>
          </div>

          {!isAdmin ? (
            <>
              <nav className="navigation">
                <button 
                  className={`nav-item ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('all')}
                >
                  All Items
                </button>
                <button 
                  className={`nav-item ${activeCategory === 'yogurt' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('yogurt')}
                >
                  Yogurts
                </button>
                <button 
                  className={`nav-item ${activeCategory === 'parfaits' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('parfaits')}
                >
                  Parfaits
                </button>
                <button 
                  className={`nav-item ${activeCategory === 'bakery' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('bakery')}
                >
                  Bakery
                </button>
                <button 
                  className={`nav-item ${activeCategory === 'packs' ? 'active' : ''}`}
                  onClick={() => handleCategoryChange('packs')}
                >
                  Health Packs
                </button>
              </nav>

              <div className="header-actions">
                <div className="cart" onClick={openCart} style={{ cursor: cart.length > 0 ? 'pointer' : 'default' }}>
                  <div className="cart-icon">
                    <i className="fas fa-shopping-basket"></i>
                    {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                  </div>
                  <div className="cart-info">
                    <span className="cart-label">Cart</span>
                    <span className="cart-total">₦{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
                <button 
                  className="admin-btn" 
                  onClick={() => setShowLogin(true)}
                  title="Owner Login"
                >
                  <i className="fas fa-lock"></i>
                </button>
              </div>
            </>
          ) : (
            <div className="admin-header">
              <div className="admin-info">
                <i className="fas fa-user-shield"></i>
                <span>Admin Dashboard</span>
              </div>
              <button 
                className="logout-btn"
                onClick={() => setIsAdmin(false)}
              >
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Notice */}
      <div className="notice-bar">
        <i className="fas fa-clock"></i>
        <span>All orders must be placed 48 hours prior to delivery</span>
      </div>

      <main className="main">
        {isAdmin ? (
          <AdminPortal 
            menuItems={menuItems}
            updateItemPrice={updateItemPrice}
            addMenuItem={addMenuItem}
            removeMenuItem={removeMenuItem}
            onLogout={() => setIsAdmin(false)}
          />
        ) : (
          <MenuDisplay 
            menuItems={menuItems} 
            addToCart={addToCart}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        )}
      </main>

      {/* Fixed Order Button - NOW WORKING */}
      {cart.length > 0 && !isAdmin && (
        <div className="floating-cart">
          <button className="checkout-btn" onClick={prepareOrder}>
            <i className="fas fa-shopping-cart"></i>
            <span>Checkout ({cart.length})</span>
            <span className="checkout-total">₦{cartTotal.toLocaleString()}</span>
          </button>
        </div>
      )}

      {/* Modals */}
      {showLogin && (
        <LoginModal 
          onLogin={handleAdminLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showOrderSummary && (
        <OrderSummary 
          orderDetails={orderDetails}
          onClose={() => setShowOrderSummary(false)}
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          cartTotal={cartTotal}
        />
      )}

      {/* WhatsApp Integration */}
      {!isAdmin && <WhatsAppIntegration cart={cart} cartTotal={cartTotal} />}

      {/* Footer */}
      {!isAdmin && (
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-circle small">
                  <div className="logo-text">
                    <span className="logo-main">SD</span>
                  </div>
                </div>
                <div className="footer-brand">
                  <h3>STRONG DELIGHT</h3>
                  <p className="footer-tagline">Good Health, Good Life</p>
                </div>
              </div>
              <p className="footer-description">
                Premium health and wellness products crafted for your best life.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <a href="#" onClick={() => handleCategoryChange('all')}>All Products</a>
              <a href="#" onClick={() => handleCategoryChange('popular')}>Popular Items</a>
              <a href="#" onClick={() => handleCategoryChange('packs')}>Health Packs</a>
              <a href="#" onClick={() => setShowLogin(true)}>Owner Login</a>
            </div>

            <div className="footer-section">
              <h4>Contact Info</h4>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+234 816 713 7498</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>augustineblessingibeh@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Order 48hrs before delivery</span>
              </div>
            </div>

            <div className="footer-section">
              <h4>Business Hours</h4>
              <div className="hours-item">
                <span>Monday - Friday</span>
                <span>8:00 AM - 8:00 PM</span>
              </div>
              <div className="hours-item">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-item">
                <span>Sunday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Strong Delight. All rights reserved.</p>
            <p className="footer-note">Crafted with <i className="fas fa-heart"></i> for good health</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;