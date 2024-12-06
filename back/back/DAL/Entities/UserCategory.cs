using Common.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class UserCategory : BaseEntity
    {
        public string CategoryName { get; set; }
        public ICollection<User> Users { get; set; }
    }
}
