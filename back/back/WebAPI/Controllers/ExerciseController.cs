using Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpGet("byTraining/{trainingId}")]
        public async Task<IActionResult> GetByTraining(long trainingId)
        {
            var result = await _exerciseService.GetByTrainingIdAsync(trainingId);

            return Ok(result);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetByName([FromQuery]string name)
        {
            var result = await _exerciseService.GetByName(name);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _exerciseService.GetAll();

            return Ok(result);
        }
    }
}
