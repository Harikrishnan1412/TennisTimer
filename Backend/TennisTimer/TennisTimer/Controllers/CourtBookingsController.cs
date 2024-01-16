using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TennisTimer.Models;

namespace TennisTimer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourtBookingsController : ControllerBase
    {
        private readonly TennisTimerContext _context;

        public CourtBookingsController(TennisTimerContext context)
        {
            _context = context;
        }

        // GET: api/CourtBookings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourtBooking>>> GetCourtBookings()
        {
          if (_context.CourtBookings == null)
          {
              return NotFound();
          }
            return await _context.CourtBookings.ToListAsync();
        }

        // GET: api/CourtBookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CourtBooking>> GetCourtBooking(int id)
        {
          if (_context.CourtBookings == null)
          {
              return NotFound();
          }
            var courtBooking = await _context.CourtBookings.FindAsync(id);

            if (courtBooking == null)
            {
                return NotFound();
            }

            return courtBooking;
        }

        // PUT: api/CourtBookings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourtBooking(int id, CourtBooking courtBooking)
        {
            if (id != courtBooking.BookingId)
            {
                return BadRequest();
            }

            _context.Entry(courtBooking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourtBookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CourtBookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CourtBooking>> PostCourtBooking(CourtBooking courtBooking)
        {
          if (_context.CourtBookings == null)
          {
              return Problem("Entity set 'TennisTimerContext.CourtBookings'  is null.");
          }
            _context.CourtBookings.Add(courtBooking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourtBooking", new { id = courtBooking.BookingId }, courtBooking);
        }

        // DELETE: api/CourtBookings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourtBooking(int id)
        {
            if (_context.CourtBookings == null)
            {
                return NotFound();
            }
            var courtBooking = await _context.CourtBookings.FindAsync(id);
            if (courtBooking == null)
            {
                return NotFound();
            }

            _context.CourtBookings.Remove(courtBooking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourtBookingExists(int id)
        {
            return (_context.CourtBookings?.Any(e => e.BookingId == id)).GetValueOrDefault();
        }
    }
}
