using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Json.Serialization;
using System.Text.Json;
using TennisTimer.Models;
using TennisTimer.Services;
using Microsoft.AspNetCore.Authorization;

namespace TennisTimer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly TennisTimerContext _context;
        private readonly IAuthServices _services;

        public AuthController(IConfiguration configuration, TennisTimerContext context, IAuthServices authServices)
        {
            _configuration = configuration;
            _context = context;
            _services = authServices;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            bool registrationresult = await _services.UserRegistration(request);
            if (registrationresult)
            {
                var options = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve
                };

                // Serialize the response with ReferenceHandler.Preserve
                var jsonResponse = JsonSerializer.Serialize(options);
                return Ok(jsonResponse);
            }
            else { return BadRequest(); }



        }

        

        [HttpPost("login")]
        public async Task<ActionResult<TokenResponse>> Login(UserDto request)
        {
            TokenResponse token =  _services.UserLogin(request);
            if (token != null)
            {
                return Ok(token);
            }
            else
            {
                return BadRequest("User Not found");
            }
        }


        [Route("Refresh")]
        [HttpPost]
        public IActionResult Refresh([FromBody] TokenResponse token)
        {
            try
            {
                TokenResponse _result = _services.Refresh(token);
                return Ok(_result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.ToString());
            }
            
        }


    }
}
