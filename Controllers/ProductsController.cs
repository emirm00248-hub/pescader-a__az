using Microsoft.AspNetCore.Mvc;
using Pescaderia.Services;

namespace Pescaderia.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public ProductsController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _orderService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(string id)
        {
            var product = _orderService.GetProductById(id);
            if (product == null)
            {
                return NotFound(new { message = "Producto no encontrado." });
            }
            return Ok(product);
        }
    }
}
