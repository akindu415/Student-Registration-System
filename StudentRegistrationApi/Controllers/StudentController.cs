using Microsoft.AspNetCore.Mvc;
using StudentRegistrationApi.Data;
using StudentRegistrationApi.Models;
using StudentRegistrationApi.Models.StudentDto;

namespace StudentRegistrationApi.Controllers
{
    [Route("api/students")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public StudentController(ApplicationDbContext db)
        {
            _db = db;
        }

        //get all students
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult <IEnumerable<StudentDto>> GetStudents()
        {
            return Ok (_db.Students.ToList());
        }

        //get students by id
        [HttpGet("{id:int}", Name ="GetStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]

        public ActionResult <StudentDto> GetStudent(int id) 
        {
            if(id <= 0)
            {
                return BadRequest("Invalid student ID.");
            }
            var student = _db.Students.FirstOrDefault(u=>u.Id==id);
            if(id == null)
            {
                return NotFound("Student not found.");   
            }

            return Ok(student);
        }

        //create a new student
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult <Student> CreateStudent([FromBody]StudentDto studenDto)//frombody is the object that is recived
        { 
            if(_db.Students.FirstOrDefault(u=>u.Email.ToLower() == studenDto.Email.ToLower()) != null)
            {
                return BadRequest("Email already exists.");
            }
            if (studenDto == null)
            { 
                return BadRequest("Student data is required.");
            }
            if (studenDto.Id > 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            Student model = new()
            {
                FullName = studenDto.FullName,
                Address = studenDto.Address,
                DateOfBirth = studenDto.DateOfBirth,
                Gender = studenDto.Gender,
                Email = studenDto.Email,
                TelephoneNumber = studenDto.TelephoneNumber
            };
            _db.Students.Add(model);
            _db.SaveChanges();


            return CreatedAtRoute("GetStudent",studenDto);
        }


        //delete a student
        [HttpDelete("{id:int}", Name = "DelStudent")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteStudent(int id)
        {
            if (id == 0)
            {
                return BadRequest("Invalid student ID.");
            }
            var student = _db.Students.FirstOrDefault(u => u.Id == id);
            if (student == null)
            {
                return NotFound();
            }

            _db.Students.Remove(student);
            _db.SaveChanges();
            return NoContent();
        }

        //update a student
        [HttpPut("{id:int}", Name = "UpdateStudent")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult UpdateStudent(int id, [FromBody] StudentDto studentDto)
        {
            if (studentDto == null ||id != studentDto.Id )
            {
                return BadRequest("Invalid student ID.");
            }
           
            
            //student.FullName = studentDto.FullName;
            //student.Address = studentDto.Address;
            //student.DateOfBirth = studentDto.DateOfBirth;
            //student.Email = studentDto.Email;
            //student.Address = studentDto.Address;
            //student.TelephoneNumber = studentDto.TelephoneNumber;   

            Student model = new()
            {
                FullName = studentDto.FullName,
                Address = studentDto.Address,
                DateOfBirth = studentDto.DateOfBirth,
                Gender = studentDto.Gender,
                Email = studentDto.Email,
                TelephoneNumber = studentDto.TelephoneNumber
            };
            _db.Students.Update(model);
            _db.SaveChanges();

            return NoContent();

        }


    }
}
