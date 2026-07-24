using Microsoft.AspNetCore.Mvc;
using Pescaderia.DTOs;
using Pescaderia.Services;

namespace Pescaderia.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderInput input)
        {
            try
            {
                var newOrder = _orderService.CreateOrder(input);
                return Ok(newOrder);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error interno del servidor.", details = ex.Message });
            }
        }
    }
}
