using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public interface ICommentWithRating
    {
        public int Rating { get; set; }
    }
}
