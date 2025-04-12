using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Feedback : BaseEntity
    {
        public int Score { get; set; }
        public virtual ICollection<User> Users { get; set; } = [];
        public virtual ICollection<ProfileComments> ProfileComments { get; set; } = [];
        public virtual ICollection<TrainingComments> Feedbacks { get; set; } = [];
    }
}
