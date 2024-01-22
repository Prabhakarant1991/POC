using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using POC.Model;
using POC.Repositories;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace POC.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;
        private readonly ILogger _logger;


        public ContactController(IContactService contactService, ILogger<ContactController> logger)
        {
            _contactService = contactService;
            _logger = logger;
        }


        [HttpGet("getcontactlist")]
        public async Task<IActionResult> GetContactList()
        {
            try
            {
                return Ok(await _contactService.GetContactList());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in Get Contact List");
                throw;
            }
        }

        [HttpGet("getcontactbyid")]
        public async Task<IActionResult> GetContactById(int Id)
        {
            try
            {
                var response = await _contactService.GetContactById(Id);

                if (response == null)
                {
                    return BadRequest();
                }

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in GetContactById");
                throw;
            }
        }

        [HttpPost("addContact")]
        public async Task<IActionResult> AddProduct(Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }

            try
            {
                var response = await _contactService.AddContact(contact);

                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in AddContact");
                throw;
            }
        }

        [HttpPut("updateContact")]
        public async Task<IActionResult> UpdateContact(Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }

            try
            {
                var result = await _contactService.UpdateContact(contact);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in UpdateContact");
                throw;
            }
        }

        [HttpDelete("deletecontact")]
        public async Task<int> DeleteContact(int Id)
        {
            try
            {
                var response = await _contactService.DeleteContact(Id);
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in DeleteContact");
                throw;
            }
        }

    }
}
