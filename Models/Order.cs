namespace Pescaderia.Models
{
    public class OrderItem
    {
        public string ProductId { get; private set; }
        public string ProductName { get; private set; }
        public int Quantity { get; private set; }
        public decimal Price { get; private set; }

        public OrderItem(string productId, string productName, int quantity, decimal price)
        {
            ProductId = productId;
            ProductName = productName;
            Quantity = quantity;
            Price = price;
        }
    }

    public class Order
    {
        public string Id { get; private set; }
        public string CustomerName { get; private set; }
        public string CustomerPhone { get; private set; }
        public string DeliveryMethod { get; private set; }
        public string PaymentMethod { get; private set; }
        public string ShippingAddress { get; private set; }
        public string Date { get; private set; }
        public List<OrderItem> Items { get; private set; }
        public decimal Subtotal { get; private set; }
        public decimal Shipping { get; private set; }
        public decimal Total { get; private set; }

        public Order(string id, string customerName, string customerPhone, string deliveryMethod, string paymentMethod, string shippingAddress, string date, List<OrderItem> items, decimal subtotal, decimal shipping, decimal total)
        {
            Id = id;
            CustomerName = customerName;
            CustomerPhone = customerPhone;
            DeliveryMethod = deliveryMethod;
            PaymentMethod = paymentMethod;
            ShippingAddress = shippingAddress;
            Date = date;
            Items = items;
            Subtotal = subtotal;
            Shipping = shipping;
            Total = total;
        }
    }
}
