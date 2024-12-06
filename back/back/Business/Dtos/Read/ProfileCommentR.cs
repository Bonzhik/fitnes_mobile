using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dtos.Read
{
    public class ProfileCommentR
    {
        public long Id { get; set; }
        public string Text { get; set; }
        public UserR UserR { get; set; }
    }
}
