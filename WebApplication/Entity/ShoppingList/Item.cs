using System;
using WebApplication.Entity.Auth;

namespace WebApplication.Entity.ShoppingList
{
    public class Item
    {
        public Item()
        {
            CreatedOn = DateTimeOffset.Now;
            ModifiedOn = DateTimeOffset.Now;
        }

        public Int32 Id { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
        public DateTimeOffset ModifiedOn { get; set; }
        public String Name { get; set; }
        public String Description { get; set; }
        public String Status { get; set; }

        public Int32 BasketId { get; set; }

        public Int32 CreatedById { get; set; }
        //public virtual Actor CreatedBy { get; set; }
        public Int32 OwnedById { get; set; }
        //public virtual Actor OwnedBy { get; set; }
    }
}
