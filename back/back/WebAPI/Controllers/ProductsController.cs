using Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _productService.GetAllAsync();

            return Ok(result);
        }

        [HttpGet("byDay/{dayId}")]
        public async Task<IActionResult> GetByDay(int dayId)
        {
            var result = await _productService.GetByDayIdAsync(dayId);

            return Ok(result);
        }
    }
}
