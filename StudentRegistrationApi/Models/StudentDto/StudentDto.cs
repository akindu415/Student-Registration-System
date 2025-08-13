using System.ComponentModel.DataAnnotations;

namespace StudentRegistrationApi.Models.StudentDto
{
    public class StudentDto
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }
        
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string Gender { get; set; }
        public string Email { get; set; }
        [Required]
        public int TelephoneNumber { get; set; }
        
     } 
}
