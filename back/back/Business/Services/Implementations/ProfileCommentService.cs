using Business.Dtos.Read;
using Business.Services.Interfaces;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Implementations
{
    public class ProfileCommentService : IProfileCommentService
    {
        private readonly IProfileCommentRepository _profileCommentRepository;
        private readonly IUserService _userService;

        public ProfileCommentService(IProfileCommentRepository profileCommentRepository, IUserService userService)
        {
            _profileCommentRepository = profileCommentRepository;
            _userService = userService;
        }

        public async Task<ICollection<ProfileCommentR>> GetByUserIdAsync(long userId)
        {
            var profileComments = _profileCommentRepository.GetByUserId(userId);

            List<ProfileCommentR> commentsDto = [];

            foreach (var profileComment in profileComments)
            {
                commentsDto.Add(new ProfileCommentR
                {
                    Id = profileComment.Id,
                    Text = profileComment.Text,
                    UserR = await _userService.GetUserByIdAsync(profileComment.CommentBy.Id) //Optimize
                });
            }

            return commentsDto;
        }
    }
}
