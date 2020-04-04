using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using OfficeMap.Models;

namespace OfficeMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        OfficeMapDbContext db;

        public EmployeesController(OfficeMapDbContext context)
        {
            db = context;
        }
        
        [HttpGet]
        public IEnumerable<Employee> GetAllEmployees()
        {
            return db.Employees
                .Include(emp => emp.Position)
                .Include(emp => emp.Desk)
                .Include(emp => emp.Photo)
                .ToList();
        }

        [HttpGet("{substring}")]
        public IEnumerable<Employee> GetEmployeesBySubstring(string substring)
        {
            var employees = db.Employees
                .Where(emp =>
                    emp.LastName.Contains(substring) ||
                    emp.FirstName.Contains(substring) ||
                    emp.MiddleName.Contains(substring));

            return employees
                .Include(emp => emp.Position)
                .Include(emp => emp.Desk)
                .Include(emp => emp.Photo)
                .ToList();
        }
    }
}