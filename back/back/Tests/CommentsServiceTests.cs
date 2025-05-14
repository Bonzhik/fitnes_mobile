using Business.Dtos.Write;
using Business.Services.Implementations;
using Business.Services.Interfaces;
using DAL.Repositories.Interfaces;
using Domain.Models;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tests
{
    public class CommentsServiceTests
    {
        [Test]
        public async Task CreateCommentAsync_ReturnsFalse_IfCommentExists()
        {
            var trainingCommentRepo = new Mock<ITrainingCommentRepositry>();
            var userServiceMock = new Mock<IUserService>();
            var userRepo = new Mock<IUserRepository>();
            var trainingRepo = new Mock<ITrainingRepository>();

            trainingCommentRepo.Setup(r => r.IsExistsByUser(1, 1)).ReturnsAsync(true);

            var service = new TrainingCommentService(
                trainingCommentRepo.Object,
                userServiceMock.Object,
                userRepo.Object,
                trainingRepo.Object
            );

            var result = await service.CreateCommentAsync(
                new TrainingCommentW { CommentTo = 1, Text = "Test", Rating = 5 },
                1
            );

            Assert.IsFalse(result);
        }

        [Test]
        public async Task CreateCommentAsync_AddsCommentAndUpdatesRating()
        {
            var user = new User { Id = 1 };
            var training = new Training
            {
                Id = 1,
                Comments = new List<TrainingComments>(),
                Rating = 0
            };

            var trainingCommentRepo = new Mock<ITrainingCommentRepositry>();
            var userServiceMock = new Mock<IUserService>();
            var userRepo = new Mock<IUserRepository>();
            var trainingRepo = new Mock<ITrainingRepository>();

            trainingCommentRepo.Setup(r => r.IsExistsByUser(1, 1)).ReturnsAsync(false);
            trainingCommentRepo.Setup(r => r.AddAsync(It.IsAny<TrainingComments>())).ReturnsAsync(true);

            userRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(user);
            trainingRepo.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(training);
            trainingRepo.Setup(r => r.UpdateAsync(It.IsAny<Training>())).ReturnsAsync(true);

            var service = new TrainingCommentService(
                trainingCommentRepo.Object,
                userServiceMock.Object,
                userRepo.Object,
                trainingRepo.Object
            );

            var result = await service.CreateCommentAsync(
                new TrainingCommentW { CommentTo = 1, Text = "Nice", Rating = 5 },
                1
            );

            Assert.IsTrue(result);
        }
    }
}
