using Common.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Services
{
    public class PaginationService
    {
        public PaginationResponse<T> Paginate<T>(IQueryable<T> source, PaginationRequest paginationRequest)
        {
            var totalCount = source.Count();
            var data = source.Skip((paginationRequest.Page - 1) * paginationRequest.PageSize).Take(paginationRequest.PageSize);

            return new PaginationResponse<T>
            {
                Data = data,
                TotalCount = totalCount,
                PageSize = paginationRequest.PageSize,
                CurrentPage = paginationRequest.Page
            };
        }
    }
}
