using System;

namespace WebApplication.Entity.Auth
{
    public class Claim
    {
        public Int32 Id { get; set; }
        public String Value { get; set; }

        public Int32 ActorId { get; set; }
        public virtual Actor Actor { get; set; }
        public Int32 ClaimTypeId { get; set; }
        public virtual ClaimType ClaimType { get; set; }
    }
}
