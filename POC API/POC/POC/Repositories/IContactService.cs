using POC.Model;

namespace POC.Repositories
{
    public interface IContactService
    {
        public Task<List<Contact>> GetContactList();
        public Task<IEnumerable<Contact>> GetContactById(int Id);
        public Task<int> AddContact(Contact contact);
        public Task<int> UpdateContact(Contact contact);
        public Task<int> DeleteContact(int Id);
    }
}
