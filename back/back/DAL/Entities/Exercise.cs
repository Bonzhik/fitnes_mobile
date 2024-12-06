using Common.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Exercise : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public User CreatedBy {  get; set; }
        public ICollection<Training> Trainings { get; set; }
    }
}
