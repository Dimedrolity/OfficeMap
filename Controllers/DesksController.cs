using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using OfficeMap.Models;

namespace OfficeMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DesksController : ControllerBase
    {
        OfficeMapDbContext db;

        public DesksController(OfficeMapDbContext context)
        {
            db = context;
        }

        [HttpGet("on-floor/{floorNumber}")]
        public IEnumerable<Employee> GetDesksByFloorNumber(int floorNumber)
        {
            return db.Employees
                .Include(emp => emp.Desk)
                .Where(emp => emp.Desk.FloorNumber == floorNumber)
                .ToList();
        }
    }
}
