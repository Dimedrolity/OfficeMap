using System;
using System.Collections.Generic;

namespace OfficeMap.Models
{
    public partial class Desk
    {
        public Desk()
        {
        }

        public int Id { get; set; }
        public int FloorNumber { get; set; }
        public int XCoordinate { get; set; }
        public int YCoordinate { get; set; }

        public virtual Employee Employee { get; set; }
    }
}
