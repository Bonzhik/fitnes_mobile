using Domain.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Common.Services
{
    public class JwtService
    {
        private readonly string _jwtSecret;
        private readonly string _refreshTokenSecret;
        private readonly int _accessTokenExpirationInMinutes;
        private readonly int _refreshTokenExpirationInDays;

        public JwtService(IConfiguration config)
        {
            _jwtSecret = config["Jwt:SecretKey"];
            _refreshTokenSecret = config["Jwt:RefreshTokenSecretKey"];
            _accessTokenExpirationInMinutes = int.Parse(config["Jwt:AccessTokenExpirationInMinutes"]);
            _refreshTokenExpirationInDays = int.Parse(config["Jwt:RefreshTokenExpirationInDays"]);
        }

        public string GenerateAccessToken(User user)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.Email, user.Email),
                new("id", user.Id.ToString())
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "https://localhost:7153/",
                audience: "https://localhost:7153/",
                claims: claims,
                expires: DateTime.Now.AddMinutes(_accessTokenExpirationInMinutes),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
            }

            return Convert.ToBase64String(randomNumber);
        }
    }
}
