//using Fluent.Infrastructure.FluentModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
//using System.Web.Mvc;
using TennisTimer.Models;
using TennisTimer.Services;
using Newtonsoft.Json;
using System;

namespace TennisTimer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly TennisTimerContext _context;
        public UsersController(TennisTimerContext context)
        {
            _context = context;

        }

        //User data correction
        // GET: /UserRole/Register
        [Route("GetUser")]
        [HttpGet]
        public IActionResult GetUser()
        {
            var Users = _context.Users.ToList();
            return Ok(Users);
        }

        [Route("GetUserRole")]
        [HttpGet]
        public IActionResult GetUserRole(string id)
        {
            var User = _context.UserRoles.FirstOrDefault(o=>o.UserName == id);
            if (User == null)
            {
                return NotFound();
            }
            else
            {
                var roleuser = _context.Roles.FirstOrDefault(o => o.RoleId == User.RoleId);
                Role role = new Role();
                if (roleuser != null)
                {
                    role.RoleId = roleuser.RoleId;
                    role.RoleName = roleuser.RoleName;
                }
                return Ok(role);
            }
        }

        [Route("GetRoles")]
        [HttpGet]
        public IActionResult GetRoles()
        {
            var roles = _context.Roles.ToList();
            return Ok(roles);
        }

        [Route("MapRoles")]
        [HttpPost]
        public IActionResult Maproles(MapUserRole value)
        {
            var user = _context.UserRoles.FirstOrDefault(o=>o.UserName == value.UserName);
            if (user == null)
                {
                    UserRole user1 = new UserRole();
                    user1.UserName = value.UserName;
                    user1.RoleId = value.RoleId;
                    _context.UserRoles.Add(user1);
                    _context.SaveChanges();
                }
            else
            {
                user.RoleId = value.RoleId;
                _context.SaveChanges(); 
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if(_context.Users == null)
            {
                return NotFound();
            }
            User user = _context.Users.FirstOrDefault(o=>o.UserName == id);
            if (user == null)
            {
                return NotFound();
            }
            _context.Users.Remove(user);
            _context.SaveChanges();
            return NoContent();
        }


    }
}
