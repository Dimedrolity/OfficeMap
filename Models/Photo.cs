using System;
using System.Collections.Generic;

namespace OfficeMap.Models
{
    public partial class Photo
    {
        public Photo()
        {
            Employee = new HashSet<Employee>();
        }

        public int Id { get; set; }

        public virtual ICollection<Employee> Employee { get; set; }
    }
}
