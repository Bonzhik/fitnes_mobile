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
    }
}
