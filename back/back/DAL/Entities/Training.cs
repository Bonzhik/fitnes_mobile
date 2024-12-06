using Common.Classes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Training : BaseEntity
    {
        public User CreatedBy { get; set; }
        public ICollection<User> Users { get; set; } = [];
        public ICollection<TrainingComments> Comments { get; set; } = [];
        public TrainingCategory TrainingCategory { get; set; }
        public ICollection<Exercise> Exercises { get; set; } = [];
        public ICollection<Day> Days {  get; set; } = [];
    }
}
