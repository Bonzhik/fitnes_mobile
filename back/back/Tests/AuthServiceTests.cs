using Business.Dtos.Auth;
using Business.Services.Implementations;
using Business.Services.Interfaces;
using Common.Services;
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
    public class AuthServiceTests
    {
        private Mock<IUserRepository> _userRepoMock;
        private Mock<IUserService> _userServiceMock;
        private Mock<IJwtService> _jwtServiceMock;

        private AuthService _authService;

        [SetUp]
        public void SetUp()
        {
            _userRepoMock = new Mock<IUserRepository>();
            _userServiceMock = new Mock<IUserService>();
            _jwtServiceMock = new Mock<IJwtService>();

            _authService = new AuthService(
                _userRepoMock.Object,
                _jwtServiceMock.Object,
                _userServiceMock.Object
            );
        }

        [Test]
        public async Task LoginAsync_ReturnsAuthResponse_WhenCredentialsAreValid()
        {
            var user = new User
            {
                Email = "test@example.com",
                PasswordHash = "password"
            };

            _userRepoMock.Setup(r => r.GetByEmailAsync("test@example.com")).ReturnsAsync(user);
            _jwtServiceMock.Setup(j => j.GenerateAccessToken(user)).Returns("access_token");
            _jwtServiceMock.Setup(j => j.GenerateRefreshToken()).Returns("refresh_token");

            _userRepoMock.Setup(r => r.UpdateAsync(It.IsAny<User>())).ReturnsAsync(true);

            var result = await _authService.LoginAsync(new LoginDto
            {
                Email = "test@example.com",
                Password = "password"
            });

            Assert.IsNotNull(result);
            Assert.AreEqual("access_token", result.AccessToken);
            Assert.AreEqual("refresh_token", result.RefreshToken);
        }

        [Test]
        public async Task LoginAsync_ReturnsNull_WhenUserNotFound()
        {
            _userRepoMock.Setup(r => r.GetByEmailAsync("notfound@example.com"))
                         .ReturnsAsync((User)null);

            var result = await _authService.LoginAsync(new LoginDto
            {
                Email = "notfound@example.com",
                Password = "any"
            });

            Assert.IsNull(result);
        }

        [Test]
        public async Task LoginAsync_ReturnsNull_WhenPasswordIsIncorrect()
        {
            var user = new User
            {
                Email = "test@example.com",
                PasswordHash = "correct-password"
            };

            _userRepoMock.Setup(r => r.GetByEmailAsync("test@example.com")).ReturnsAsync(user);

            var result = await _authService.LoginAsync(new LoginDto
            {
                Email = "test@example.com",
                Password = "wrong-password"
            });

            Assert.IsNull(result);
        }

        [Test]
        public async Task LoginAsync_CallsUpdateAsync_WhenLoginSuccessful()
        {
            var user = new User
            {
                Email = "test@example.com",
                PasswordHash = "password"
            };

            _userRepoMock.Setup(r => r.GetByEmailAsync("test@example.com")).ReturnsAsync(user);
            _jwtServiceMock.Setup(j => j.GenerateAccessToken(It.IsAny<User>())).Returns("token");
            _jwtServiceMock.Setup(j => j.GenerateRefreshToken()).Returns("refresh");

            _userRepoMock.Setup(r => r.UpdateAsync(It.IsAny<User>())).ReturnsAsync(true);

            await _authService.LoginAsync(new LoginDto
            {
                Email = "test@example.com",
                Password = "password"
            });

            _userRepoMock.Verify(r => r.UpdateAsync(It.Is<User>(u => u.RefreshToken == "refresh")), Times.Once);
        }
    }
}
