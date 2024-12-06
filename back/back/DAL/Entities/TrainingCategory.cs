using Common.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class TrainingCategory : BaseEntity
    {
        public string CategoryName { get; set; }
        public ICollection<Training> Trainings { get; set; }
    }
}
