using Pescaderia.DTOs;
using Pescaderia.Models;

namespace Pescaderia.Services
{
    public interface IOrderService
    {
        List<Product> GetAllProducts();
        Product? GetProductById(string id);
        Order CreateOrder(OrderInput input);
    }
}
