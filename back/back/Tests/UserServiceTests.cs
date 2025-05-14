using Moq;
using DAL.Repositories.Interfaces;
using Business.Services.Interfaces;
using Business.Services.Implementations;
using Domain.Models;

namespace Tests
{
    public class UserServiceTests
    {
        private Mock<IUserRepository> _userRepositoryMock;
        private Mock<IUserCategoryRepository> _userCategoryRepositoryMock;
        private IUserService _userService;

        [SetUp]
        public void Setup()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _userCategoryRepositoryMock = new Mock<IUserCategoryRepository>();
            _userService = new UserService(_userRepositoryMock.Object, _userCategoryRepositoryMock.Object);
        }

        [Test]
        public async Task GetFiltered_ReturnsEmptyList_WhenCurrentUserIsNull()
        {
            _userRepositoryMock.Setup(r => r.GetByIdAsync(It.IsAny<long>())).ReturnsAsync((User)null);

            var result = await _userService.GetFiltered(1);

            Assert.IsNotNull(result);
            Assert.IsEmpty(result);
        }

        [Test]
        public async Task GetFiltered_ReturnsUsersMatchingFilters()
        {
            var currentUser = new User
            {
                Id = 1,
                Gender = Gender.MALE,
                Height = 180,
                Weigth = 75
            };

            var otherUsers = new List<User>
            {
                new User { Id = 2, Gender = Gender.MALE, Height = 182, Weigth = 76, Rating = 4.5f,
                    UserCategory = new UserCategory { Id = 1, CategoryName = "Cat1" } },

                new User { Id = 3, Gender = Gender.FEMALE, Height = 170, Weigth = 60, Rating = 3.5f,
                    UserCategory = new UserCategory { Id = 2, CategoryName = "Cat2" } }
            };

            _userRepositoryMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(currentUser);
            _userRepositoryMock.Setup(r => r.GetAllAsync()).Returns(otherUsers.AsQueryable());

            var result = await _userService.GetFiltered(1);

            Assert.That(result.Count, Is.EqualTo(2));
            Assert.That(result.First().Id, Is.EqualTo(2));
            Assert.That(result.First().Rating, Is.EqualTo(4.5f));
        }
    }
}