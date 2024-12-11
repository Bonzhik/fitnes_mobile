using Business.Dtos.Write;
using Business.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileCommentController : ControllerBase
    {
        private readonly IProfileCommentService _profileCommentService;

        public ProfileCommentController(IProfileCommentService profileCommentService)
        {
            _profileCommentService = profileCommentService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] ProfileCommentW profileCommentW)
        {
            long.TryParse(User.FindFirst(ClaimTypes.NameIdentifier).Value, out long userId);

            var result = await _profileCommentService.CreateCommentAsync(profileCommentW, userId);

            return Ok(result);
        }

    }
}
