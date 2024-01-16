using System.Security.Claims;
using TennisTimer.Models;

namespace TennisTimer.Services
{
    public interface IAuthServices
    {
        Task<bool> UserRegistration(UserDto user);
        public TokenResponse UserLogin(UserDto user);

       public string TokenGenerator(string UserName);

        public TokenResponse Authenticate(string username, Claim[] claims);

        public TokenResponse Refresh(TokenResponse token);

    }
}
