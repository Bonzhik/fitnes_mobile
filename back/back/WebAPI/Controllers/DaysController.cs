using Business.Dtos.Write;
using Business.Services.Implementations;
using Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class DaysController : ControllerBase
    {
        private readonly IDayService _dayService;

        public DaysController(IDayService dayService)
        {
            _dayService = dayService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateDayAsync([FromBody] DayW dayW)
        {
            long.TryParse(User.FindFirst(ClaimTypes.NameIdentifier).Value, out long userId);

            var result = await _dayService.CreateDayAsync(dayW, userId);

            return Ok(result);
        }

        [HttpGet("byUser/{userId}")]
        public async Task<IActionResult> GetDaysByUser(long userId)
        {
            var result = await _dayService.GetByPlannerIdAsync(userId);

            return Ok(result);
        }
    }
}
