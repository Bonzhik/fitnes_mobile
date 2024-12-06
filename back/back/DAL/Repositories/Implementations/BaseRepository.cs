using DAL.Context;
using DAL.Repositories.Interfaces;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Implementations
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected readonly ApplicationDbContext _db;

        public BaseRepository(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<bool> AddAsync(T entity)
        {
            await _db.Set<T>().AddAsync(entity);
            return await SaveAsync();
        }

        public async Task<bool> DeleteAsync(T entity)
        {
            entity.IsDeleted = true; 

            _db.Update(entity);

            return await SaveAsync();
        }

        public async Task<IQueryable<T>> GetAllAsync()
        {
            return _db.Set<T>().Where(e => e.IsDeleted == false);
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _db.Set<T>().FindAsync(id);
        }

        public async Task<bool> SaveAsync()
        {
            try
            {
                return await _db.SaveChangesAsync() > 0;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(T entity)
        {
            _db.Set<T>().Update(entity);
            return await SaveAsync();
        }
    }
}
