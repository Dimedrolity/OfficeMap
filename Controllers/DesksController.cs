using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
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
        public IEnumerable<Desk> GetDesksByFloorNumber(int floorNumber)
        {
            return db.Desks
                .Where(desk => desk.FloorNumber == floorNumber)
                .Include(desk => desk.Employee)
                .ToList();
        }

        [HttpGet("free")]
        public IEnumerable<Desk> GetFreeDesks()
        {
            return db.Desks
                .Where(desk => desk.Employee == null)
                .ToList();
        }
    }
}