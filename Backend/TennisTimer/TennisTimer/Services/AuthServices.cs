using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Optivem.Framework.Core.Domain;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using TennisTimer.Models;

namespace TennisTimer.Services
{
    //public interface IAuthServices
    //{
    //    Task<bool> UserRegistration(UserDto user);
    //}
    public class AuthServices : IAuthServices
    {
        private readonly IConfiguration _configuration;
        private readonly TennisTimerContext _context;
        public AuthServices(IConfiguration configuration, TennisTimerContext context)
        {
            _configuration = configuration;
            _context = context;
        }
        public async Task<bool> UserRegistration(UserDto user)
        {
            CreatePasswordHash(user.Password, out byte[] passwordHash, out byte[] passwordSalt);
            var user1 = new User();
            var Userrole = new UserRole();
            user1.UserName = user.UserName;
            user1.PasswordHash = passwordHash;
            user1.PasswordSalt = passwordSalt;
            Userrole.UserName = user.UserName;
            Userrole.RoleId = 2;
            _context.Users.Add(user1);
            _context.UserRoles.Add(Userrole);
            try
            {
                await _context.SaveChangesAsync();
                return true; // Registration successful
            }
            catch (Exception)
            {
                // Log the exception or handle it as needed
                return false; // Registration failed
            }

        }

        public  TokenResponse UserLogin(UserDto requser)
        {
            TokenResponse tokenResponse = new TokenResponse();
            var user = new User();
            user = _context.Users.FirstOrDefault(u => u.UserName == requser.UserName);
            if (user == null)
            {
                return null;
            }

            if (!VerifyPasswordHash(requser.Password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            string token = CreateToken(user);
            tokenResponse.JWTToken = token;
            tokenResponse.RefreshToken = TokenGenerator(user.UserName);

            return (tokenResponse);
        }

       

        private string CreateToken(User user)
        {
            var Userrole = new UserRole();
            var role = new Role();
            Userrole = _context.UserRoles.FirstOrDefault(u => u.UserName == user.UserName);
            if (Userrole != null)
            {
                role = _context.Roles.FirstOrDefault(u => u.RoleId == Userrole.RoleId);
            }


            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                // Adding Roles while Creating Account
                // using user.roles to get roles from database
                new Claim(ClaimTypes.Role, role.RoleName)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes
                (_configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        private void CreatePasswordHash(string Password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public string TokenGenerator(string UserName)
        {
            var randomnumber = new byte[32];
            using(var randomnumbergenerator = RandomNumberGenerator.Create())
            {
                randomnumbergenerator.GetBytes(randomnumber);
                string refreshtoken = Convert.ToBase64String(randomnumber);

                var _user = _context.TblRefreshTokens.FirstOrDefault(o => o.UserName == UserName);
                if(_user != null)
                {
                    _user.RefreshToken = refreshtoken;
                    _context.SaveChanges();
                }
                else
                {
                    TblRefreshToken tblRefreshToken = new TblRefreshToken()
                    {
                        UserName = UserName,
                        TokenId = new Random().Next(),
                        RefreshToken = refreshtoken,
                        IsActive = true
                    };
                    _context.TblRefreshTokens.Add(tblRefreshToken);
                    _context.SaveChanges();

                }
                return refreshtoken;
            }
        }

        public TokenResponse Authenticate(string username, Claim[] claims)
        {
            TokenResponse tokenResponse = new TokenResponse();
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes
                (_configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            tokenResponse.JWTToken = jwt;
            tokenResponse.RefreshToken = TokenGenerator(username);
            return tokenResponse;
        }

        [Authorize]
        public TokenResponse Refresh(TokenResponse token)
        {
            var tokenhandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenhandler.ValidateToken(token.JWTToken, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes
                (_configuration.GetSection("AppSettings:Token").Value)),
                ValidateIssuer = false,
                ValidateAudience = false
            }, out securityToken);

            var _token = securityToken as JwtSecurityToken;
            if (_token != null && !_token.Header.Alg.Equals(SecurityAlgorithms.HmacSha512Signature))
            {
                throw new UnauthorizedAccessException("Unauthorize access");
            }
            var username = principal.Identity.Name;
            var _reftable = _context.TblRefreshTokens.FirstOrDefault(o => o.UserName == username && o.RefreshToken == token.RefreshToken);
            if (_reftable == null)
            {
                throw new UnauthorizedAccessException("Unauthorize access");
            }
            TokenResponse _result = Authenticate(username, principal.Claims.ToArray());
            return _result;
        }


    }

 }

