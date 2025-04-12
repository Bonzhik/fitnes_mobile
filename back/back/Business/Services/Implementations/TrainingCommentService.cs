using Business.Dtos.Read;
using Business.Dtos.Write;
using Business.Services.Interfaces;
using DAL.Repositories.Implementations;
using DAL.Repositories.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Implementations
{
    public class TrainingCommentService : ITrainingCommentService
    {
        private readonly ITrainingCommentRepositry _trainingCommentRepository;
        private readonly IUserService _userService;
        private readonly IUserRepository _userRepository;
        private readonly ITrainingRepository _trainingRepository;

        public TrainingCommentService(ITrainingCommentRepositry trainingCommentRepository, IUserService userService, IUserRepository userRepository, ITrainingRepository trainingRepository)
        {
            _trainingCommentRepository = trainingCommentRepository;
            _userService = userService;
            _userRepository = userRepository;
            _trainingRepository = trainingRepository;
        }

        public async Task<float> CalculateRating(long trainingCommentId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CreateCommentAsync(TrainingCommentW trainingCommentW, long userId)
        {
            if (await _trainingCommentRepository.IsExistsByUser(trainingCommentW.CommentTo, userId))
            {
                return false;
            }

            var comment = new TrainingComments
            {
                CommentBy = await _userRepository.GetByIdAsync(userId),
                CommentTo = await _trainingRepository.GetByIdAsync(trainingCommentW.CommentTo),
                Text = trainingCommentW.Text,
            };

            return await _trainingCommentRepository.AddAsync(comment);
        }

        public async Task<ICollection<TrainingCommentR>> GetByTrainingIdAsync(long trainingId)
        {
            var trainingComments = _trainingCommentRepository.GetByTrainingId(trainingId);

            List<TrainingCommentR> commentsDto = [];

            foreach (var trainingComment in trainingComments)
            {
                commentsDto.Add(new TrainingCommentR
                {
                    Id = trainingComment.Id,
                    Text = trainingComment.Text,
                    UserR = await _userService.GetUserByIdAsync(trainingComment.CommentBy.Id) //Optimize
                });
            }

            return commentsDto;
        }
    }
}
