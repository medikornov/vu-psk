using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DataAccessLayer.Repositories.RepositoryBase
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected DbContext DbContext { get; set; }

        protected RepositoryBase(DbContext dbContext)
        {
            DbContext = dbContext;
        }

        public IQueryable<T> GetAll()
        {
            return DbContext.Set<T>();
        }

        public IQueryable<T> GetAllByCondition(Expression<Func<T, bool>> expression)
        {
            return DbContext.Set<T>().Where(expression);
        }

        public ValueTask<T?> FindAsync(params object[] keyValues)
        {
            return DbContext.Set<T>().FindAsync(keyValues);
        }

        public void Add(T entity)
        {
            DbContext.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            DbContext.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            DbContext.Set<T>().Remove(entity);
        }

        public Task<int> CountAsync()
        {
            return DbContext.Set<T>().CountAsync();
        }

        public Task<int> CountByConditionAsync(Expression<Func<T, bool>> expression)
        {
            return DbContext.Set<T>().Where(expression).CountAsync();
        }

        public Task<bool> AnyAsync(Expression<Func<T, bool>> expression)
        {
            return DbContext.Set<T>().AnyAsync(expression);
        }
    }
}
