using System.Collections.Concurrent;

var builder = WebApplication.CreateBuilder(args);

// Configurar CORS para permitir peticiones locales y externas
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAll");

// Habilitar la entrega de archivos estáticos desde wwwroot
app.UseDefaultFiles();
app.UseStaticFiles();

// Datos del Menú (en memoria) tomados de PescaderiaApi con sus precios y especificaciones
var products = new List<Product>
{
    // PLATILLOS
    new Product("1", "Pescado Empanizado (Orden)", "Incluye pescado empanizado acompañado de arroz, frijol, tortillas y guarnición.", 120m, "Platillos", "Orden", true, true, true, true, 120m, new List<string> { "Filete de pescado", "Pan molido", "Especias", "Arroz", "Frijoles", "Tortillas" }, "15 min", "Mérida, Yucatán"),
    new Product("2", "Pescado Empanizado (Media Orden)", "Incluye arroz, frijol, tortillas y guarnición. Una porción menor de pescado.", 90m, "Platillos", "Media Orden", true, true, true, false, null, new List<string> { "Filete de pescado", "Pan molido", "Arroz", "Frijoles", "Tortillas" }, "12 min", "Mérida, Yucatán"),
    new Product("3", "Camarón Empanizado (Orden)", "Incluye camarones empanizados de primera, arroz, frijol, tortillas y guarnición.", 170m, "Platillos", "Orden", true, true, true, true, 170m, new List<string> { "Camarón fresco", "Empanizador", "Arroz", "Frijoles", "Tortillas", "Ensalada" }, "18 min", "Campeche, México"),
    new Product("4", "Camarón Empanizado (Media Orden)", "Incluye arroz, frijol, tortillas y guarnición. Porción menor de camarones.", 120m, "Platillos", "Media Orden", true, true, true, false, null, new List<string> { "Camarón fresco", "Empanizador", "Arroz", "Frijoles", "Tortillas" }, "15 min", "Campeche, México"),
    new Product("5", "Cóctel de Camarón (Copa)", "Cóctel preparado de camarón fresco con salsa especial de la casa, cilantro, cebolla y aguacate.", 160m, "Platillos", "Copa", true, true, true, false, null, new List<string> { "Camarón cocido", "Salsa coctelera", "Aguacate", "Cebolla", "Cilantro" }, "10 min", "Yucatán"),
    new Product("6", "Cazón Frito (Orden)", "Orden de cazón frito tradicional. Disponible únicamente miércoles y viernes.", 110m, "Platillos", "Orden", true, true, true, true, 110m, new List<string> { "Cazón fresco", "Aceite vegetal", "Especias", "Acompañamientos" }, "20 min", "Golfo de México"),
    new Product("7", "Cazón Frito (Media Orden)", "Media orden de cazón frito tradicional. Disponible únicamente miércoles y viernes.", 75m, "Platillos", "Media Orden", true, true, true, false, null, new List<string> { "Cazón fresco", "Aceite vegetal", "Acompañamientos" }, "15 min", "Golfo de México"),
    new Product("8", "Cazón Entomatado (Orden)", "Delicioso cazón guisado con salsa de tomate y epazote. Disponible únicamente miércoles y viernes.", 110m, "Platillos", "Orden", true, true, true, false, null, new List<string> { "Cazón desmenuzado", "Tomates", "Cebolla", "Epazote" }, "20 min", "Yucatán"),
    new Product("9", "Cazón Entomatado (Media Orden)", "Media orden de cazón guisado con salsa de tomate. Disponible únicamente miércoles y viernes.", 75m, "Platillos", "Media Orden", true, true, true, false, null, new List<string> { "Cazón desmenuzado", "Tomates", "Cebolla", "Epazote" }, "15 min", "Yucatán"),

    // MARISCOS FRESCOS
    new Product("10", "Camarón Fresco Crudo", "Camarón crudo fresco sin cáscara ni cabeza. Medida Premium 21/25 ideal para platillos gourmet.", 260m, "Mariscos Frescos", "Kilogramo", true, true, true, false, null, new List<string> { "Camarón crudo desvenado" }, "5 min", "Campeche, México"),
    new Product("11", "Camarón Cocido con Cabeza", "Camarón cocido entero con cabeza. Medida estándar 41/50 listo para cocteles.", 150m, "Mariscos Frescos", "Kilogramo", true, true, true, false, null, new List<string> { "Camarón cocido entero" }, "5 min", "Celestún, Yucatán"),
    new Product("12", "Cazón Fresco Rebanado", "Filete o rebanadas de cazón fresco, limpio y listo para preparar en casa.", 120m, "Mariscos Frescos", "Kilogramo", true, true, true, false, null, new List<string> { "Filete de cazón fresco" }, "5 min", "Mérida, Yucatán"),

    // TOSTADAS
    new Product("13", "Tostada Bolsa Grande", "Bolsa grande de tostadas de maíz crujientes, ideales para acompañar ceviches y mariscos. (400g)", 50m, "Tostadas", "Bolsa 400g", true, true, true, false, null, new List<string> { "Maíz", "Aceite", "Sal" }, "3 min", "Mérida, Yucatán"),
    new Product("14", "Tostada Bolsa Mediana", "Bolsa mediana de tostadas de maíz crujientes. (150g)", 18m, "Tostadas", "Bolsa 150g", true, true, true, false, null, new List<string> { "Maíz", "Aceite", "Sal" }, "3 min", "Mérida, Yucatán"),

    // FRITURAS
    new Product("15", "Postas de Camarón Fritas", "Camarones sazonados y fritos al momento. Se vende por kilogramo.", 360m, "Frituras", "Kilogramo", true, true, true, false, null, new List<string> { "Camarón entero", "Harina", "Sal", "Ajo" }, "15 min", "Yucatán"),
    new Product("16", "Pescado Frito Corvinal", "Postas o filetes fritos de pescado Corvina de alta calidad. Se vende por kilogramo.", 330m, "Frituras", "Kilogramo", true, true, true, false, null, new List<string> { "Pescado Corvina", "Aceite", "Limón", "Sal" }, "15 min", "Sisal, Yucatán"),
    new Product("17", "Pecho Frito de Mero", "Especialidad de la casa: pecho de Mero frito y crujiente. Se vende por kilogramo.", 330m, "Frituras", "Kilogramo", true, true, true, false, null, new List<string> { "Pecho de Mero", "Adobo de la casa", "Aceite" }, "18 min", "Mérida, Yucatán")
};

// Historial temporal de órdenes recibidas (en memoria)
var orders = new ConcurrentDictionary<string, Order>();

// Endpoint: Obtener todos los productos (Catálogo/Menú)
app.MapGet("/api/products", () => Results.Ok(products));

// Endpoint: Obtener un producto por ID
app.MapGet("/api/products/{id}", (string id) =>
{
    var product = products.FirstOrDefault(p => p.Id == id);
    return product is not null ? Results.Ok(product) : Results.NotFound(new { message = "Producto no encontrado." });
});

// Endpoint: Registrar un nuevo pedido
app.MapPost("/api/orders", (OrderInput input) =>
{
    if (input == null || input.Items == null || !input.Items.Any() || string.IsNullOrWhiteSpace(input.CustomerName))
    {
        return Results.BadRequest(new { message = "Datos de pedido inválidos." });
    }

    var orderId = $"PED-{DateTime.Now:yyyyMMdd}-{Guid.NewGuid().ToString()[..6].ToUpper()}";
    
    // Validar precios y calcular totales en el backend
    decimal subtotal = 0;
    var orderItems = new List<OrderItem>();

    foreach (var itemInput in input.Items)
    {
        var product = products.FirstOrDefault(p => p.Id == itemInput.ProductId);
        if (product == null)
        {
            return Results.BadRequest(new { message = $"El producto con ID {itemInput.ProductId} no existe." });
        }

        var price = product.IsOffer && product.OfferPrice.HasValue ? product.OfferPrice.Value : product.Price;
        subtotal += price * itemInput.Quantity;

        orderItems.Add(new OrderItem(
            product.Id,
            product.Name,
            itemInput.Quantity,
            price
        ));
    }

    decimal tax = 0m;
    decimal total = subtotal + input.ShippingCost;

    var newOrder = new Order(
        orderId,
        input.CustomerName,
        input.CustomerPhone,
        input.DeliveryMethod,
        input.PaymentMethod ?? "efectivo",
        input.ShippingAddress,
        DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
        orderItems,
        subtotal,
        tax,
        input.ShippingCost,
        total
    );

    orders.TryAdd(orderId, newOrder);

    // En una aplicación real, aquí guardaríamos en la DB o enviaríamos notificación SMS/WhatsApp.
    Console.WriteLine($"[PEDIDO RECIBIDO] ID: {orderId} | Cliente: {input.CustomerName} | Total: ${total}");

    return Results.Ok(newOrder);
});

// Fallback para redirigir peticiones de ruta desconocidas al index.html de la SPA
app.MapFallbackToFile("index.html");

app.Run();

// Definiciones de Modelos y DTOs
public record Product(
    string Id,
    string Name,
    string Description,
    decimal Price,
    string Category,
    string Weight,
    bool Available,
    bool AvailableForPickup,
    bool AvailableForDelivery,
    bool IsOffer,
    decimal? OfferPrice,
    List<string> Ingredients,
    string PreparationTime,
    string Origin
);

public record OrderItem(
    string ProductId,
    string ProductName,
    int Quantity,
    decimal Price
);

public record Order(
    string Id,
    string CustomerName,
    string CustomerPhone,
    string DeliveryMethod, // "pickup" | "delivery"
    string PaymentMethod,
    string ShippingAddress,
    string Date,
    List<OrderItem> Items,
    decimal Subtotal,
    decimal Tax,
    decimal Shipping,
    decimal Total
);

public record OrderItemInput(
    string ProductId,
    int Quantity
);

public record OrderInput(
    string CustomerName,
    string CustomerPhone,
    string DeliveryMethod,
    string PaymentMethod,
    string ShippingAddress,
    decimal ShippingCost,
    List<OrderItemInput> Items
);
