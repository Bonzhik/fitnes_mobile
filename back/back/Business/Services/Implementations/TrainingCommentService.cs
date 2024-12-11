using Business.Dtos.Read;
using Business.Services.Interfaces;
using DAL.Repositories.Implementations;
using DAL.Repositories.Interfaces;
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

        public TrainingCommentService(ITrainingCommentRepositry trainingCommentRepository, IUserService userService)
        {
            _trainingCommentRepository = trainingCommentRepository;
            _userService = userService;
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
