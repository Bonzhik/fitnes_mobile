using Business.Dtos.Read;
using Business.Services.Interfaces;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ICollection<ProductR>> GetByDayIdAsync(long dayId)
        {
            var products = _productRepository.GetByDayId(dayId);

            List<ProductR> productDtos = [];

            foreach (var product in products)
            {
                productDtos.Add(new ProductR
                {
                    Id = product.Id,
                    Name = product.Name,
                    Proteins = product.Proteins,
                    Fats = product.Fats,
                    Carbohydrates = product.Carbohydrates,
                    Kcals = product.Kcals,
                });
            }

            return productDtos;
        }
    }
}
