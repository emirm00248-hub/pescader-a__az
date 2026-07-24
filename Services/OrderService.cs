using Pescaderia.DTOs;
using Pescaderia.Models;
using Pescaderia.Patterns.Singleton;
using Pescaderia.Patterns.Observer;

namespace Pescaderia.Services
{
    public class OrderService : IOrderService
    {
        private readonly InMemoryDatabase _db;
        private readonly OrderSubject _orderSubject;

        public OrderService()
        {
            _db = InMemoryDatabase.Instance;
            
            _orderSubject = new OrderSubject();
            _orderSubject.Attach(new ConsoleLogObserver());
        }

        public List<Product> GetAllProducts()
        {
            return _db.Products;
        }

        public Product? GetProductById(string id)
        {
            return _db.Products.FirstOrDefault(p => p.Id == id);
        }

        public Order CreateOrder(OrderInput input)
        {
            if (input == null || input.Items == null || !input.Items.Any() || string.IsNullOrWhiteSpace(input.CustomerName))
            {
                throw new ArgumentException("Datos de pedido inválidos.");
            }

            var orderId = $"PED-{DateTime.Now:yyyyMMdd}-{Guid.NewGuid().ToString()[..6].ToUpper()}";
            
            decimal subtotal = 0;
            var orderItems = new List<OrderItem>();

            foreach (var itemInput in input.Items)
            {
                var product = _db.Products.FirstOrDefault(p => p.Id == itemInput.ProductId);
                if (product == null)
                {
                    throw new ArgumentException($"El producto con ID {itemInput.ProductId} no existe.");
                }

                var price = product.GetCurrentPrice();
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

            _db.Orders.TryAdd(orderId, newOrder);

            _orderSubject.Notify(newOrder);

            return newOrder;
        }
    }
}
