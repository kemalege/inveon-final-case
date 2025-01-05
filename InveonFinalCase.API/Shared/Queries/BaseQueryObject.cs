namespace InveonFinalCase.API.Shared.Queries;

public abstract class BaseQueryObject
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}
