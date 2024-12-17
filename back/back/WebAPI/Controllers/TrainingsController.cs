using Business.Dtos.Write;
using Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainingsController : ControllerBase
    {
        private readonly ITrainingService _trainingService;

        public TrainingsController(ITrainingService trainingService)
        {
            _trainingService = trainingService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] TrainingW trainingW)
        {
            long.TryParse(User.FindFirst(ClaimTypes.NameIdentifier).Value, out long userId);

            var result = await _trainingService.CreateTrainingAsync(trainingW, userId);

            return Ok(result);
        }

        [HttpGet("{trainingId}")]
        public async Task<IActionResult> Get(long trainingId)
        {
            var result = await _trainingService.GetByIdAsync(trainingId);

            return Ok(result);
        }

        [HttpGet("byUser/{userId}")]
        public async Task<IActionResult> GetByUser(long userId)
        {
            var result = await _trainingService.GetByUserIdAsync(userId);

            return Ok(result);
        }

        [HttpGet("byDay/{dayId}")]
        public async Task<IActionResult> GetByDay(long dayId)
        {
            var result = await _trainingService.GetByDayAsync(dayId);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _trainingService.GetAllAsync();

            return Ok(result);
        }
    }
}
