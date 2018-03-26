using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using WebApplication.Entity.Auth;
using WebApplication.Entity.EntityFramework;
using WebApplication.Models;

namespace WebApplication.Services
{
    public class IdentityService
    {
        private readonly ApplicationDbContext dbContext;

        public IdentityService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public ClaimsIdentity ClaimIdentity(LoginModel model)
        {
            Int32 actorId = GetActorIdByUsername(username: model.Login);
            if (actorId == 0)
                return null;
            if (!VerifyPassword(actorId, model.Password))
                return null;

            Int32 basketClaimId = GetBasketClaimId(actorId);
            String username = GetUsername(actorId);
            var userdata = JsonConvert.SerializeObject(new
            {
                BasketClaimId = basketClaimId,
                Username = username
            });
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new List<System.Security.Claims.Claim>()
            {
                new System.Security.Claims.Claim(ClaimTypes.Actor, actorId.ToString()),
                new System.Security.Claims.Claim(ClaimTypes.UserData, userdata)
            }, "Custom");
            return claimsIdentity;
        }
        public ClaimsIdentity Register(RegisterModel model)
        { 
            //todo: Password security validation
            Boolean exists = GetActorIdByUsername(username: model.Login) != 0;
            if (!exists)
            {
                CreateActor(model);
                return ClaimIdentity(new LoginModel()
                {
                    Login = model.Login,
                    Password = model.Password
                });
            }
            return null;
        }

        private void CreateActor(RegisterModel model)
        {
            //todo: error? learn more about Add return val
            Actor actor = new Actor();
            dbContext.Actors.Add(actor);
            dbContext.SaveChanges();
            CreateActorClaims(model, actor);
        }
        private void CreateActorClaims(RegisterModel model, Actor actor)
        {
            var claims = new List<Entity.Auth.Claim>()
            {
                CreatePasswordClaim(actor, model.Password),
                CreateBasketClaim(actor),
                CreateUsernameClaim(actor, username: model.Login),
                CreatePhoneClaim(actor, phone: model.Phone)
            };
            dbContext.Claims.AddRange(claims);
            dbContext.SaveChanges();
        }

        private Entity.Auth.Claim CreatePhoneClaim(Actor actor, String phone)
        {
            Entity.Auth.Claim phoneClaim = new Entity.Auth.Claim()
            {
                Actor = actor,
                Value = phone,
                ClaimTypeId = (Int32)Entity.ClaimTypes.Phone
            };
            return phoneClaim;
        }
        private Entity.Auth.Claim CreatePasswordClaim(Actor actor, String password)
        {
            String encryptedPassword = BCrypt.Net.BCrypt.HashPassword(password);
            Entity.Auth.Claim passwordClaim = new Entity.Auth.Claim()
            {
                Actor = actor,
                ClaimTypeId = (Int32)Entity.ClaimTypes.Password,
                Value = encryptedPassword,
            };
            return passwordClaim;
        }
        private Entity.Auth.Claim CreateBasketClaim(Actor actor)
        {           
            Entity.Auth.Claim basketClaim = new Entity.Auth.Claim()
            {
                Actor = actor,
                ClaimTypeId = (Int32)Entity.ClaimTypes.Basket
            };
            return basketClaim;
        }
        private Entity.Auth.Claim CreateUsernameClaim(Actor actor, String username)
        {
            Entity.Auth.Claim usernameClaim = new Entity.Auth.Claim()
            {
                Actor = actor,
                ClaimTypeId = (Int32)Entity.ClaimTypes.Username,
                Value = username
            };
            return usernameClaim;
        }

        private Int32 GetActorIdByUsername(String username)
        {
            Int32 actorId = dbContext.Claims
                .Where(e => e.ClaimType.Name == Entity.ClaimTypes.Username.ToString())
                .Where(e => e.Value == username)
                .Select(e => e.ActorId)
                .FirstOrDefault();
             return actorId;
        }
        private Int32 GetBasketClaimId(Int32 actorId)
        {
            Int32 basketId = dbContext.Claims
                .Where(e => e.ClaimType.Name == Entity.ClaimTypes.Basket.ToString())
                .Where(e => e.ActorId == actorId)
                .Select(e => e.Id)
                .Single();
            return basketId;
        }
        private String GetUsername(Int32 actorId)
        {
            String username = dbContext.Claims
                .Where(e => e.ClaimType.Name == Entity.ClaimTypes.Username.ToString())
                .Where(e => e.ActorId == actorId)
                .Select(e => e.Value)
                .Single();
            return username;
        }
        private Boolean VerifyPassword(Int32 actorId, String password)
        {
            String encryptedPassword = dbContext.Claims
                .Where(e => e.ClaimType.Name == Entity.ClaimTypes.Password.ToString())
                .Where(e => e.ActorId == actorId)
                .Select(e => e.Value)
                .Single();
            var matched = BCrypt.Net.BCrypt.Verify(password, encryptedPassword);
            return matched;
        }
    }
}
