// components/AdminPortal.jsx - FIXED WITH DESIGN
import React, { useState } from 'react';

const AdminPortal = ({ menuItems, updateItemPrice, addMenuItem, removeMenuItem, onLogout }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    category: 'yogurt',
    description: '',
    popular: false
  });

  const [editingPrices, setEditingPrices] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price >= 0) {
      addMenuItem(newItem.category, {
        ...newItem,
        id: Date.now(),
        popular: newItem.popular || false
      });
      setNewItem({ 
        name: '', 
        price: 0, 
        category: 'yogurt', 
        description: '',
        popular: false 
      });
    }
  };

  const handlePriceChange = (category, id, value) => {
    setEditingPrices({
      ...editingPrices,
      [`${category}-${id}`]: parseInt(value) || 0
    });
  };

  const savePrice = (category, id) => {
    const priceKey = `${category}-${id}`;
    if (editingPrices[priceKey] !== undefined) {
      updateItemPrice(category, id, editingPrices[priceKey]);
      const newEditingPrices = { ...editingPrices };
      delete newEditingPrices[priceKey];
      setEditingPrices(newEditingPrices);
    }
  };

  const categoryNames = {
    yogurt: 'Yogurts',
    parfaits: 'Parfaits',
    bakery: 'Bakery',
    snacks: 'Snacks',
    fruits: 'Fruits & Juices',
    packs: 'Health Packs'
  };

  const totalItems = Object.values(menuItems).reduce((sum, items) => sum + items.length, 0);
  const totalValue = Object.values(menuItems)
    .flat()
    .reduce((sum, item) => sum + item.price, 0);
  const popularItems = Object.values(menuItems)
    .flat()
    .filter(item => item.popular).length;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2><i className="fas fa-tachometer-alt"></i> Admin Dashboard</h2>
        <div className="dashboard-stats">
          <div className="stat-box">
            <div className="stat-value">{totalItems}</div>
            <div className="stat-label">Total Items</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">₦{totalValue.toLocaleString()}</div>
            <div className="stat-label">Total Value</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{popularItems}</div>
            <div className="stat-label">Popular Items</div>
          </div>
        </div>
      </div>

      <div className="admin-content">
        {Object.entries(menuItems).map(([category, items]) => (
          <div key={category} className="category-section">
            <h3 className="section-title">{categoryNames[category]}</h3>
            <div className="items-grid">
              {items.map(item => {
                const priceKey = `${category}-${item.id}`;
                const currentPrice = editingPrices[priceKey] !== undefined 
                  ? editingPrices[priceKey] 
                  : item.price;
                
                return (
                  <div key={item.id} className="admin-item">
                    <div className="item-header">
                      <h4>{item.name}</h4>
                      {item.popular && <span className="popular-tag">Popular</span>}
                    </div>
                    <p className="item-desc">{item.description}</p>
                    <div className="item-controls">
                      <div className="price-control">
                        <input
                          type="number"
                          value={currentPrice}
                          onChange={(e) => handlePriceChange(category, item.id, e.target.value)}
                          placeholder="Price"
                          className="price-input"
                        />
                        <button 
                          onClick={() => savePrice(category, item.id)}
                          className="save-btn"
                          disabled={editingPrices[priceKey] === undefined}
                        >
                          Save
                        </button>
                      </div>
                      <button 
                        onClick={() => removeMenuItem(category, item.id)}
                        className="remove-btn"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="add-item-section">
        <h3><i className="fas fa-plus-circle"></i> Add New Item</h3>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-row">
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              placeholder="Item Name"
              required
            />
            <input
              type="number"
              value={newItem.price}
              onChange={(e) => setNewItem({...newItem, price: parseInt(e.target.value) || 0})}
              placeholder="Price"
              required
            />
          </div>
          
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
          >
            <option value="yogurt">Yogurts</option>
            <option value="parfaits">Parfaits</option>
            <option value="bakery">Bakery</option>
            <option value="snacks">Snacks</option>
            <option value="fruits">Fruits & Juices</option>
            <option value="packs">Health Packs</option>
          </select>
          
          <textarea
            value={newItem.description}
            onChange={(e) => setNewItem({...newItem, description: e.target.value})}
            placeholder="Description"
            rows="3"
          />
          
          <div className="form-check">
            <label>
              <input
                type="checkbox"
                checked={newItem.popular}
                onChange={(e) => setNewItem({...newItem, popular: e.target.checked})}
              />
              Mark as Popular
            </label>
          </div>
          
          <button type="submit" className="submit-btn">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPortal;