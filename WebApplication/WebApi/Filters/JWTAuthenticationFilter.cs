using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Filters;
using WebApplication.Entity.EntityFramework;
using WebApplication.Services;

namespace WebApi.Filters
{
    public class JWTAuthenticationAttribute : Attribute, IAuthenticationFilter
    {
        private static readonly IdentityService IdentityService;
        private static readonly JWTService JWTService;

        static JWTAuthenticationAttribute()
        {
            JWTService = SingletonFactoryService.GetJWTService();
            IdentityService = SingletonFactoryService.GetIdentityService();
        }

        public bool AllowMultiple => throw new NotImplementedException();

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            HttpRequestMessage request = context.Request;
            AuthenticationHeaderValue authorization = request.Headers.Authorization;
            if (authorization == null || authorization.Scheme != "Bearer")
            {
                context.ErrorResult = new AuthenticationFailureResult("Wrong authentication", request);
                return;
            }

            var token = authorization.Parameter;

            if (String.IsNullOrEmpty(token))
            {
                context.ErrorResult = new AuthenticationFailureResult("Missing auth token", request);
                return;
            }

            IPrincipal principal = JWTService.ValidateToken(token);
            if (principal == null)
                new AuthenticationFailureResult("Invalid token", request);

            context.Principal = principal;
        }


        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }

       
    }
}