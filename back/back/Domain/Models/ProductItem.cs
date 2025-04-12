using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class ProductItem : BaseEntity
    {
        public virtual Product Product { get; set; }
        public int Count { get; set; }
    }
}
