namespace OfficeMap.Models
{
    public partial class Password
    {
        public Password()
        {
        }

        public int Id { get; set; }
        public string HashValue { get; set; }
    }
}