using Business.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IPlannerService _plannerService;
        private readonly ITrainingService _trainingService;
        private readonly IProfileCommentService _profileCommentService;

        public UsersController(IUserService userService, IPlannerService plannerService, ITrainingService trainingService, IProfileCommentService profileCommentService)
        {
            _userService = userService;
            _plannerService = plannerService;
            _trainingService = trainingService;
            _profileCommentService = profileCommentService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            long.TryParse(User.FindFirst(ClaimTypes.NameIdentifier).Value, out long userId);

            var result = await _userService.GetUserByIdAsync(userId);

            return Ok(result);
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(long userId)
        {
            var result = await _userService.GetUserByIdAsync(userId);

            return Ok(result);
        }

        [HttpGet("filtered")]
        public async Task<IActionResult> GetFiltered()
        {
            long.TryParse(User.FindFirst(ClaimTypes.NameIdentifier).Value, out long userId);

            var result = await _userService.GetFiltered(userId);

            return Ok(result);
        }

        [HttpGet("{userId}/planners")]
        public async Task<IActionResult> GetPlanner(long userId)
        {
            var result = await _plannerService.GetByUserIdAsync(userId);

            return Ok(result);
        }

        [HttpGet("{userId}/trainings")]
        public async Task<IActionResult> GetTrainings(long userId)
        {
            var result = await _trainingService.GetByUserIdAsync(userId);

            return Ok(result);
        }

        [HttpGet("{userId}/comments")]
        public async Task<IActionResult> GetComments(long userId)
        { 
            var result = await _profileCommentService.GetByUserIdAsync(userId);

            return Ok(result);
        }
    }
}
