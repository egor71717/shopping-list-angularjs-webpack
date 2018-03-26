using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WebApplication.Services
{
    public class JWTService
    {
        private String secretKey = "not so secret supersecret secret key";
        private JwtSecurityTokenHandler _tokenHandler = new JwtSecurityTokenHandler();

        public Boolean ValidateToken(String token)
        {
            ClaimsPrincipal principal = null;
            SecurityToken validToken = null;
            TokenValidationParameters validationParameters = new TokenValidationParameters()
            {
            };
            principal = _tokenHandler.ValidateToken(token, validationParameters, out validToken);
            var validJwt = validToken as JwtSecurityToken;
            return validJwt == null;

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
            Byte[] key = Encoding.ASCII.GetBytes(secretKey);
            SigningCredentials signingCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature, SecurityAlgorithms.Sha256Digest);
            return signingCredentials;
        }
    }
}
