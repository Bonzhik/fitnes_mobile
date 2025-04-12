using Business.Dtos.Write;
using Business.Services.Implementations;
using Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainingCommentsController : ControllerBase
    {
        private readonly ITrainingCommentService _trainingCommentService;

        public TrainingCommentsController(ITrainingCommentService trainingCommentService)
        {
            _trainingCommentService = trainingCommentService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] TrainingCommentW trainingCommentW)
        {
            long.TryParse(User.FindFirst(ClaimTypes.NameIdentifier).Value, out long userId);

            var result = await _trainingCommentService.CreateCommentAsync(trainingCommentW, userId);

            if (result)
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet("byTrainig/{trainingId}")]
        public async Task<IActionResult> GetByTrainingIdAsync(long trainingId)
        {
            var result = await _trainingCommentService.GetByTrainingIdAsync(trainingId);

            return Ok(result);
        }
    }
}
