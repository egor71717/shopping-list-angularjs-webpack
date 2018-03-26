using Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using WebApplication.Entity.Auth;
using WebApplication.Entity.ShoppingList;

namespace WebApplication.Entity.EntityFramework
{
    class DbInitializer : CreateDatabaseIfNotExists<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            #region shopping-list items
            var items = new List<Item>()
            {
                new Item()
                {
                    Name = "3-port USB charger",
                    Description = "This USB charger lets you charge up to 3 devices " +
                    "at the same time so you spend less time looking for available chargers. " +
                    "KOPPLA series supports your electrical needs and gives you power where you need it",
                    Status = ItemStatus.opened.ToString()
                },
                new Item()
                {
                    Name = "Extension cord, ungrounded white",
                    Description = "When your nearest wall plug is really far away, this 11'" +
                    " ungrounded extension cord comes to the rescue. KOPPLA series supports" +
                    " your electrical needs and gives you power where you need it.",
                    Status = ItemStatus.opened.ToString()
                },
                new Item()
                {
                    Name = "Cable management bag, white",
                    Description = "Keep your room looking neat and organized by hiding cords, " +
                    "power strips and extension cords inside the bag.",
                    Status = ItemStatus.opened.ToString()
                },
                new Item()
                {
                    Name = "Work lamp with wireless charging, white",
                    Description = "The simple, oversized metal shape is inspired by old lamps from " +
                    "places like factories and theaters. Used together, HEKTAR lamps support different " +
                    "activities and create a unified, rustic look in the room.",
                    Status = ItemStatus.closed.ToString()
                },
                new Item()
                {
                    Name = "Rechargeable battery",
                    Description = "Reduce waste and save money by recharging your batteries. " +
                    "Charging and re-using batteries is a good choice for the environment and practical, " +
                    "since you always have batteries at hand when you need them.",
                    Status = ItemStatus.closed.ToString()
                },
                new Item()
                {
                    Name = "Integrated wireless charger, black",
                    Description = "You can easily charge your smartphone wirelessly. " +
                    "If your phone supports wireless charging, just place it on the charger." +
                    "If not, you will need to purchase a wireless charging cover.",
                    Status = ItemStatus.opened.ToString()
                }
            };
            context.Items.AddRange(items);
            context.SaveChanges();
            #endregion

            #region claim types
            var claimTypes = new Dictionary<String, ClaimType>()
            {
                {
                    "Password",
                    new ClaimType() { Id = (Int32)ClaimTypes.Password, Name = ClaimTypes.Password.ToString() }
                },
                {
                    "Phone",
                    new ClaimType() { Id = (Int32)ClaimTypes.Phone, Name = ClaimTypes.Phone.ToString(), IsMultiple = true }
                },
                {
                    "Basket",
                    new ClaimType() { Id = (Int32)ClaimTypes.Basket, Name = ClaimTypes.Basket.ToString() }
                },
                {
                    "Username",
                    new ClaimType() { Id = (Int32)ClaimTypes.Username, Name = ClaimTypes.Username.ToString() }
                }
            };
            context.ClaimTypes.AddRange(claimTypes.Values);
            context.SaveChanges();
            #endregion
        }
    }
}
