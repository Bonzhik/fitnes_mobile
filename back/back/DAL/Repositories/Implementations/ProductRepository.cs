using DAL.Context;
using DAL.Repositories.Interfaces;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Implementations
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(ApplicationDbContext db) : base(db)
        {
        }

        public IQueryable<Product> GetByDayId(long dayId)
        {
            return _db.Days.Where(d => d.Id == dayId).SelectMany(d => d.Products);
        }

        public IQueryable<Product> GetByName(string name)
        {
            return _db.Products.Where(p => p.Name.Contains(name));
        }
    }
}
