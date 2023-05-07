using System.Linq.Expressions;

namespace DataAccessLayer.Repositories.RepositoryBase
{
    public interface IRepositoryBase<T>
    {
        IQueryable<T> GetAll();
        IQueryable<T> GetAllByCondition(Expression<Func<T, bool>> expression);
        ValueTask<T?> FindAsync(params object[] keyValues);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<int> CountAsync();
        Task<int> CountByConditionAsync(Expression<Func<T, bool>> expression);
        Task<bool> AnyAsync(Expression<Func<T, bool>> expression);
    }
}
