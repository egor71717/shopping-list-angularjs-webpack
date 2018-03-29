using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Security.Claims;
using WebApplication.Entity.EntityFramework;
using WebApplication.Models;
using WebApplication.Services;
using System.Web.Http.Results;

namespace WebApi.Controllers
{
    public class AuthController : ApiController
    {


        //api/auth/{method}
        private readonly ApplicationDbContext DbContext;
        private readonly IdentityService IdentityService;
        private readonly JWTService JWTService;

        public AuthController(): base()
        {
            DbContext = FactoryService.GetContext();
            IdentityService = SingletonFactoryService.GetIdentityService();
            JWTService = SingletonFactoryService.GetJWTService();
        }

        [HttpGet]
        public IHttpActionResult Test()
        {
            return Ok(1);
        }

        [HttpPost]
        public IHttpActionResult Login([FromBody] LoginModel data)
        {
            ClaimsIdentity claimsIdentity = IdentityService.ClaimIdentity(data);
            if (claimsIdentity != null)
            {
                String token = JWTService.GenerateToken(claimsIdentity);
                return Json(token);
            } 
            else
                return BadRequest(); 
        }

        [HttpPost]
        public IHttpActionResult Register([FromBody] RegisterModel data)
        {
            ClaimsIdentity claimsIdentity = IdentityService.Register(data);
            if (claimsIdentity != null)
            {
                String token = JWTService.GenerateToken(claimsIdentity);
                return Json(token);
            }
            else
                return BadRequest();
        }

        [HttpGet]
        public IHttpActionResult Validate(String token)
        {
            var validationResult = JWTService.ValidateToken(token);
            if (validationResult != null)
                return Json(validationResult);
            else
                return BadRequest("invalid token");
        }
    }
}
