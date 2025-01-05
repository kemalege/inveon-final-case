using System.Linq.Expressions;
using InveonFinalCase.API.Shared.Queries;

namespace InveonFinalCase.API.Shared.Services;

public class QueryService<T> : IQueryService<T>
{
    public async Task<PaginatedResult<T>> ToPaginatedResultAsync(
        IQueryable<T> query,
        BaseQueryObject queryObject,
        CancellationToken cancellationToken = default)
    {
        var totalCount = await query.CountAsync(cancellationToken);
        var items = await query.Skip((queryObject.Page - 1) * queryObject.PageSize)
            .Take(queryObject.PageSize)
            .ToListAsync(cancellationToken);

        return new PaginatedResult<T>(items, totalCount, queryObject.Page, queryObject.PageSize);
    }

    public IQueryable<T> ApplyFilter(IQueryable<T> query, Expression<Func<T, bool>>? filter)
    {
        return filter != null ? query.Where(filter) : query;
    }
}
