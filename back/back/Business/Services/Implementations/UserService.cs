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
                Gender = (Domain.Models.Gender)registerDto.Gender,
                Description = registerDto.Description,
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
            const float HEIGHT_MULTIPLIER = 1.0f;
            const float WEIGHT_MULTIPLIER = 0.4f;
            float delta = 5f;

            var currentUser = await _userRepository.GetByIdAsync(userId);
            if (currentUser == null) return new List<UserR>();

            var allUsers = _userRepository.GetAllAsync();
            var selectedUsers = new List<User>();
            var selectedIds = new HashSet<long>();

            var staticFilters = new List<Func<User, bool>>
            {
                u => u.Id != userId,
                u => u.Gender == currentUser.Gender
            };

            var dynamicFilters = new List<Func<User, bool>>
            {
                u => Math.Abs(u.Height - currentUser.Height) <= delta * HEIGHT_MULTIPLIER,
                u => Math.Abs(u.Weigth - currentUser.Weigth) <= delta * WEIGHT_MULTIPLIER
            };

            bool loosenStatic = false;

            while (selectedUsers.Count < GOAL_COUNT && delta <= MAX_DELTA)
            {
                var filtered = allUsers
                    .Where(u =>
                        (loosenStatic || staticFilters.All(f => f(u))) &&
                        dynamicFilters.All(f => f(u)) &&
                        !selectedIds.Contains(u.Id))
                    .OrderByDescending(u => u.Rating ?? 0)
                    .Take(GOAL_COUNT - selectedUsers.Count)
                    .ToList();

                foreach (var user in filtered)
                {
                    if (selectedIds.Add(user.Id))
                        selectedUsers.Add(user);
                }

                delta += 5f;

                if (delta >= 30f)
                    loosenStatic = true;

                dynamicFilters = new List<Func<User, bool>>
                {
                    u => Math.Abs(u.Height - currentUser.Height) <= delta,
                    u => Math.Abs(u.Weigth - currentUser.Weigth) <= delta
                };
            }

            if (selectedUsers.Count < GOAL_COUNT)
            {
                var fallback = allUsers
                    .Where(u => !selectedIds.Contains(u.Id))
                    .OrderByDescending(u => u.Rating ?? 0)
                    .Take(GOAL_COUNT - selectedUsers.Count)
                    .ToList();

                foreach (var user in fallback)
                {
                    if (selectedIds.Add(user.Id))
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
                Description = user.Description,
                Gender = (Dtos.Read.Gender)user.Gender,
                Rating = (float)(user.Rating ?? 0),
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
                Description = user.Description,
                Gender = (Dtos.Read.Gender) user.Gender,
                Rating = (float)user.Rating,
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
