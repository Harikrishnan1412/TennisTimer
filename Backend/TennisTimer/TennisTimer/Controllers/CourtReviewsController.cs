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
    public class CourtReviewsController : ControllerBase
    {
        private readonly TennisTimerContext _context;

        public CourtReviewsController(TennisTimerContext context)
        {
            _context = context;
        }

        // GET: api/CourtReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourtReview>>> GetCourtReviews()
        {
          if (_context.CourtReviews == null)
          {
              return NotFound();
          }
            return await _context.CourtReviews.ToListAsync();
        }

        // GET: api/CourtReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CourtReview>> GetCourtReview(int id)
        {
          if (_context.CourtReviews == null)
          {
              return NotFound();
          }
            var courtReview = await _context.CourtReviews.FindAsync(id);

            if (courtReview == null)
            {
                return NotFound();
            }

            return courtReview;
        }

        // PUT: api/CourtReviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourtReview(int id, CourtReview courtReview)
        {
            if (id != courtReview.ReviewId)
            {
                return BadRequest();
            }

            _context.Entry(courtReview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourtReviewExists(id))
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

        // POST: api/CourtReviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CourtReview>> PostCourtReview(CourtReview courtReview)
        {
             if (_context.CourtReviews == null)
          {
              return Problem("Entity set 'TennisTimerContext.CourtReviews'  is null.");
          }
            _context.CourtReviews.Add(courtReview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourtReview", new { id = courtReview.ReviewId }, courtReview);
        }

        // DELETE: api/CourtReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourtReview(int id)
        {
            if (_context.CourtReviews == null)
            {
                return NotFound();
            }
            var courtReview = await _context.CourtReviews.FindAsync(id);
            if (courtReview == null)
            {
                return NotFound();
            }

            _context.CourtReviews.Remove(courtReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourtReviewExists(int id)
        {
            return (_context.CourtReviews?.Any(e => e.ReviewId == id)).GetValueOrDefault();
        }
    }
}
