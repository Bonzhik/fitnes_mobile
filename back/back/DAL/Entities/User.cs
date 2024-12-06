using Common.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        public string PasswordHash {  get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public float Height { get; set; }
        public float Weigth { get; set; }
        public UserCategory UserCategory { get; set; }
        public Planner Planner { get; set; }
        public ICollection<Training> CreatedTrainings { get; set; } = [];
        public ICollection<Exercise> CreatedExercises { get; set; } = [];
        public ICollection<Training> Trainings { get; set; } = [];
        public ICollection<ProfileComments> ThisProfileComments { get; set; } = [];
        public ICollection<ProfileComments> ProfileComments { get; set; } = [];
        public ICollection<TrainingComments> TrainingComments { get; set; } = [];
    }
}
