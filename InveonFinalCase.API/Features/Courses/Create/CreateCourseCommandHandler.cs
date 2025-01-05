using System.Security.Claims;
using InveonFinalCase.API.Shared.Helpers;

namespace InveonFinalCase.API.Features.Courses.Create;

public class CreateCourseCommandHandler(AppDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor)
    : IRequestHandler<CreateCourseCommand, ServiceResult<Guid>>
{
    public async Task<ServiceResult<Guid>> Handle(CreateCourseCommand request, CancellationToken cancellationToken)
    {
        var hasCategory = await context.Categories.AnyAsync(x => x.Id == request.CategoryId, cancellationToken);


        if (!hasCategory)
        {
            return ServiceResult<Guid>.Error("Category not found.",
                $"The Category with id({request.CategoryId}) was not found", HttpStatusCode.NotFound);
        }


        var hasCourse = await context.Courses.AnyAsync(x => x.Name == request.Name, cancellationToken);

        if (hasCourse)
        {
            return ServiceResult<Guid>.Error("Course already exists.",
                $"The Course with name({request.Name}) already exists", HttpStatusCode.BadRequest);
        }
        
        var userId = TokenHelper.GetUserId(httpContextAccessor.HttpContext);
        var instructor = TokenHelper.GetInstructorName(httpContextAccessor.HttpContext);

        var newCourse = mapper.Map<Course>(request);
        newCourse.Created = DateTime.Now;
        newCourse.Id = Guid.NewGuid();
        newCourse.Instructor = instructor;
        newCourse.UserId = userId;

        context.Courses.Add(newCourse);
        await context.SaveChangesAsync(cancellationToken);

        return ServiceResult<Guid>.SuccessAsCreated(newCourse.Id, $"/api/courses/{newCourse.Id}");
    }
}