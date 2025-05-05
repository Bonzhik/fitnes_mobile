using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        IQueryable<ProductItem> GetByDayId(long dayId);
        IQueryable<Product> GetByName(string name);
    }
}
