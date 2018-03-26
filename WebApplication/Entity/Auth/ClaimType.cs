using System;
using System.Collections.Generic;

namespace WebApplication.Entity.Auth
{
    public class ClaimType
    {
        public Int32 Id { get; set; }
        public String Name { get; set; }
        public Boolean IsMultiple { get; set; }

        public virtual ICollection<Claim> Claims { get; set; }
    }
}
