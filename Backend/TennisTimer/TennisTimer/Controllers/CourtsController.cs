using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp.Formats.Jpeg;
using System.Diagnostics;
using TennisTimer.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using Humanizer.Localisation;

namespace TennisTimer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourtsController : ControllerBase
    {
        private readonly TennisTimerContext _context;

        public CourtsController(TennisTimerContext context)
        {
            _context = context;
        }

        // GET: api/Courts
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Court>>> GetCourts()
        {
            if (_context.Courts == null)
            {
                return NotFound();
            }
            return await _context.Courts.ToListAsync();
        }

        // GET: api/Courts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Courttofront>> GetCourt(int id)
        {
            if (_context.Courts == null)
            {
                return NotFound();
            }
            var court = await _context.Courts.FindAsync(id);

            if (court == null)
            {
                return NotFound();
            }

            Courttofront court1 = new Courttofront();
            court1.CourtId = court.CourtId;
            court1.CourtName = court.CourtName;
            court1.CourtLocation = court.CourtLocation;
            if (court.CourtImg1 != null && court.CourtImg2 != null && court.CourtImg3 != null)
            {
                var base64Image1 = Convert.ToBase64String(court.CourtImg1);
                var dataUri1 = $"data:image/jpeg;base64,{base64Image1}";
                var base64Image2 = Convert.ToBase64String(court.CourtImg2);
                var dataUri2 = $"data:image/jpeg;base64,{base64Image2}";
                var base64Image3 = Convert.ToBase64String(court.CourtImg3);
                var dataUri3 = $"data:image/jpeg;base64,{base64Image3}";
                court1.CourtImg1 = dataUri1;
                court1.CourtImg2 = dataUri2;
                court1.CourtImg3 = dataUri3;
            }
            return court1;
        }


        //[HttpGet("{id}")]
        //[Route("/CourttoFront")]
        //public async Task<ActionResult<Courttofront>> GetCourttofront(int id)
        //{
        //    if (_context.Courts == null)
        //    {
        //        return NotFound();
        //    }
        //    var court = await _context.Courts.FindAsync(id);

        //    if (court == null)
        //    {
        //        return NotFound();
        //    }
        //    Courttofront court1 = new Courttofront();
        //    court1.CourtId = court.CourtId;
        //    court1.CourtName = court.CourtName;
        //    court1.CourtLocation = court.CourtLocation;
        //    if(court.CourtImg1 != null && court.CourtImg2 != null && court.CourtImg3 != null)
        //    {
        //        var base64Image1 = Convert.ToBase64String(court.CourtImg1);
        //        var dataUri1 = $"data:image/jpeg;base64,{base64Image1}";
        //        var base64Image2 = Convert.ToBase64String(court.CourtImg2);
        //        var dataUri2 = $"data:image/jpeg;base64,{base64Image2}";
        //        var base64Image3 = Convert.ToBase64String(court.CourtImg3);
        //        var dataUri3 = $"data:image/jpeg;base64,{base64Image3}";
        //        court1.CourtImg1 = dataUri1;
        //        court1.CourtImg2 = dataUri2;
        //        court1.CourtImg3 = dataUri3;
        //    }
        //    return court1;

        //}


        // PUT: api/Courts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCourt(int id, Court court)
        {
            if (id != court.CourtId)
            {
                return BadRequest();
            }

            _context.Entry(court).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CourtExists(id))
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

        // POST: api/Courts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Court>> PostCourt(Court court)
        {
            if (_context.Courts == null)
            {
                return Problem("Entity set 'TennisTimerContext.Courts'  is null.");
            }
            _context.Courts.Add(court);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCourt", new { id = court.CourtId }, court);
        }

        //POST with FormData
        [Route("PostCourt")]
        [HttpPost]
        public async Task<IActionResult> PostCourtImg(
         [FromForm] string CourtName,
         [FromForm] string CourtLocation,
         IFormFile courtImg1,
         IFormFile courtImg2,
        IFormFile courtImg3
)
        {
            Console.WriteLine("Inside PostCourtImg");
            var court = new Court
            {
                CourtName = CourtName,
                CourtLocation = CourtLocation,
                CourtImg1 = imagetobyte(courtImg1),
                CourtImg2 = imagetobyte(courtImg2),
                CourtImg3 = imagetobyte(courtImg3),
            };

            try
            {
                // Your existing code for creating Court entity

                _context.Courts.Add(court);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                // Log or handle the exception appropriately
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

            return Ok();
        }


        // DELETE: api/Courts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCourt(int id)
        {
            if (_context.Courts == null)
            {
                return NotFound();
            }
            var court = await _context.Courts.FindAsync(id);
            if (court == null)
            {
                return NotFound();
            }

            _context.Courts.Remove(court);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CourtExists(int id)
        {
            return (_context.Courts?.Any(e => e.CourtId == id)).GetValueOrDefault();
        }

        private byte[] imagetobyte(IFormFile file)
        {
            using (var stream = new MemoryStream())
            {
                file.CopyToAsync(stream);
                stream.Seek(0, SeekOrigin.Begin);
                using (var image1 = Image.Load(stream))
                {
                    // Resize the image (you can adjust the size as needed)
                    image1.Mutate(x => x.Resize(new ResizeOptions
                    {
                        Size = new Size(500, 300), // Width and height
                        Mode = ResizeMode.Max
                    }));

                    // Save the resized image to a stream
                    stream.SetLength(0); // Reset the stream
                    image1.Save(stream, new JpegEncoder());
                }


                return stream.ToArray();
            }
        }
    }
}
