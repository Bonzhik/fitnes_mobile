using Business.Dtos.Read;
using Business.Services.Interfaces;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
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

        public async Task<ICollection<ProductR>> GetAllAsync()
        {
            var products = _productRepository.GetAllAsync();

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

        public async Task<ICollection<ProductItemR>> GetByDayIdAsync(long dayId)
        {
            var productItemsQuery = _productRepository.GetByDayId(dayId);

            var productItems = await productItemsQuery
                .Include(pi => pi.Product)
                .ToListAsync();

            var productDtos = productItems.Select(pi => new ProductItemR
            {
                Product = new ProductR
                {
                    Id = pi.Product.Id,
                    Name = pi.Product.Name,
                    Proteins = pi.Product.Proteins,
                    Fats = pi.Product.Fats,
                    Carbohydrates = pi.Product.Carbohydrates,
                    Kcals = pi.Product.Kcals
                },
                Count = (int)pi.Count
            }).ToList();

            return productDtos;
        }

        public async Task<ICollection<ProductR>> GetByNameAsync(string name)
        {
            var products = _productRepository.GetByName(name);

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
