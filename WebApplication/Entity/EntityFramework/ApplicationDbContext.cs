using System;
using System.Data.Entity;
using WebApplication.Entity.Auth;
using WebApplication.Entity.ShoppingList;

namespace WebApplication.Entity.EntityFramework
{
    public class ApplicationDbContext: DbContext
    {
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Claim> Claims { get; set; }
        public DbSet<ClaimType> ClaimTypes { get; set; }
        public DbSet<Item> Items { get; set; }

        public ApplicationDbContext(String connection, Environment env)
            : base(connection)
        {
            if(env == Environment.Dev)
            {
                Database.SetInitializer(new DbInitializer());
            }
        }
    }
}
