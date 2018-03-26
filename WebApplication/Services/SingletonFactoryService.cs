using System;
using WebApplication.Entity.EntityFramework;

namespace WebApplication.Services
{
    public static class SingletonFactoryService
    {
        private static ApplicationDbContext _context = null;
        private static IdentityService _identityService = null;
        private static JWTService _JWTService = null;
        private static SMSNotificationService _SMSNotificationService = null;

        public static ApplicationDbContext GetContext()
        {
            if(_context == null)
                _context = new ApplicationDbContext("DefaultConnection", WebApplication.Entity.Environment.Dev);
            return _context;
        }

        public static IdentityService GetIdentityService()
        {
            if (_identityService == null)
                _identityService = new IdentityService(GetContext());
            return _identityService;
        }

        public static SMSNotificationService GetSmsNotificationService()
        {
            if (_SMSNotificationService == null)
                _SMSNotificationService = new SMSNotificationService(GetContext());
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
