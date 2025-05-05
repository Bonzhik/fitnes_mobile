using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dtos.Read
{
    public class ProductItemR
    {
        public ProductR Product { get; set; }
        public int Count { get; set; }
    }
}
