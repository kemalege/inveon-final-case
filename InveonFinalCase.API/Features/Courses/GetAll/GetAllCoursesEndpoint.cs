using InveonFinalCase.API.Features.Courses.Dtos;
using InveonFinalCase.API.Shared.Queries;
using InveonFinalCase.API.Shared.Services;

namespace InveonFinalCase.API.Features.Courses.GetAll;

public record GetCoursesWithPaginationQuery(CourseQueryObject QueryObject) : IRequestByServiceResult<PaginatedResult<CourseDto>>;

public class GetCoursesWithPaginationQueryHandler(AppDbContext context, IQueryService<Course> queryService, IMapper mapper)
    : IRequestHandler<GetCoursesWithPaginationQuery, ServiceResult<PaginatedResult<CourseDto>>>
{
    public async Task<ServiceResult<PaginatedResult<CourseDto>>> Handle(GetCoursesWithPaginationQuery request, CancellationToken cancellationToken)
    {
        var query = context.Courses.Include(c => c.Category).AsQueryable();
        
        query = queryService.ApplyFilter(query, c => 
            !request.QueryObject.CategoryId.HasValue || c.CategoryId == request.QueryObject.CategoryId);
        
        if (!string.IsNullOrWhiteSpace(request.QueryObject.SearchTerm))
        {
            query = query.Where(c => c.Name.Contains(request.QueryObject.SearchTerm) || 
                                     c.Description.Contains(request.QueryObject.SearchTerm));
        }

        if (!query.Any())
        {
            return ServiceResult<PaginatedResult<CourseDto>>.Error(
                "No courses found",
                "No courses available with the given criteria",
                HttpStatusCode.NotFound);
        }
        
        var paginatedResult = await queryService.ToPaginatedResultAsync(query, request.QueryObject, cancellationToken);

        var coursesAsDto = mapper.Map<List<CourseDto>>(paginatedResult.Items);
        return ServiceResult<PaginatedResult<CourseDto>>.SuccessAsOk(
            new PaginatedResult<CourseDto>(
                coursesAsDto,
                paginatedResult.TotalCount,
                paginatedResult.CurrentPage,
                paginatedResult.PageSize
            )
        );
    }
}

public static class GetCoursesWithPaginationEndpoint
{
    public static RouteGroupBuilder GetCoursesWithPaginationGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapGet("/",
                async (IMediator mediator, [AsParameters] CourseQueryObject queryObject) =>
                (await mediator.Send(new GetCoursesWithPaginationQuery(queryObject))).ToGenericResult())
            .WithName("GetCoursesWithPagination");

        return group;
    }
}

public class CourseQueryObject : BaseQueryObject
{
    public Guid? CategoryId { get; set; }
    public string? SearchTerm { get; set; }
}
