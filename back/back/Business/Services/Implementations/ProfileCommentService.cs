using Business.Dtos.Read;
using Business.Dtos.Write;
using Business.Services.Interfaces;
using DAL.Repositories.Interfaces;
using Domain.Models;

namespace Business.Services.Implementations
{
    public class ProfileCommentService : IProfileCommentService
    {
        private readonly IProfileCommentRepository _profileCommentRepository;
        private readonly IUserService _userService;
        private readonly IUserRepository _userRepository;

        public ProfileCommentService(IProfileCommentRepository profileCommentRepository, IUserService userService, IUserRepository userRepository)
        {
            _profileCommentRepository = profileCommentRepository;
            _userService = userService;
            _userRepository = userRepository;
        }

        public async Task<bool> CreateCommentAsync(ProfileCommentW profileCommentW, long userId)
        {
            var comment = new ProfileComments
            {
                CommentBy = await _userRepository.GetByIdAsync(userId),
                CommentTo = await _userRepository.GetByIdAsync(profileCommentW.CommentTo),
                Text = profileCommentW.Text,
            };

            return await _profileCommentRepository.AddAsync(comment);
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
