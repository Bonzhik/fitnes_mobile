using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Dtos.Auth
{
    public class RegisterDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public Gender Gender { get; set; }
        public float Height { get; set; }
        public float Weigth { get; set; }
        public int CategoryId { get; set; }
    }

    public enum Gender
    {
        MALE,
        FEMALE
    }
}
