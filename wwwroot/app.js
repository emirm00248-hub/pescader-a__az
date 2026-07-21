// Estado de la Aplicación
let products = [];
let cart = JSON.parse(localStorage.getItem('pescaderia_cart')) || [];

// Configuración de la API
const API_URL = window.location.origin;

// Catálogo de Productos Local (Respaldo para GitHub Pages sin backend)
const LOCAL_PRODUCTS = [
    {
        id: "1",
        name: "Pescado Empanizado (Orden)",
        description: "Incluye pescado empanizado acompañado de arroz, frijol, tortillas y guarnición.",
        price: 120,
        category: "Platillos",
        weight: "Orden",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: true,
        offerPrice: 100,
        ingredients: ["Filete de pescado", "Pan molido", "Especias", "Arroz", "Frijoles", "Tortillas"],
        preparationTime: "15 min",
        origin: "Mérida, Yucatán"
    },
    {
        id: "2",
        name: "Pescado Empanizado (Media Orden)",
        description: "Incluye arroz, frijol, tortillas y guarnición. Una porción menor de pescado.",
        price: 90,
        category: "Platillos",
        weight: "Media Orden",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Filete de pescado", "Pan molido", "Arroz", "Frijoles", "Tortillas"],
        preparationTime: "12 min",
        origin: "Mérida, Yucatán"
    },
    {
        id: "3",
        name: "Camarón Empanizado (Orden)",
        description: "Incluye camarones empanizados de primera, arroz, frijol, tortillas y guarnición.",
        price: 170,
        category: "Platillos",
        weight: "Orden",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: true,
        offerPrice: 150,
        ingredients: ["Camarón fresco", "Empanizador", "Arroz", "Frijoles", "Tortillas", "Ensalada"],
        preparationTime: "18 min",
        origin: "Campeche, México"
    },
    {
        id: "4",
        name: "Camarón Empanizado (Media Orden)",
        description: "Incluye arroz, frijol, tortillas y guarnición. Porción menor de camarones.",
        price: 120,
        category: "Platillos",
        weight: "Media Orden",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Camarón fresco", "Empanizador", "Arroz", "Frijoles", "Tortillas"],
        preparationTime: "15 min",
        origin: "Campeche, México"
    },
    {
        id: "5",
        name: "Cóctel de Camarón (Copa)",
        description: "Cóctel preparado de camarón fresco con salsa especial de la casa, cilantro, cebolla y aguacate.",
        price: 160,
        category: "Platillos",
        weight: "Copa",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Camarón cocido", "Salsa coctelera", "Aguacate", "Cebolla", "Cilantro"],
        preparationTime: "10 min",
        origin: "Yucatán"
    },
    {
        id: "6",
        name: "Cazón Frito (Orden)",
        description: "Orden de cazón frito tradicional. Disponible únicamente miércoles y viernes.",
        price: 110,
        category: "Platillos",
        weight: "Orden",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: true,
        offerPrice: 95,
        ingredients: ["Cazón fresco", "Aceite vegetal", "Especias", "Acompañamientos"],
        preparationTime: "20 min",
        origin: "Golfo de México"
    },
    {
        id: "7",
        name: "Cazón Frito (Media Orden)",
        description: "Media orden de cazón frito tradicional. Disponible únicamente miércoles y viernes.",
        price: 75,
        category: "Platillos",
        weight: "Media Orden",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Cazón fresco", "Aceite vegetal", "Acompañamientos"],
        preparationTime: "15 min",
        origin: "Golfo de México"
    },
    {
        id: "8",
        name: "Cazón Entomatado (Orden)",
        description: "Delicioso cazón guisado con salsa de tomate y epazote. Disponible únicamente miércoles y viernes.",
        price: 110,
        category: "Platillos",
        weight: "Orden",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Cazón desmenuzado", "Tomates", "Cebolla", "Epazote"],
        preparationTime: "20 min",
        origin: "Yucatán"
    },
    {
        id: "9",
        name: "Cazón Entomatado (Media Orden)",
        description: "Media orden de cazón guisado con salsa de tomate. Disponible únicamente miércoles y viernes.",
        price: 75,
        category: "Platillos",
        weight: "Media Orden",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Cazón desmenuzado", "Tomates", "Cebolla", "Epazote"],
        preparationTime: "15 min",
        origin: "Yucatán"
    },
    {
        id: "10",
        name: "Camarón Fresco Crudo",
        description: "Camarón crudo fresco sin cáscara ni cabeza. Medida Premium 21/25 ideal para platillos gourmet.",
        price: 260,
        category: "Mariscos Frescos",
        weight: "Kilogramo",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Camarón crudo desvenado"],
        preparationTime: "5 min",
        origin: "Campeche, México"
    },
    {
        id: "11",
        name: "Camarón Cocido con Cabeza",
        description: "Camarón cocido entero con cabeza. Medida estándar 41/50 listo para cocteles.",
        price: 150,
        category: "Mariscos Frescos",
        weight: "Kilogramo",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Camarón cocido entero"],
        preparationTime: "5 min",
        origin: "Celestún, Yucatán"
    },
    {
        id: "12",
        name: "Cazón Fresco Rebanado",
        description: "Filete o rebanadas de cazón fresco, limpio y listo para preparar en casa.",
        price: 120,
        category: "Mariscos Frescos",
        weight: "Kilogramo",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Filete de cazón fresco"],
        preparationTime: "5 min",
        origin: "Mérida, Yucatán"
    },
    {
        id: "13",
        name: "Tostada Bolsa Grande",
        description: "Bolsa grande de tostadas de maíz crujientes, ideales para acompañar ceviches y mariscos. (400g)",
        price: 50,
        category: "Tostadas",
        weight: "Bolsa 400g",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Maíz", "Aceite", "Sal"],
        preparationTime: "3 min",
        origin: "Mérida, Yucatán"
    },
    {
        id: "14",
        name: "Tostada Bolsa Mediana",
        description: "Bolsa mediana de tostadas de maíz crujientes. (150g)",
        price: 18,
        category: "Tostadas",
        weight: "Bolsa 150g",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Maíz", "Aceite", "Sal"],
        preparationTime: "3 min",
        origin: "Mérida, Yucatán"
    },
    {
        id: "15",
        name: "Postas de Camarón Fritas",
        description: "Camarones sazonados y fritos al momento. Se vende por kilogramo.",
        price: 360,
        category: "Frituras",
        weight: "Kilogramo",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Camarón entero", "Harina", "Sal", "Ajo"],
        preparationTime: "15 min",
        origin: "Yucatán"
    },
    {
        id: "16",
        name: "Pescado Frito Corvinal",
        description: "Postas o filetes fritos de pescado Corvina de alta calidad. Se vende por kilogramo.",
        price: 330,
        category: "Frituras",
        weight: "Kilogramo",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Pescado Corvina", "Aceite", "Limón", "Sal"],
        preparationTime: "15 min",
        origin: "Sisal, Yucatán"
    },
    {
        id: "17",
        name: "Pecho Frito de Mero",
        description: "Especialidad de la casa: pecho de Mero frito y crujiente. Se vende por kilogramo.",
        price: 330,
        category: "Frituras",
        weight: "Kilogramo",
        available: true,
        availableForPickup: true,
        availableForDelivery: true,
        isOffer: false,
        offerPrice: null,
        ingredients: ["Pecho de Mero", "Adobo de la casa", "Aceite"],
        preparationTime: "18 min",
        origin: "Mérida, Yucatán"
    }
];

// Elementos del DOM
const offersContainer = document.getElementById('offers-container');
const productsContainer = document.getElementById('products-container');
const categoriesTabs = document.getElementById('categories-tabs');
const cartBadge = document.getElementById('cart-badge');
const bottomCartBadge = document.getElementById('bottom-cart-badge');
const cartDrawer = document.getElementById('cart-drawer');
const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
const cartItemsContainer = document.getElementById('cart-items-container');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const emptyCartBrowse = document.getElementById('empty-cart-browse');

// Elementos de Totales del Carrito
const summarySubtotal = document.getElementById('summary-subtotal');
const summaryShipping = document.getElementById('summary-shipping');
const summaryTotal = document.getElementById('summary-total');

// Elementos de Formulario de Pedido
const checkoutForm = document.getElementById('checkout-form');
const addressGroup = document.getElementById('address-group');
const custAddressInput = document.getElementById('cust-address');
const deliveryRadios = document.getElementsByName('delivery-method');

// Elementos de Modal de Producto
const productModal = document.getElementById('product-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const modalBodyContent = document.getElementById('modal-body-content');

// Elementos de Toast
const toast = document.getElementById('toast');

// Inicializar la Aplicación
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupCartListeners();
    setupModalListeners();
    updateCartUI();
});

// Obtener Productos desde la API de C#.NET (con fallback local para GitHub Pages)
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) throw new Error('Error al obtener los productos');
        
        products = await response.json();
    } catch (error) {
        console.warn('Backend no disponible, cargando catálogo local:', error);
        products = LOCAL_PRODUCTS;
    }
    
    renderOffers();
    renderProducts('todos');
    setupFilterListeners();
}

// Renderizar Ofertas Especiales
function renderOffers() {
    const offers = products.filter(p => p.isOffer && p.available);
    if (!offersContainer) return;

    if (offers.length === 0) {
        offersContainer.innerHTML = `<div class="loading-placeholder">No hay ofertas disponibles por el momento. ¡Vuelve pronto!</div>`;
        return;
    }

    offersContainer.innerHTML = offers.map(p => createProductCard(p)).join('');
    attachCardEvents(offersContainer);
}

// Renderizar Catálogo General
function renderProducts(category) {
    if (!productsContainer) return;
    
    let filteredProducts = products.filter(p => p.available);
    if (category !== 'todos') {
        filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `<div class="loading-placeholder">No se encontraron productos en esta categoría.</div>`;
        return;
    }

    productsContainer.innerHTML = filteredProducts.map(p => createProductCard(p)).join('');
    attachCardEvents(productsContainer);
}

// Crear el HTML de la Tarjeta del Producto (Sin imágenes reales, usando placeholder marino)
function createProductCard(product) {
    const originalPriceHtml = product.isOffer && product.offerPrice 
        ? `<span class="original-price">$${product.price}</span>` 
        : '';
    const currentPrice = product.isOffer && product.offerPrice ? product.offerPrice : product.price;
    const hasOfferClass = product.isOffer && product.offerPrice ? 'has-offer' : '';
    
    // Obtener ícono según categoría
    let iconClass = 'fa-fish';
    if (product.category.toLowerCase().includes('platillo')) iconClass = 'fa-utensils';
    else if (product.category.toLowerCase().includes('frituras')) iconClass = 'fa-fire-burner';
    else if (product.category.toLowerCase().includes('tostada')) iconClass = 'fa-circle-dot';

    return `
        <div class="product-card" data-id="${product.id}">
            <div class="card-badges">
                ${product.isOffer ? '<span class="badge badge-offer">Oferta</span>' : ''}
                <span class="badge badge-category badge-cat-${product.category.replace(/\s+/g, '-').toLowerCase()}">${product.category}</span>
            </div>
            <div class="product-weight">${product.weight}</div>
            
            <div class="product-img-placeholder clickable-trigger">
                <i class="fa-solid ${iconClass}"></i>
            </div>
            
            <div class="product-info">
                <h3 class="product-title clickable-trigger">${product.name}</h3>
                <p class="product-desc clickable-trigger">${product.description}</p>
                <div class="product-footer">
                    <div class="price-box ${hasOfferClass}">
                        ${originalPriceHtml}
                        <span class="current-price">$${currentPrice}</span>
                    </div>
                    <button class="add-btn add-to-cart-btn" data-id="${product.id}" title="Añadir al carrito">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Asignar Eventos a las Tarjetas (Añadir y Abrir Detalles)
function attachCardEvents(parentContainer) {
    // Abrir detalles al dar clic en la tarjeta (excepto el botón de añadir)
    parentContainer.querySelectorAll('.clickable-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const id = card.getAttribute('data-id');
            openProductDetails(id);
        });
    });

    // Botón de Añadir Directo al Carrito
    parentContainer.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            addToCart(id);
        });
    });
}

// Configurar Filtros por Categoría
function setupFilterListeners() {
    if (!categoriesTabs) return;
    
    categoriesTabs.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            categoriesTabs.querySelector('.tab-btn.active').classList.remove('active');
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            renderProducts(category);
        });
    });
}

// Abrir Modal de Detalles de un Producto
function openProductDetails(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const currentPrice = product.isOffer && product.offerPrice ? product.offerPrice : product.price;
    const priceDetails = product.isOffer && product.offerPrice 
        ? `<div class="price-box has-offer"><span class="original-price">$${product.price} M.N.</span><span class="current-price" style="font-size: 1.8rem; color: var(--offer-color);">$${product.offerPrice} M.N.</span></div>`
        : `<span class="current-price" style="font-size: 1.8rem;">$${product.price} M.N.</span>`;

    // Lista de ingredientes formateados
    const ingredientsHtml = product.ingredients && product.ingredients.length > 0
        ? `<div class="modal-ingredients">
             <h4>Ingredientes:</h4>
             <ul class="ingredients-list">
                ${product.ingredients.map(ing => `<li>${ing}</li>`).join('')}
             </ul>
           </div>`
        : '';

    modalBodyContent.innerHTML = `
        <div class="modal-header-placeholder">
            <h2>${product.name}</h2>
        </div>
        <div class="modal-inner-body">
            <div class="modal-meta-grid">
                <div class="meta-item">
                    <span class="meta-label">Porción / Peso</span>
                    <span class="meta-val">${product.weight}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Preparación</span>
                    <span class="meta-val"><i class="fa-regular fa-clock"></i> ${product.preparationTime}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Origen</span>
                    <span class="meta-val"><i class="fa-solid fa-location-dot"></i> ${product.origin}</span>
                </div>
            </div>
            
            <p class="modal-desc">${product.description}</p>
            
            ${ingredientsHtml}
            
            <div class="modal-action-footer">
                <div class="modal-price">
                    ${priceDetails}
                </div>
                <button class="btn btn-primary" id="modal-add-btn" data-id="${product.id}">
                    <i class="fa-solid fa-cart-plus"></i> Añadir al Pedido
                </button>
            </div>
        </div>
    `;

    // Listener para añadir desde modal
    document.getElementById('modal-add-btn').addEventListener('click', () => {
        addToCart(product.id);
        closeProductModal();
    });

    productModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevenir scroll de fondo
}

function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Configurar Listeners del Modal
function setupModalListeners() {
    closeModalBtn.addEventListener('click', closeProductModal);
    
    // Cerrar al hacer clic fuera del contenido del modal
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            closeProductModal();
        }
    });
}

// Gestión de Carrito de Compras
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.productId === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const itemPrice = product.isOffer && product.offerPrice ? product.offerPrice : product.price;
        cart.push({
            productId: product.id,
            productName: product.name,
            price: itemPrice,
            quantity: 1,
            weight: product.weight
        });
    }

    saveCart();
    updateCartUI();
    showToast(`"${product.name}" agregado al carrito`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.productId !== id);
    saveCart();
    updateCartUI();
}

function updateQuantity(id, delta) {
    const item = cart.find(item => item.productId === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('pescaderia_cart', JSON.stringify(cart));
}

// Actualizar Interfaz del Carrito
function updateCartUI() {
    // Actualizar Contador en el Navbar
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalCount;
    if (bottomCartBadge) bottomCartBadge.textContent = totalCount;
    
    // Toggle visibilidad del formulario según carrito vacío
    const cartSummarySection = document.getElementById('cart-summary-section');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-state">
                <i class="fa-solid fa-shopping-basket"></i>
                <p>Tu carrito está vacío</p>
                <button class="btn btn-secondary btn-sm" id="empty-cart-browse-btn">Explorar Menú</button>
            </div>
        `;
        
        // Listener del botón de explorar en carrito vacío
        const btnBrowse = document.getElementById('empty-cart-browse-btn');
        if (btnBrowse) {
            btnBrowse.addEventListener('click', () => {
                closeCart();
                window.location.hash = 'menu';
            });
        }

        if (cartSummarySection) cartSummarySection.style.display = 'none';
        return;
    }

    if (cartSummarySection) cartSummarySection.style.display = 'block';

    // Listar productos
    cartItemsContainer.innerHTML = cart.map(item => {
        // Encontrar categoría para ícono del placeholder
        const prod = products.find(p => p.id === item.productId);
        let iconClass = 'fa-fish';
        if (prod) {
            if (prod.category.toLowerCase().includes('platillo')) iconClass = 'fa-utensils';
            else if (prod.category.toLowerCase().includes('frituras')) iconClass = 'fa-fire-burner';
            else if (prod.category.toLowerCase().includes('tostada')) iconClass = 'fa-circle-dot';
        }

        return `
            <div class="cart-item">
                <div class="cart-item-placeholder">
                    <i class="fa-solid ${iconClass}"></i>
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.productName}</div>
                    <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn dec-qty-btn" data-id="${item.productId}">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn inc-qty-btn" data-id="${item.productId}">+</button>
                </div>
                <button class="remove-item-btn" data-id="${item.productId}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
    }).join('');

    // Asignar listeners del carrito
    cartItemsContainer.querySelectorAll('.dec-qty-btn').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.getAttribute('data-id'), -1));
    });
    cartItemsContainer.querySelectorAll('.inc-qty-btn').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.getAttribute('data-id'), 1));
    });
    cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(btn.getAttribute('data-id')));
    });

    // Calcular Totales
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Costo de envío
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
    const shipping = deliveryMethod === 'delivery' ? 35 : 0; // $35 envío local Mérida
    
    const total = subtotal + shipping;

    summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    summaryShipping.textContent = `$${shipping.toFixed(2)}`;
    summaryTotal.textContent = `$${total.toFixed(2)}`;
}

// Configurar Listeners del Drawer del Carrito
function setupCartListeners() {
    openCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    cartDrawerOverlay.addEventListener('click', closeCart);

    // Método de Entrega cambia costo de envío y campo dirección
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'delivery') {
                addressGroup.style.display = 'block';
                custAddressInput.required = true;
            } else {
                addressGroup.style.display = 'none';
                custAddressInput.required = false;
                custAddressInput.value = '';
            }
            updateCartUI();
        });
    });

    // Confirmar e iniciar pedido
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
}

function openCart() {
    cartDrawer.classList.add('active');
    cartDrawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Procesar el Checkout
async function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-order-btn');
    if (submitBtn) submitBtn.disabled = true;

    
    const custName = document.getElementById('cust-name').value;
    const custPhone = document.getElementById('cust-phone').value;
    const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
    const paymentMethodInput = document.querySelector('input[name="payment-method"]:checked');
    const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'efectivo';
    const custAddress = custAddressInput.value;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = deliveryMethod === 'delivery' ? 35 : 0;
    const total = subtotal + shippingCost;

    // Crear DTO para el Servidor de C#
    const orderData = {
        customerName: custName,
        customerPhone: custPhone,
        deliveryMethod: deliveryMethod,
        paymentMethod: paymentMethod,
        shippingAddress: deliveryMethod === 'delivery' ? custAddress : 'Recoger en local Azcorra',
        shippingCost: shippingCost,
        items: cart.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }))
    };

    try {
        // 1. Enviar el pedido a la base de datos de C# en segundo plano
        const response = await fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) throw new Error('Error al registrar el pedido');

        const savedOrder = await response.json();
        console.log('Pedido guardado backend:', savedOrder);

        // 2. Generar el mensaje formateado para enviar por WhatsApp
        sendWhatsAppOrder(savedOrder);

        // 3. Limpiar carrito local
        cart = [];
        saveCart();
        updateCartUI();
        closeCart();
        
        showToast('¡Pedido enviado con éxito!');
    } catch (error) {
        console.error('Error al registrar pedido:', error);
        // Si el backend falla, de todas formas enviamos por WhatsApp para no perder el pedido
        const fallbackOrder = {
            id: `PED-LOCAL-${Date.now().toString().slice(-6)}`,
            customerName: custName,
            customerPhone: custPhone,
            deliveryMethod: deliveryMethod,
            paymentMethod: paymentMethod,
            shippingAddress: deliveryMethod === 'delivery' ? custAddress : 'Recoger en local Azcorra',
            subtotal: subtotal,
            shipping: shippingCost,
            total: total,
            items: cart
        };
        sendWhatsAppOrder(fallbackOrder);
        
        cart = [];
        saveCart();
        updateCartUI();
        closeCart();
    }
    
    if (submitBtn) submitBtn.disabled = false;
}

// Redireccionar al WhatsApp de Pescadería con el Formato de Pedido
function sendWhatsAppOrder(order) {
    const businessPhone = '529992145724'; // Número de Pescaderia
    
    // Formatear items del pedido
    const itemsMessage = order.items.map(item => {
        // En el caso de savedOrder del backend, el formato es item.productName e item.quantity
        const name = item.productName || item.ProductName || 'Producto';
        const qty = item.quantity || item.Quantity || 1;
        const price = item.price || item.Price || 0;
        return `• ${qty}x ${name} ($${price} c/u)`;
    }).join('\n');

    const methodLabel = order.deliveryMethod === 'delivery' ? '🚗 A Domicilio' : '🏪 Recoger en Tienda';
    const paymentLabel = order.paymentMethod === 'transferencia' ? '💳 Transferencia' : '💵 Efectivo';
    
    const text = `🐟 *NUEVO PEDIDO - PESCADERÍA AZCORRA*\n` +
                 `*(Por favor, espera a que confirmemos tu pedido)*\n` +
                 `*(El tiempo estimado para que salga la orden será de 50 minutos)*\n\n` +
                 `*Cliente:* ${order.customerName}\n` +
                 `*Teléfono:* ${order.customerPhone}\n` +
                 `*Método de Entrega:* ${methodLabel}\n` +
                 `*Método de Pago:* ${paymentLabel}\n` +
                 (order.deliveryMethod === 'delivery' ? `*Dirección:* ${order.shippingAddress}\n` : '') +
                 `\n*Detalles de Compra:*\n${itemsMessage}\n\n` +
                 `*Subtotal:* $${(order.subtotal !== undefined ? order.subtotal : order.items.reduce((s,i) => s + (i.price*i.quantity), 0)).toFixed(2)}\n` +
                 `*Envío:* $${(order.shipping !== undefined ? order.shipping : (order.shippingCost || 0)).toFixed(2)}\n` +
                 `*Total a pagar:* $${(order.total !== undefined ? order.total : order.items.reduce((s,i) => s + (i.price*i.quantity), 0) + (order.shippingCost || 0)).toFixed(2)}\n\n` +
                 `¡Gracias por tu preferencia! 🌊`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodedText}`;

    // Alerta al usuario
    alert('Por favor, asegúrate de tener tu sesión de WhatsApp iniciada para poder enviar el pedido.');

    // Abrir WhatsApp en pestaña nueva
    window.open(whatsappUrl, '_blank');
}

// Mostrar Toast (desactivado para evitar obstrucciones en la UI móvil)
function showToast(message) {
    // Desactivado
}

// Controladores de Eventos de la Barra de Navegación Inferior (Móvil/Tablet)
document.addEventListener('DOMContentLoaded', () => {
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    if (bottomNavItems.length > 0) {
        bottomNavItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (item.id === 'btn-nav-cart') {
                    e.preventDefault();
                    openCart();
                    return;
                }
                
                // Activar pestaña visualmente
                document.querySelector('.bottom-nav-item.active')?.classList.remove('active');
                item.classList.add('active');
            });
        });
    }

    // Cambiar item activo del bottom nav al hacer scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 200; // offset para activarlo un poco antes
        const sections = ['offers', 'menu', 'location'];
        
        sections.forEach(secId => {
            const sec = document.getElementById(secId);
            if (sec) {
                const top = sec.offsetTop;
                const height = sec.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    document.querySelector('.bottom-nav-item.active')?.classList.remove('active');
                    const matchingItem = document.getElementById(`btn-nav-${secId}`);
                    if (matchingItem) matchingItem.classList.add('active');
                }
            }
        });
    });
});
