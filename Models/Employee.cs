using System;
using System.Collections.Generic;

namespace OfficeMap.Models
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Team { get; set; }
        public string Direction { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public int PositionId { get; set; }
        public int PhotoId { get; set; }
        public int? DeskId { get; set; }
        public int? PasswordId { get; set; }

        public virtual Desk Desk { get; set; }
        public virtual Photo Photo { get; set; }
        public virtual Position Position { get; set; }
        public virtual Password Password { get; set; }
    }
}