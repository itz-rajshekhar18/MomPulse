// Dark Mode Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
} else if (savedDarkMode === null) {
    // If no preference is saved, check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
        localStorage.setItem('darkMode', 'true');
    }
}

// Toggle dark mode
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    }
});

// Listen for system dark mode changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('darkMode')) {
        if (e.matches) {
            body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.checked = false;
        }
    }
});

// Sample product data (in a real application, this would be fetched from a server)
const products = [
    {
        id: 1,
        name: "Maternity Dress",
        price: 49.99,
        category: "mom-to-be",
        image: "https://via.placeholder.com/300x400",
        description: "Comfortable and stylish maternity dress"
    },
    {
        id: 2,
        name: "Baby Onesie",
        price: 19.99,
        category: "child",
        image: "https://via.placeholder.com/300x400",
        description: "Soft and comfortable baby onesie"
    },
    {
        id: 3,
        name: "Nursing Bra",
        price: 29.99,
        category: "mother",
        image: "https://via.placeholder.com/300x400",
        description: "Supportive nursing bra"
    },
    // Add more products as needed
];

// Cart state
let cart = [];

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const categoryTabs = document.querySelectorAll('.tab-btn');

// Initialize the page
function init() {
    displayProducts(products);
    setupEventListeners();
}

// Display products in the grid
function displayProducts(productsToShow) {
    productsContainer.innerHTML = '';
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchButton.addEventListener('click', handleSearch);
    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Cart icon click
    cartIcon.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        body.classList.add('cart-open');
    });

    // Close cart
    document.querySelector('.close-cart').addEventListener('click', () => {
        cartSidebar.classList.remove('active');
        body.classList.remove('cart-open');
    });

    // Category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterProducts(tab.dataset.category);
        });
    });

    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });
}

// Handle search
function handleSearch() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Add event listeners for quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const action = e.target.dataset.action;
            updateCartItemQuantity(productId, action);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);
    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease') {
        item.quantity -= 1;
        if (item.quantity === 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }
    updateCart();
}

// Initialize the page
init();
