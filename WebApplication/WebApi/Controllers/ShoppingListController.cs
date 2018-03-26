using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using WebApplication.Entity.EntityFramework;
using WebApplication.Entity.ShoppingList;
using WebApplication.Models;
using WebApplication.Services;

namespace WebApi.Controllers
{
    public class ShoppingListController : ApiController
    {
        private readonly Boolean EnableNotifications = false;
        private readonly ApplicationDbContext DbContext;
        private readonly SMSNotificationService SMSNotificationService;

        public ShoppingListController()
            :base()
        {
            DbContext = SingletonFactoryService.GetContext();
            SMSNotificationService = SingletonFactoryService.GetSmsNotificationService();
        }

        [HttpGet]
        [Route("api/list/items/getall")]
        public IHttpActionResult GetItems()
        {
            var items = DbContext.Items.ToArray();
            return Json(items);
        }

        [HttpGet]
        [Route("api/list/items/getbasket")]
        public IHttpActionResult GetBasket(Int32 basketId)
        {
            var basketItems = DbContext.Items
                .Where(e => e.BasketId == basketId)
                .ToArray();
            return Json(basketItems);
        }

        [HttpPost]
        [Route("api/list/items/create")]
        public IHttpActionResult CreateItem([FromBody]Item item)
        {
            Int32 CreatedById = item.CreatedById; //todo: get from token in request headers
            if (CreatedById == 0)
                return BadRequest("No current user defined. try to relogin");
            var newItem = new Item()
            {
                Name = item.Name,
                Description = item.Description,
                Status = ItemStatus.opened.ToString(),
                CreatedById = CreatedById
            };
            DbContext.Items.Add(newItem);
            DbContext.SaveChanges();
            if(EnableNotifications)
                SMSNotificationService.NotifyItemCreated(newItem);
            return Json(newItem);
        }

        [HttpPost]
        [Route("api/list/items/close")]
        public IHttpActionResult CloseItems([FromBody]CloseItemsModel model)
        {
            var dbItems = new List<Item>();    
            foreach (var itemId in model.ItemIds)
            {
                var dbItem = DbContext.Items
                                  .Where(e => e.Id == itemId)
                                  .SingleOrDefault();
                if (dbItem == null)
                    return NotFound();
                dbItems.Add(dbItem);
            }
            foreach (var item in dbItems)
            {
                item.ModifiedOn = DateTimeOffset.Now;
                item.Status = ItemStatus.closed.ToString();
                item.BasketId = 0;
                item.OwnedById = model.ActorId;
            }
            DbContext.SaveChanges();
            if(EnableNotifications)
                SMSNotificationService.NotifyItemsClosed(dbItems);
            return Ok();
        }

        [HttpPost]
        [Route("api/list/items/update")]
        public IHttpActionResult UpdateItem([FromBody]Item item)
        {
            var dbItem = DbContext.Items
                                  .Where(e => e.Id == item.Id)
                                  .SingleOrDefault();
            if (dbItem == null)
                return NotFound();

            dbItem.ModifiedOn = DateTimeOffset.Now;
            dbItem.Name = item.Name;
            dbItem.Description = item.Description;
            dbItem.Status = item.Status;
            dbItem.BasketId = item.BasketId;
            DbContext.SaveChanges();
            return Ok();
        }
    }
}
