using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dtos.Write
{
    public class DayW
    {
        public DateTime DayDate { get; set; }
        public long[,] ProductIds { get; set; }
        public long[] TrainingIds { get; set; }
    }
}
