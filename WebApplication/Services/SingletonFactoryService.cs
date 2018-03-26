using System;
using WebApplication.Entity.EntityFramework;

namespace WebApplication.Services
{
    public static class SingletonFactoryService
    {

        private static IdentityService _identityService = null;
        private static JWTService _JWTService = null;
        private static SMSNotificationService _SMSNotificationService = null;



        public static IdentityService GetIdentityService(ApplicationDbContext dbContext)
        {
            if (_identityService == null)
                _identityService = new IdentityService(dbContext);
            return _identityService;
        }

        public static SMSNotificationService GetSmsNotificationService(ApplicationDbContext dbContext)
        {
            if (_SMSNotificationService == null)
                _SMSNotificationService = new SMSNotificationService(dbContext);
            return _SMSNotificationService;
        }

        public static JWTService GetJWTService()
        {
            if (_JWTService == null)
                _JWTService = new JWTService();
            return _JWTService;
        }
    }
}
