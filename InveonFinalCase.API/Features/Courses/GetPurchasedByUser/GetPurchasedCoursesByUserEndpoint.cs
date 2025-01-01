using InveonFinalCase.API.Features.Courses.Dtos;

namespace InveonFinalCase.API.Features.Courses.GetPurchasedByUser;

public record GetPurchasedCoursesQuery(Guid UserId) : IRequestByServiceResult<List<CourseDto>>;

public class GetPurchasedCoursesQueryHandler(AppDbContext context, IMapper mapper)
    : IRequestHandler<GetPurchasedCoursesQuery, ServiceResult<List<CourseDto>>>
{
    public async Task<ServiceResult<List<CourseDto>>> Handle(GetPurchasedCoursesQuery request, CancellationToken cancellationToken)
    {
        var courses = await context.OrderItems
            .Include(oi => oi.Course) 
            .ThenInclude(c => c.Category)
            .Where(oi => oi.Order.UserId == request.UserId)
            .Select(oi => oi.Course)
            .Distinct()
            .ToListAsync(cancellationToken);

        if (!courses.Any())
        {
            return ServiceResult<List<CourseDto>>.Error(
                "No purchased courses found",
                "The user has not purchased any courses.",
                HttpStatusCode.NotFound);
        }

        var coursesAsDto = mapper.Map<List<CourseDto>>(courses);
        return ServiceResult<List<CourseDto>>.SuccessAsOk(coursesAsDto);
    }
}

public static class GetPurchasedCoursesEndpoint
{
    public static RouteGroupBuilder GetPurchasedCoursesGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapGet("/user/{userId:guid}/purchased",
                async (IMediator mediator, Guid userId) =>
                    (await mediator.Send(new GetPurchasedCoursesQuery(userId))).ToGenericResult())
            .WithName("GetPurchasedCourses");

        return group;
    }
}
