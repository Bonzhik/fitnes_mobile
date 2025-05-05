using Business.Dtos.Read;
using Business.Dtos.Write;
using Business.Services.Interfaces;
using Common.Services;
using DAL.Repositories.Implementations;
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
            if (await _profileCommentRepository.IsExistsByUser(profileCommentW.CommentTo, userId))
            {
                return false;
            }

            var comment = new ProfileComments
            {
                CommentBy = await _userRepository.GetByIdAsync(userId),
                CommentTo = await _userRepository.GetByIdAsync(profileCommentW.CommentTo),
                Text = profileCommentW.Text,
                Rating = profileCommentW.Rating
            };

            var success = await _profileCommentRepository.AddAsync(comment);

            if (success)
            {
                return true;
            }

            var updatedTraining = await _userRepository.GetByIdAsync(profileCommentW.CommentTo);
            updatedTraining.Rating = RatingService.CalculateRating(updatedTraining.ThisProfileComments);

            return await _userRepository.UpdateAsync(updatedTraining);
        }

        public async Task<ICollection<ProfileCommentR>> GetByUserIdAsync(long userId)
        {
            var test = _profileCommentRepository.GetByUserId(userId);
            var profileComments = test.ToList();

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
