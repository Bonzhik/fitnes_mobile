using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dtos.Write
{
    public class TrainingW
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public long[] ExerciseIds { get; set; }
        public long CategoryId { get; set; }
    }
}
