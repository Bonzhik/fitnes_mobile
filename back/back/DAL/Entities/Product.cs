using Common.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }    
        public int Proteins { get; set; }
        public int Fats { get; set; }
        public int Carbohydrates {  get; set; }
        public int Kcals { get; set; }
        public ICollection<Day> Days { get; set; }
    }
}
