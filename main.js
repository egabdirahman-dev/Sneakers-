// WoolTech E-commerce Site - Main JavaScript
// Handles shopping cart, product filtering, animations, and interactions

class WoolTechApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('wooltech-cart')) || [];
        this.products = this.initializeProducts();
        this.filters = {
            category: 'all',
            size: null,
            price: 200,
            color: null
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateCartUI();
        this.initializeAnimations();
        
        // Page-specific initialization
        if (document.getElementById('products-grid')) {
            this.initializeProductsPage();
        }
        
        if (document.getElementById('performance-chart')) {
            this.initializeCharts();
        }
        
        if (document.getElementById('hero-text')) {
            this.initializeTypewriter();
        }
    }
    
    initializeProducts() {
        return [
            {
                id: 1,
                name: 'Urban Runner Pro',
                price: 149,
                category: 'running',
                image: 'resources/product-1.jpg',
                colors: ['black', 'white', 'gray'],
                sizes: [8, 9, 10, 11, 12],
                description: 'Premium merino wool running shoes with advanced breathability and comfort technology.'
            },
            {
                id: 2,
                name: 'City Walker',
                price: 129,
                category: 'casual',
                image: 'resources/product-2.jpg',
                colors: ['brown', 'white', 'gray'],
                sizes: [7, 8, 9, 10, 11],
                description: 'Stylish casual sneakers perfect for urban exploration and everyday comfort.'
            },
            {
                id: 3,
                name: 'Trail Blazer',
                price: 169,
                category: 'hiking',
                image: 'resources/product-3.jpg',
                colors: ['brown', 'green', 'black'],
                sizes: [8, 9, 10, 11, 12],
                description: 'Rugged hiking shoes with natural wool insulation and superior grip.'
            },
            {
                id: 4,
                name: 'Lifestyle Classic',
                price: 139,
                category: 'lifestyle',
                image: 'resources/product-5.jpg',
                colors: ['white', 'gray', 'blue'],
                sizes: [7, 8, 9, 10, 11],
                description: 'Timeless design meets modern wool technology for ultimate style and comfort.'
            },
            {
                id: 5,
                name: 'Speed Racer',
                price: 159,
                category: 'running',
                image: 'resources/product-6.jpg',
                colors: ['black', 'white', 'blue'],
                sizes: [8, 9, 10, 11, 12],
                description: 'High-performance running shoes with advanced wool ventilation system.'
            },
            {
                id: 6,
                name: 'Weekend Wanderer',
                price: 119,
                category: 'casual',
                image: 'resources/product-7.jpg',
                colors: ['brown', 'white', 'gray'],
                sizes: [7, 8, 9, 10, 11],
                description: 'Comfortable casual shoes designed for everyday adventures and relaxed wear.'
            },
            {
                id: 7,
                name: 'Mountain Trek',
                price: 179,
                category: 'hiking',
                image: 'resources/product-8.jpg',
                colors: ['brown', 'green', 'black'],
                sizes: [8, 9, 10, 11, 12],
                description: 'Premium hiking boots with reinforced wool construction and ankle support.'
            },
            {
                id: 8,
                name: 'Urban Explorer',
                price: 149,
                category: 'lifestyle',
                image: 'resources/product-9.jpg',
                colors: ['gray', 'blue', 'black'],
                sizes: [7, 8, 9, 10, 11],
                description: 'Versatile lifestyle shoes that transition seamlessly from work to weekend.'
            },
            {
                id: 9,
                name: 'Daily Driver',
                price: 129,
                category: 'casual',
                image: 'resources/product-10.jpg',
                colors: ['white', 'brown', 'gray'],
                sizes: [7, 8, 9, 10, 11],
                description: 'Your go-to everyday shoe with exceptional comfort and durability.'
            },
            {
                id: 10,
                name: 'Performance Plus',
                price: 169,
                category: 'running',
                image: 'resources/product-11.jpg',
                colors: ['blue', 'black', 'white'],
                sizes: [8, 9, 10, 11, 12],
                description: 'Elite running shoes with maximum cushioning and energy return.'
            },
            {
                id: 11,
                name: 'Nature Walk',
                price: 139,
                category: 'casual',
                image: 'resources/product-12.jpg',
                colors: ['green', 'brown', 'gray'],
                sizes: [7, 8, 9, 10, 11],
                description: 'Eco-friendly casual shoes inspired by nature and crafted for comfort.'
            },
            {
                id: 12,
                name: 'Tech Runner',
                price: 159,
                category: 'running',
                image: 'resources/product-1.jpg',
                colors: ['black', 'orange', 'white'],
                sizes: [8, 9, 10, 11, 12],
                description: 'Advanced running shoes featuring our latest wool technology and design innovation.'
            }
        ];
    }
    
    setupEventListeners() {
        // Shopping Cart
        const cartBtn = document.getElementById('cart-btn');
        const closeCart = document.getElementById('close-cart');
        const cartBackdrop = document.getElementById('cart-backdrop');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        if (cartBtn) cartBtn.addEventListener('click', () => this.toggleCart(true));
        if (closeCart) closeCart.addEventListener('click', () => this.toggleCart(false));
        if (cartBackdrop) cartBackdrop.addEventListener('click', () => this.toggleCart(false));
        if (checkoutBtn) checkoutBtn.addEventListener('click', () => this.handleCheckout());
        
        // Product interactions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const product = e.target.dataset.product;
                const price = parseInt(e.target.dataset.price);
                const size = this.getSelectedSize(e.target.closest('.product-card'));
                this.addToCart(product, price, size);
            }
            
            if (e.target.classList.contains('size-btn')) {
                this.selectSize(e.target);
            }
            
            if (e.target.classList.contains('remove-item')) {
                const index = parseInt(e.target.dataset.index);
                this.removeFromCart(index);
            }
            
            if (e.target.classList.contains('quantity-btn')) {
                const index = parseInt(e.target.dataset.index);
                const change = e.target.dataset.change === 'increase' ? 1 : -1;
                this.updateQuantity(index, change);
            }
        });
        
        // Filters
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                this.handleFilterClick(e.target);
            }
            
            if (e.target.classList.contains('size-filter')) {
                this.handleSizeFilter(e.target);
            }
            
            if (e.target.classList.contains('color-swatch')) {
                this.handleColorFilter(e.target);
            }
            
            if (e.target.id === 'clear-filters') {
                this.clearFilters();
            }
        });
        
        // Price slider
        const priceSlider = document.getElementById('price-slider');
        if (priceSlider) {
            priceSlider.addEventListener('input', (e) => {
                this.handlePriceFilter(e.target.value);
            });
        }
    }
    
    initializeProductsPage() {
        this.renderProducts();
        this.initializeFilters();
    }
    
    renderProducts(products = null) {
        const productsToRender = products || this.getFilteredProducts();
        const grid = document.getElementById('products-grid');
        const noResults = document.getElementById('no-results');
        
        if (!grid) return;
        
        if (productsToRender.length === 0) {
            grid.innerHTML = '';
            if (noResults) noResults.classList.remove('hidden');
            return;
        }
        
        if (noResults) noResults.classList.add('hidden');
        
        grid.innerHTML = productsToRender.map(product => `
            <div class="product-card rounded-2xl p-6 scroll-reveal">
                <div class="aspect-square mb-4 overflow-hidden rounded-xl">
                    <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
                </div>
                <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <div class="mb-4">
                    <p class="text-sm text-gray-500 mb-2">Select Size:</p>
                    <div class="flex gap-2">
                        ${product.sizes.map(size => `
                            <button class="size-btn px-3 py-1 rounded-lg text-sm font-medium" data-size="${size}">${size}</button>
                        `).join('')}
                    </div>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold">$${product.price}</span>
                    <button class="add-to-cart btn-primary px-6 py-2 rounded-lg font-medium" data-product="${product.name}" data-price="${product.price}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
        
        // Re-initialize scroll reveal animations
        this.initializeScrollReveal();
    }
    
    getFilteredProducts() {
        return this.products.filter(product => {
            // Category filter
            if (this.filters.category !== 'all' && product.category !== this.filters.category) {
                return false;
            }
            
            // Size filter
            if (this.filters.size && !product.sizes.includes(parseInt(this.filters.size))) {
                return false;
            }
            
            // Price filter
            if (product.price > this.filters.price) {
                return false;
            }
            
            // Color filter
            if (this.filters.color && !product.colors.includes(this.filters.color)) {
                return false;
            }
            
            return true;
        });
    }
    
    handleFilterClick(button) {
        // Update active state
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update filter
        this.filters.category = button.dataset.filter;
        this.renderProducts();
    }
    
    handleSizeFilter(button) {
        // Toggle size selection
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            this.filters.size = null;
        } else {
            document.querySelectorAll('.size-filter').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            this.filters.size = button.dataset.size;
        }
        
        this.renderProducts();
    }
    
    handleColorFilter(swatch) {
        // Toggle color selection
        if (swatch.classList.contains('selected')) {
            swatch.classList.remove('selected');
            this.filters.color = null;
        } else {
            document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
            swatch.classList.add('selected');
            this.filters.color = swatch.dataset.color;
        }
        
        this.renderProducts();
    }
    
    handlePriceFilter(value) {
        this.filters.price = parseInt(value);
        document.getElementById('price-value').textContent = value;
        this.renderProducts();
    }
    
    clearFilters() {
        // Reset all filters
        this.filters = {
            category: 'all',
            size: null,
            price: 200,
            color: null
        };
        
        // Reset UI
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
        document.querySelectorAll('.size-filter').forEach(btn => btn.classList.remove('selected'));
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
        
        const priceSlider = document.getElementById('price-slider');
        if (priceSlider) {
            priceSlider.value = 200;
            document.getElementById('price-value').textContent = '200';
        }
        
        this.renderProducts();
    }
    
    selectSize(button) {
        const productCard = button.closest('.product-card');
        productCard.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
    }
    
    getSelectedSize(productCard) {
        const selectedBtn = productCard.querySelector('.size-btn.selected');
        return selectedBtn ? selectedBtn.dataset.size : null;
    }
    
    addToCart(product, price, size) {
        if (!size) {
            this.showNotification('Please select a size', 'warning');
            return;
        }
        
        const existingItem = this.cart.find(item => 
            item.product === product && item.size === size
        );
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                product,
                price,
                size,
                quantity: 1,
                id: Date.now()
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showNotification(`${product} added to cart!`, 'success');
        
        // Animate cart icon
        this.animateCartIcon();
    }
    
    removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCart();
        this.updateCartUI();
    }
    
    updateQuantity(index, change) {
        const item = this.cart[index];
        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeFromCart(index);
        } else {
            this.saveCart();
            this.updateCartUI();
        }
    }
    
    toggleCart(show) {
        const sidebar = document.getElementById('cart-sidebar');
        const backdrop = document.getElementById('cart-backdrop');
        
        if (show) {
            sidebar.classList.remove('translate-x-full');
            backdrop.classList.remove('hidden');
        } else {
            sidebar.classList.add('translate-x-full');
            backdrop.classList.add('hidden');
        }
    }
    
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const checkoutBtn = document.getElementById('checkout-btn');
        
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Update cart count
        if (cartCount) {
            if (totalItems > 0) {
                cartCount.textContent = totalItems;
                cartCount.classList.remove('hidden');
            } else {
                cartCount.classList.add('hidden');
            }
        }
        
        // Update cart items
        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="text-center text-gray-500 py-12">
                        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
                        </svg>
                        <p>Your cart is empty</p>
                    </div>
                `;
            } else {
                cartItems.innerHTML = this.cart.map((item, index) => `
                    <div class="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        <div class="flex-1">
                            <h4 class="font-semibold text-sm">${item.product}</h4>
                            <p class="text-xs text-gray-500">Size: ${item.size}</p>
                            <p class="text-sm font-bold text-sage">$${item.price}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button class="quantity-btn w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs" data-index="${index}" data-change="decrease">-</button>
                            <span class="w-8 text-center text-sm">${item.quantity}</span>
                            <button class="quantity-btn w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs" data-index="${index}" data-change="increase">+</button>
                        </div>
                        <button class="remove-item text-red-500 hover:text-red-700" data-index="${index}">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                `).join('');
            }
        }
        
        // Update total
        if (cartTotal) {
            cartTotal.textContent = `$${totalPrice}`;
        }
        
        // Update checkout button
        if (checkoutBtn) {
            checkoutBtn.disabled = this.cart.length === 0;
        }
    }
    
    handleCheckout() {
        if (this.cart.length === 0) return;
        
        // Simulate checkout process
        this.showNotification('Redirecting to checkout...', 'info');
        
        setTimeout(() => {
            alert('Checkout functionality would be implemented here. Thank you for shopping with WoolTech!');
        }, 1000);
    }
    
    saveCart() {
        localStorage.setItem('wooltech-cart', JSON.stringify(this.cart));
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-24 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
        
        // Set colors based on type
        const colors = {
            success: 'bg-green-500 text-white',
            warning: 'bg-yellow-500 text-white',
            error: 'bg-red-500 text-white',
            info: 'bg-sage text-white'
        };
        
        notification.className += ` ${colors[type] || colors.info}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    animateCartIcon() {
        const cartBtn = document.getElementById('cart-btn');
        if (cartBtn) {
            cartBtn.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartBtn.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    initializeAnimations() {
        this.initializeScrollReveal();
        this.initializeTypewriter();
    }
    
    initializeScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, delay);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.scroll-reveal, .timeline-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    initializeTypewriter() {
        const heroText = document.getElementById('hero-text');
        if (heroText && typeof Typed !== 'undefined') {
            new Typed('#hero-text', {
                strings: ['Meets Urban Tech', 'Meets Modern Design', 'Meets Sustainable Innovation'],
                typeSpeed: 80,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            });
        }
    }
    
    initializeCharts() {
        if (typeof echarts === 'undefined') return;
        
        // Performance comparison chart
        const performanceChart = document.getElementById('performance-chart');
        if (performanceChart) {
            const chart = echarts.init(performanceChart);
            
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['Merino Wool', 'Synthetic Materials']
                },
                xAxis: {
                    type: 'category',
                    data: ['Temperature Regulation', 'Moisture Wicking', 'Odor Resistance', 'Comfort', 'Durability']
                },
                yAxis: {
                    type: 'value',
                    max: 100
                },
                series: [
                    {
                        name: 'Merino Wool',
                        type: 'bar',
                        data: [95, 92, 90, 96, 85],
                        itemStyle: {
                            color: '#A8B5A0'
                        }
                    },
                    {
                        name: 'Synthetic Materials',
                        type: 'bar',
                        data: [60, 75, 45, 70, 90],
                        itemStyle: {
                            color: '#B8B2A7'
                        }
                    }
                ]
            };
            
            chart.setOption(option);
        }
        
        // Sustainability chart
        const sustainabilityChart = document.getElementById('sustainability-chart');
        if (sustainabilityChart) {
            const chart = echarts.init(sustainabilityChart);
            
            const option = {
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        name: 'Environmental Impact',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 40, name: 'Renewable Materials', itemStyle: { color: '#A8B5A0' } },
                            { value: 25, name: 'Carbon Offset', itemStyle: { color: '#D4C4B0' } },
                            { value: 20, name: 'Recycled Packaging', itemStyle: { color: '#E8DCC6' } },
                            { value: 15, name: 'Local Sourcing', itemStyle: { color: '#B8B2A7' } }
                        ]
                    }
                ]
            };
            
            chart.setOption(option);
        }
    }
    
    initializeFilters() {
        // Initialize price slider
        const priceSlider = document.getElementById('price-slider');
        if (priceSlider) {
            priceSlider.value = this.filters.price;
            document.getElementById('price-value').textContent = this.filters.price;
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WoolTechApp();
});

// Handle page-specific functionality
window.addEventListener('load', () => {
    // Initialize any page-specific animations or interactions
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'story.html' || currentPage === '') {
        // Additional story page animations
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('revealed');
            }, index * 200);
        });
    }
});

// Utility functions for enhanced interactions
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            smoothScrollTo(target);
        }
    }
});

// Add loading states for better UX
function showLoading(element) {
    element.classList.add('loading');
    element.disabled = true;
}

function hideLoading(element) {
    element.classList.remove('loading');
    element.disabled = false;
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WoolTechApp;
}