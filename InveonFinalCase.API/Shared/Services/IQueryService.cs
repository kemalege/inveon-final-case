using System.Linq.Expressions;
using InveonFinalCase.API.Shared.Queries;

namespace InveonFinalCase.API.Shared.Services;

public interface IQueryService<T>
{
    Task<PaginatedResult<T>> ToPaginatedResultAsync(
        IQueryable<T> query,
        BaseQueryObject queryObject,
        CancellationToken cancellationToken = default);

    IQueryable<T> ApplyFilter(IQueryable<T> query, Expression<Func<T, bool>>? filter);
}
