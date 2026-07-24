// Estado de la Aplicación
let products = [];
let cart = JSON.parse(localStorage.getItem('pescaderia_cart')) || [];

// Configuración de la API
const API_URL = window.location.origin;

// Clases de Dominio (POO, Encapsulamiento y Herencia)
class ProductBase {
    // Encapsulamiento con campos privados
    #id; #name; #description; #price; #category; #weight;
    #available; #isOffer; #offerPrice; #ingredients; #preparationTime; #origin;

    constructor(id, name, description, price, category, weight, available, isOffer, offerPrice, ingredients, preparationTime, origin) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#category = category;
        this.#weight = weight;
        this.#available = available;
        this.#isOffer = isOffer;
        this.#offerPrice = offerPrice;
        this.#ingredients = ingredients || [];
        this.#preparationTime = preparationTime;
        this.#origin = origin;
    }

    // Getters públicos (protege la información contra modificaciones accidentales)
    get id() { return this.#id; }
    get name() { return this.#name; }
    get description() { return this.#description; }
    get price() { return this.#price; }
    get category() { return this.#category; }
    get weight() { return this.#weight; }
    get available() { return this.#available; }
    get isOffer() { return this.#isOffer; }
    get offerPrice() { return this.#offerPrice; }
    get ingredients() { return this.#ingredients; }
    get preparationTime() { return this.#preparationTime; }
    get origin() { return this.#origin; }

    // Método polimórfico base
    getSummary() {
        return `${this.#name} - $${this.#price}`;
    }
}

// Subclases (Herencia)
class PlatilloProduct extends ProductBase {
    constructor(id, name, description, price, weight, available, isOffer, offerPrice, ingredients, preparationTime, origin) {
        super(id, name, description, price, "Platillos", weight, available, isOffer, offerPrice, ingredients, preparationTime, origin);
    }
    
    getSummary() {
        return `[Platillo Preparado] ${this.name} - Listo en ${this.preparationTime}`;
    }
}

class MariscoFrescoProduct extends ProductBase {
    constructor(id, name, description, price, weight, available, isOffer, offerPrice, ingredients, preparationTime, origin) {
        super(id, name, description, price, "Mariscos Frescos", weight, available, isOffer, offerPrice, ingredients, preparationTime, origin);
    }
}

class FrituraProduct extends ProductBase {
    constructor(id, name, description, price, weight, available, isOffer, offerPrice, ingredients, preparationTime, origin) {
        super(id, name, description, price, "Frituras", weight, available, isOffer, offerPrice, ingredients, preparationTime, origin);
    }
}

class TostadaProduct extends ProductBase {
    constructor(id, name, description, price, weight, available, isOffer, offerPrice, ingredients, preparationTime, origin) {
        super(id, name, description, price, "Tostadas", weight, available, isOffer, offerPrice, ingredients, preparationTime, origin);
    }
}

// Catálogo de Productos Local utilizando Clases Instanciadas (Demuestra POO)
const LOCAL_PRODUCTS = [
    new PlatilloProduct("1", "Pescado Empanizado (Orden)", "Incluye pescado empanizado acompañado de arroz, frijol, tortillas y guarnición.", 120, "Orden", true, true, 120, ["Filete de pescado", "Pan molido", "Especias", "Arroz", "Frijoles", "Tortillas"], "15 min", "Mérida, Yucatán"),
    new PlatilloProduct("2", "Pescado Empanizado (Media Orden)", "Incluye arroz, frijol, tortillas y guarnición. Una porción menor de pescado.", 90, "Media Orden", true, false, null, ["Filete de pescado", "Pan molido", "Arroz", "Frijoles", "Tortillas"], "12 min", "Mérida, Yucatán"),
    new PlatilloProduct("3", "Camarón Empanizado (Orden)", "Incluye camarones empanizados de primera, arroz, frijol, tortillas y guarnición.", 170, "Orden", true, true, 170, ["Camarón fresco", "Empanizador", "Arroz", "Frijoles", "Tortillas", "Ensalada"], "18 min", "Campeche, México"),
    new PlatilloProduct("4", "Camarón Empanizado (Media Orden)", "Incluye arroz, frijol, tortillas y guarnición. Porción menor de camarones.", 120, "Media Orden", true, false, null, ["Camarón fresco", "Empanizador", "Arroz", "Frijoles", "Tortillas"], "15 min", "Campeche, México"),
    new PlatilloProduct("5", "Cóctel de Camarón (Copa)", "Cóctel preparado de camarón fresco con salsa especial de la casa, cilantro, cebolla y aguacate.", 160, "Copa", true, false, null, ["Camarón cocido", "Salsa coctelera", "Aguacate", "Cebolla", "Cilantro"], "10 min", "Yucatán"),
    new PlatilloProduct("6", "Cazón Frito (Orden)", "Orden de cazón frito tradicional. Disponible únicamente miércoles y viernes.", 110, "Orden", true, true, 95, ["Cazón fresco", "Aceite vegetal", "Especias", "Acompañamientos"], "20 min", "Golfo de México"),
    new PlatilloProduct("7", "Cazón Frito (Media Orden)", "Media orden de cazón frito tradicional. Disponible únicamente miércoles y viernes.", 75, "Media Orden", true, false, null, ["Cazón fresco", "Aceite vegetal", "Acompañamientos"], "15 min", "Golfo de México"),
    new PlatilloProduct("8", "Cazón Entomatado (Orden)", "Delicioso cazón guisado con salsa de tomate y epazote. Disponible únicamente miércoles y viernes.", 110, "Orden", true, false, null, ["Cazón desmenuzado", "Tomates", "Cebolla", "Epazote"], "20 min", "Yucatán"),
    new PlatilloProduct("9", "Cazón Entomatado (Media Orden)", "Media orden de cazón guisado con salsa de tomate. Disponible únicamente miércoles y viernes.", 75, "Media Orden", true, false, null, ["Cazón desmenuzado", "Tomates", "Cebolla", "Epazote"], "15 min", "Yucatán"),
    new MariscoFrescoProduct("10", "Camarón Fresco Crudo", "Camarón crudo fresco sin cáscara ni cabeza. Medida Premium 21/25 ideal para platillos gourmet.", 260, "Kilogramo", true, false, null, ["Camarón crudo desvenado"], "5 min", "Campeche, México"),
    new MariscoFrescoProduct("11", "Camarón Cocido con Cabeza", "Camarón cocido entero con cabeza. Medida estándar 41/50 listo para cocteles.", 150, "Kilogramo", true, false, null, ["Camarón cocido entero"], "5 min", "Celestún, Yucatán"),
    new MariscoFrescoProduct("12", "Cazón Fresco Rebanado", "Filete o rebanadas de cazón fresco, limpio y listo para preparar en casa.", 120, "Kilogramo", true, false, null, ["Filete de cazón fresco"], "5 min", "Mérida, Yucatán"),
    new TostadaProduct("13", "Tostada Bolsa Grande", "Bolsa grande de tostadas de maíz crujientes, ideales para acompañar ceviches y mariscos. (400g)", 50, "Bolsa 400g", true, false, null, ["Maíz", "Aceite", "Sal"], "3 min", "Mérida, Yucatán"),
    new TostadaProduct("14", "Tostada Bolsa Mediana", "Bolsa mediana de tostadas de maíz crujientes. (150g)", 18, "Bolsa 150g", true, false, null, ["Maíz", "Aceite", "Sal"], "3 min", "Mérida, Yucatán"),
    new FrituraProduct("15", "Postas de Camarón Fritas", "Camarones sazonados y fritos al momento. Se vende por kilogramo.", 360, "Kilogramo", true, false, null, ["Camarón entero", "Harina", "Sal", "Ajo"], "15 min", "Yucatán"),
    new FrituraProduct("16", "Pescado Frito Corvinal", "Postas o filetes fritos de pescado Corvina de alta calidad. Se vende por kilogramo.", 330, "Kilogramo", true, false, null, ["Pescado Corvina", "Aceite", "Limón", "Sal"], "15 min", "Sisal, Yucatán"),
    new FrituraProduct("17", "Pecho Frito de Mero", "Especialidad de la casa: pecho de Mero frito y crujiente. Se vende por kilogramo.", 330, "Kilogramo", true, false, null, ["Pecho de Mero", "Adobo de la casa", "Aceite"], "18 min", "Mérida, Yucatán")
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
        
        const data = await response.json();
        
        // Mapear los datos crudos a instancias de nuestras clases POO para mantener el encapsulamiento
        products = data.map(p => {
            const cat = (p.category || "").toLowerCase();
            if (cat.includes('platillo')) {
                return new PlatilloProduct(p.id, p.name, p.description, p.price, p.weight, p.available, p.isOffer, p.offerPrice, p.ingredients, p.preparationTime, p.origin);
            } else if (cat.includes('fritura')) {
                return new FrituraProduct(p.id, p.name, p.description, p.price, p.weight, p.available, p.isOffer, p.offerPrice, p.ingredients, p.preparationTime, p.origin);
            } else if (cat.includes('tostada')) {
                return new TostadaProduct(p.id, p.name, p.description, p.price, p.weight, p.available, p.isOffer, p.offerPrice, p.ingredients, p.preparationTime, p.origin);
            } else {
                return new MariscoFrescoProduct(p.id, p.name, p.description, p.price, p.weight, p.available, p.isOffer, p.offerPrice, p.ingredients, p.preparationTime, p.origin);
            }
        });
        
    } catch (error) {
        console.warn('Backend no disponible, cargando catálogo local con clases POO:', error);
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
    const originalPriceHtml = product.isOffer && product.offerPrice && product.offerPrice < product.price
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
                <img src="images/product-${product.id}.jpg" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px 8px 0 0;" />
                <i class="fa-solid ${iconClass}" style="display: none;"></i>
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
    const showOriginalPrice = product.isOffer && product.offerPrice && product.offerPrice < product.price;
    const priceDetails = product.isOffer && product.offerPrice 
        ? `<div class="price-box has-offer">${showOriginalPrice ? `<span class="original-price">$${product.price} M.N.</span>` : ''}<span class="current-price" style="font-size: 1.8rem; color: var(--offer-color);">$${product.offerPrice} M.N.</span></div>`
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
                    <img src="images/product-${item.productId}.jpg" alt="${item.productName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />
                    <i class="fa-solid ${iconClass}" style="display: none;"></i>
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
    const businessPhone = '529992428242'; // Número de Pescaderia
    
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
