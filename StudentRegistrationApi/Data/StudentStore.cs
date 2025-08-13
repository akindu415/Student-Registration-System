using StudentRegistrationApi.Models;
using StudentRegistrationApi.Models.StudentDto;

namespace StudentRegistrationApi.Data
{
    public static class StudentStore
    {
        public static List<StudentDto> StudentList = new List<StudentDto>
            {
                new StudentDto
                {
                    Id = 1,
                    FullName = "John Doe",
                    Address = "123 Main St",
                    DateOfBirth = new DateTime(2000, 1, 1),
                    Gender = "Male",
                    Email = "jhond@example.com",
                    TelephoneNumber = 0782345673
                },
                new StudentDto
                { 
                    Id = 2,
                    FullName = "Jane Smith",
                    Address = "456 Elm St",
                    DateOfBirth = new DateTime(2001, 2, 2),
                    Gender = "Male",
                    Email ="jane@example.com",
                    TelephoneNumber = 0782665674
                }
            };

    }

}