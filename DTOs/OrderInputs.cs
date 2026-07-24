namespace Pescaderia.DTOs
{
    public class OrderItemInput
    {
        public string ProductId { get; set; } = string.Empty;
        public int Quantity { get; set; }
    }

    public class OrderInput
    {
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string DeliveryMethod { get; set; } = string.Empty;
        public string? PaymentMethod { get; set; }
        public string ShippingAddress { get; set; } = string.Empty;
        public decimal ShippingCost { get; set; }
        public List<OrderItemInput> Items { get; set; } = new();
    }
}
