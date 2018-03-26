using System;
using System.Collections.Generic;

namespace WebApplication.Entity.Auth
{
    public class Actor
    {
        public Int32 Id { get; set; }

        public virtual ICollection<Claim> Claims { get; set; }
    }
}
