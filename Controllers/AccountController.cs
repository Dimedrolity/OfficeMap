using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using OfficeMap.Models;

namespace OfficeMap.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly OfficeMapDbContext _db;

        public AccountController(OfficeMapDbContext context)
        {
            _db = context;
        }
        
        [HttpPost("token")]
        public async Task Token()
        {
            var login = Request.Form["login"];
            var typedPasswordHash = Request.Form["password"];
            
            var employee = GetEmployeeByEmail(login);
            
            if (employee == null || typedPasswordHash != employee.Password.HashValue)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен

            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.Issuer,
                audience: AuthOptions.Audience,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.Lifetime)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                login = employee.EmailAddress
            };

            // сериализация ответа
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response,
                new JsonSerializerSettings {Formatting = Formatting.Indented}));
        }
        
        private Employee GetEmployeeByEmail(string email)
        {
            var employees = _db.Employees
                .Include(emp => emp.Password);
            return employees.FirstOrDefault(emp => emp.EmailAddress == email);
        }
    }
}