// components/MenuDisplay.jsx - Fixed
import React from 'react';

const MenuDisplay = ({ menuItems, addToCart, activeCategory, onCategoryChange }) => {
  const categories = [
    { key: 'yogurt', title: 'Yogurts', icon: '🥛' },
    { key: 'parfaits', title: 'Parfaits', icon: '🥣' },
    { key: 'bakery', title: 'Bakery', icon: '🍰' },
    { key: 'snacks', title: 'Snacks', icon: '🍢' },
    { key: 'fruits', title: 'Fruits & Juices', icon: '🍓' },
    { key: 'packs', title: 'Health Packs', icon: '📦' }
  ];

  const getFilteredItems = () => {
    if (activeCategory === 'all') {
      return Object.values(menuItems).flat();
    }
    
    if (activeCategory === 'popular') {
      return Object.values(menuItems)
        .flat()
        .filter(item => item.popular);
    }
    
    if (menuItems[activeCategory]) {
      return menuItems[activeCategory];
    }
    
    return Object.values(menuItems).flat();
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Premium Menu</h1>
        <p>Discover delicious, health-focused products for your wellbeing</p>
      </div>

      <div className="category-tabs">
        <button 
          className={`tab-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onCategoryChange('all')}
        >
          All Items
        </button>
        {categories.map(({ key, title }) => (
          <button 
            key={key}
            className={`tab-btn ${activeCategory === key ? 'active' : ''}`}
            onClick={() => onCategoryChange(key)}
          >
            {title}
          </button>
        ))}
        <button 
          className={`tab-btn ${activeCategory === 'popular' ? 'active' : ''}`}
          onClick={() => onCategoryChange('popular')}
        >
          Popular Items
        </button>
      </div>

      <div className="menu-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="menu-card">
            {item.popular && <div className="popular-badge">Popular</div>}
            <div className="card-header">
              <h3>{item.name}</h3>
              <div className="price">₦{item.price.toLocaleString()}</div>
            </div>
            <p className="description">{item.description}</p>
            {item.tag && <div className="tag">{item.tag}</div>}
            <button 
              onClick={() => addToCart(item)}
              className="add-btn"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="empty-state">
          <p>No items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default MenuDisplay;