using Pescaderia.Models;

namespace Pescaderia.Patterns.Observer
{
    public class ConsoleLogObserver : IOrderObserver
    {
        public void Update(Order order)
        {
            Console.WriteLine($"[OBSERVER LOG] Nuevo pedido registrado. ID: {order.Id} | Cliente: {order.CustomerName} | Total: ${order.Total}");
        }
    }
}
