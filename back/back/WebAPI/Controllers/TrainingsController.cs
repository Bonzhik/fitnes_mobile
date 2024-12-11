using Business.Dtos.Write;
using Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainingController : ControllerBase
    {
        private readonly ITrainingService _trainingService;

        public TrainingController(ITrainingService trainingService)
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
    }
}
