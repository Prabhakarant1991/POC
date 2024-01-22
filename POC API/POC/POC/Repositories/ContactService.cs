using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using POC.Data;
using POC.Model;
using ILogger = Microsoft.Extensions.Logging.ILogger;

namespace POC.Repositories
{
    public class ContactService : IContactService
    {
        private readonly DbContextClass _dbContext;
        private readonly ILogger _logger;

        public ContactService(DbContextClass dbContext, ILogger<ContactService> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<List<Contact>> GetContactList()
        {

            try
            {
                var result =  await _dbContext.Contacts
              .FromSqlRaw<Contact>("GetContactsList")
              .ToListAsync();
                return result.OrderByDescending(x => x.Id).ToList();


            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in GetContactList");
                throw;
            }

        }

        public async Task<IEnumerable<Contact>> GetContactById(int Id)
        {
            try
            {
                var param = new SqlParameter("@Id", Id);

                var contactDetails = await Task.Run(() => _dbContext.Contacts
                                .FromSqlRaw(@"exec GetContactByID @Id", param).ToListAsync());

                return contactDetails;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in GetContactById");
                throw;
            }


        }

        public async Task<int> AddContact(Contact contact)
        {
            try
            {

                var parameter = new List<SqlParameter>();
                parameter.Add(new SqlParameter("@FirstName", contact.FirstName));
                parameter.Add(new SqlParameter("@LastName", contact.LastName));
                parameter.Add(new SqlParameter("@Email", contact.Email));
                parameter.Add(new SqlParameter("@PhoneNumber", contact.PhoneNumber));
                parameter.Add(new SqlParameter("@Address", contact.Address));
                parameter.Add(new SqlParameter("@City", contact.City));
                parameter.Add(new SqlParameter("@State", contact.State));
                parameter.Add(new SqlParameter("@Country", contact.Country));
                parameter.Add(new SqlParameter("@PostalCode", contact.PostalCode));
                var result = await Task.Run(() => _dbContext.Database
               .ExecuteSqlRawAsync(@"exec AddNewContact @FirstName, @LastName, @Email, @PhoneNumber, @Address, @City, @State, @Country, @PostalCode", parameter.ToArray()));

                return result;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in AddContact");
                throw;
            }

        }

        public async Task<int> UpdateContact(Contact contact)
        {
            try
            {
                var parameter = new List<SqlParameter>();
                parameter.Add(new SqlParameter("@Id", contact.Id));
                parameter.Add(new SqlParameter("@FirstName", contact.FirstName));
                parameter.Add(new SqlParameter("@LastName", contact.LastName));
                parameter.Add(new SqlParameter("@Email", contact.Email));
                parameter.Add(new SqlParameter("@PhoneNumber", contact.PhoneNumber));
                parameter.Add(new SqlParameter("@Address", contact.Address));
                parameter.Add(new SqlParameter("@City", contact.City));
                parameter.Add(new SqlParameter("@State", contact.State));
                parameter.Add(new SqlParameter("@Country", contact.Country));
                parameter.Add(new SqlParameter("@PostalCode", contact.PostalCode));

                var result = await Task.Run(() => _dbContext.Database
                .ExecuteSqlRawAsync(@"exec UpdateContact @Id, @FirstName, @LastName, @Email, @PhoneNumber, @Address, @City, @State, @Country, @PostalCode ", parameter.ToArray()));
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in UpdateContact");
                throw;
            }

        }
        public async Task<int> DeleteContact(int Id)
        {
            try
            {
                return await Task.Run(() => _dbContext.Database.ExecuteSqlInterpolatedAsync($"DeleteContactByID {Id}"));

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Exception occurred in DeleteContact");
                throw;
            }
        }
    }
}
