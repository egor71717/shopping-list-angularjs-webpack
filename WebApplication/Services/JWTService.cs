using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebApplication.Services
{
    public class JWTService
    {
        private SecurityKey secretSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("not so secret supersecret secret key"));
        private JwtSecurityTokenHandler _tokenHandler = new JwtSecurityTokenHandler();

        public ClaimsPrincipal ValidateToken(String token)
        {
            ClaimsPrincipal principal = null;
            SecurityToken validToken = null;
            TokenValidationParameters validationParameters = new TokenValidationParameters()
            {
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = secretSigningKey,
                ValidateAudience = false,
                ValidateIssuer = false
            };
            try
            {
                principal = _tokenHandler.ValidateToken(token, validationParameters, out validToken);
                return principal;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        public String GenerateToken(ClaimsIdentity identity)
        {
            SigningCredentials signingCredentials = GenerateSigningCredentials();
            SecurityTokenDescriptor securityTokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = identity,
                IssuedAt = DateTime.Now,
                Expires = DateTime.Now.AddHours(2),
                SigningCredentials = signingCredentials
            };
            SecurityToken plainToken = _tokenHandler.CreateToken(securityTokenDescriptor);
            String signedAndEncodedToken = _tokenHandler.WriteToken(plainToken);
            return signedAndEncodedToken;
        }

        private SigningCredentials GenerateSigningCredentials()
        {
            SigningCredentials signingCredentials = new SigningCredentials(
                secretSigningKey,
                SecurityAlgorithms.HmacSha256Signature,
                SecurityAlgorithms.Sha256Digest);
            return signingCredentials;
        }
    }
}
