using Common.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Day : BaseEntity
    {
        public Planner Planner { get; set; }
        public ICollection<Product> Products { get; set; } = [];
        public ICollection<Training> Trainings { get; set; } = [];
    }
}
