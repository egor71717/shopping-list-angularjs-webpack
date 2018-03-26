using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplication.Entity.EntityFramework;

namespace WebApplication.Services
{
    public static class FactoryService
    {
        public static ApplicationDbContext GetContext()
        {
            return new ApplicationDbContext("DefaultConnection", WebApplication.Entity.Environment.Dev);
        }
    }
}
