using Business.Dtos.Auth;
using Business.Dtos.Read;
using Business.Services.Interfaces;
using DAL.Repositories.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserCategoryRepository _userCategoryRepository;

        public UserService(IUserRepository userRepository, IUserCategoryRepository userCategoryRepository)
        {
            _userRepository = userRepository;
            _userCategoryRepository = userCategoryRepository;
        }

        public async Task<bool> CreateUserAsync(RegisterDto registerDto)
        {
            if (await _userRepository.IsExistsByEmai(registerDto.Email))
            {
                return false;
            }

            var user = new User()
            {
                Email = registerDto.Email,
                PasswordHash = registerDto.Password, 
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Height = registerDto.Height,
                Weigth = registerDto.Weigth,
                UserCategory = await _userCategoryRepository.GetByIdAsync(registerDto.CategoryId)
            };

            return await _userRepository.AddAsync(user);
        }

        public async Task<ICollection<UserR>> GetFiltered(long userId)
        {
            const int GOAL_COUNT = 10;
            const float MAX_DELTA = 50f;
            float delta = 5f;

            var currentUser = await _userRepository.GetByIdAsync(userId);
            var allUsers = _userRepository.GetAllAsync()
                .Where(u => u.Id != userId && u.Gender == currentUser.Gender);

            var selectedUsers = new List<User>();
            var selectedUserIds = new HashSet<long>();

            while (selectedUsers.Count < GOAL_COUNT && delta <= MAX_DELTA)
            {
                var batch = await allUsers
                    .Where(u =>
                        Math.Abs(u.Height - currentUser.Height) <= delta &&
                        Math.Abs(u.Weigth - currentUser.Weigth) <= delta &&
                        !selectedUserIds.Contains(u.Id))
                    .OrderByDescending(u => u.Rating ?? 0)
                    .Take(GOAL_COUNT - selectedUsers.Count)
                    .ToListAsync();

                foreach (var user in batch)
                {
                    if (selectedUserIds.Add(user.Id))
                        selectedUsers.Add(user);
                }

                delta += 5f;
            }

            if (selectedUsers.Count < GOAL_COUNT)
            {
                var fallback = await allUsers
                    .Where(u => !selectedUserIds.Contains(u.Id))
                    .OrderByDescending(u => u.Rating ?? 0)
                    .Take(GOAL_COUNT - selectedUsers.Count)
                    .ToListAsync();

                foreach (var user in fallback)
                {
                    if (selectedUserIds.Add(user.Id))
                        selectedUsers.Add(user);
                }
            }

            return selectedUsers.Select(user => new UserR
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Height = user.Height,
                Weigth = user.Weigth,
                CategoryR = new UserCategoryR
                {
                    Id = user.UserCategory.Id,
                    CategoryName = user.UserCategory.CategoryName
                }
            }).ToList();
        }

        public async Task<UserR> GetUserByIdAsync(long userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
            {
                return null;
            }

            var category = await _userCategoryRepository.GetByUser(userId);

            var result = new UserR
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Height = user.Height,
                Weigth = user.Weigth,
                CategoryR = new UserCategoryR
                {
                    Id = category.Id,
                    CategoryName = category.CategoryName
                }
            };

            return result;
        }
    }
}
