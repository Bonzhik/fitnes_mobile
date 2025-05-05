using Business.Dtos.Read;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Interfaces
{
    public interface IProductService
    {
        Task<ICollection<ProductItemR>> GetByDayIdAsync(long dayId);
        Task<ICollection<ProductR>> GetAllAsync();
        Task<ICollection<ProductR>> GetByNameAsync(string name);
    }
}
