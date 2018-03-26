using System;
using System.Collections.Generic;
using System.Linq;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using WebApplication.Entity;
using WebApplication.Entity.EntityFramework;
using WebApplication.Entity.ShoppingList;

namespace WebApplication.Services
{
    public class SMSNotificationService
    {
        private readonly PhoneNumber _twilioNumber;
        private readonly String _accountSid;
        private readonly String _authToken;
        private readonly ApplicationDbContext _dbContext;

        public SMSNotificationService(ApplicationDbContext dbContext)
        {
            _accountSid = "AC8c4d702dbccef90e7486cb48792758a8";
            _authToken = "b7baeb2561152cd2a36eb8a91a308e21";
            _twilioNumber = "+18504041981";
            _dbContext = dbContext;
            TwilioClient.Init(_accountSid, _authToken);
        }

        private void SendMessage(String destinationNumber, String messageBody)
        {
            var to = new PhoneNumber(destinationNumber);
            var message = MessageResource.Create(to, from: _twilioNumber, body: messageBody);
        }

        private IQueryable<String> GetPhones()
        {
            return _dbContext.Claims
                .Where(e => e.ClaimTypeId == (Int32)ClaimTypes.Phone)
                .Select(e => e.Value);
        }

        public void NotifyItemsClosed(List<Item> items)
        {
            Int32 ownedById = items[0].OwnedById;
            String closedByUsername = _dbContext.Claims
                .Where(e => e.ActorId == ownedById)
                .Where(e => e.ClaimTypeId == (Int32)ClaimTypes.Username)
                .Select(e => e.Value)
                .Single();
            var message = $"Items closed by {closedByUsername} on { items[0].ModifiedOn }\n Items: {items[0].Name}";
            items.RemoveAt(0);
            foreach (var item in items)
            {
                message += $", {item.Name}";
            }
            message += ".";
            var phones = GetPhones().ToArray();
            foreach (var phone in phones)
            {
                SendMessage(phone, message);
            }
        }

        public void NotifyItemCreated(Item newItem)
        {
            var createdByUsername = _dbContext.Claims
                .Where(e => e.ActorId == newItem.CreatedById)
                .Where(e => e.ClaimTypeId == (Int32)ClaimTypes.Username)
                .Select(e => e.Value)
                .Single();
            var message = $"New item created by {createdByUsername}. on {newItem.CreatedOn}\n" +
                $"name: {newItem.Name}, description: {newItem.Description}";
            var phones = GetPhones().ToArray();
            foreach (var phone in phones)
            {
                SendMessage(phone, message);
            }
        }
    }
}
