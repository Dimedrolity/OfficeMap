﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using OfficeMap.Models;

namespace OfficeMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : ControllerBase
    {
        private readonly OfficeMapDbContext _db;

        public EmployeesController(OfficeMapDbContext context)
        {
            _db = context;
        }
        
        [HttpGet("starts-with/{startOfName}")]
        public IEnumerable<Employee> GetEmployeesBySubstring(string startOfName)
        {
            var employees = _db.Employees
                .Where(emp =>
                    emp.LastName.ToLower().StartsWith(startOfName.ToLower()) ||
                    emp.FirstName.ToLower().StartsWith(startOfName.ToLower()));

            return employees
                .Include(emp => emp.Position)
                .Include(emp => emp.Desk)
                .Include(emp => emp.Photo)
                .ToList();
        }
        
        [HttpGet("by-desk-id/{deskId}")]
        public IEnumerable<Employee> GetEmployeeByDeskId(int deskId)
        {
            return _db.Employees
                .Where(emp => emp.DeskId == deskId)
                .Include(emp => emp.Desk)
                .Include(emp => emp.Position)
                .Include(emp => emp.Photo)
                .ToList();
        }
    }
}