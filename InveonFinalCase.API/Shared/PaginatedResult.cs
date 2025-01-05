namespace InveonFinalCase.API.Shared;

public record PaginatedResult<T>(
    List<T> Items,
    int TotalCount,
    int CurrentPage,
    int PageSize
);
