﻿using Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
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

        [HttpGet("search")]
        public async Task<IActionResult> GetByName([FromQuery] string name)
        {
            var result = await _productService.GetByNameAsync(name);

            return Ok(result);
        }
    }
}
