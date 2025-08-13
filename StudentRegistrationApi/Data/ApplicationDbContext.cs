
using Microsoft.EntityFrameworkCore;
using StudentRegistrationApi.Models;
namespace StudentRegistrationApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().HasData(
                new Student()
                {
                    Id = 1,
                    FullName = "John Doe",
                    Address = "123 Main St, Springfield",
                    DateOfBirth = new DateTime(2000, 1, 1),
                    Gender = "Male",
                    Email = "jhondoe@gmail.com",
                    TelephoneNumber = 1234567890,
                    CreatedDate = DateTime.Now

                },

                new Student()
                {
                    Id = 2,
                    FullName = "ana maria",
                    Address = "415 Main St, Springfield",
                    DateOfBirth = new DateTime(2000, 1, 1),
                    Gender = "Male",
                    Email = "e@gmail.com",
                    TelephoneNumber = 765678989,
                    CreatedDate = DateTime.Now
                },
                new Student()
                {
                    Id = 3,
                    FullName = "logan",
                    Address = "415 miami,california",
                    DateOfBirth = new DateTime(2000, 1, 1),
                    Gender = "Female",
                    Email = "l@gmail.com",
                    TelephoneNumber = 765678789,
                    CreatedDate = DateTime.Now
                }
                );
        }
    }
}
