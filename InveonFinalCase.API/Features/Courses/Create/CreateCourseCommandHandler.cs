namespace InveonFinalCase.API.Features.Courses.Create;

public class CreateCourseCommandHandler(AppDbContext context, IMapper mapper)
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
        
        // var instructor = _httpContextAccessor.HttpContext?.User.Claims
        //     .FirstOrDefault(c => c.Type == "name")?.Value;
        
        // var userId = _httpContextAccessor.HttpContext?.User.Claims
        //     .FirstOrDefault(c => c.Type == "sub")?.Value;

        var newCourse = mapper.Map<Course>(request);
        newCourse.Created = DateTime.Now;
        newCourse.Id = Guid.NewGuid();
        newCourse.Instructor = "Inveon";
        newCourse.UserId = Guid.TryParse("25989edf-3f2e-4f79-9598-e58c704ffd71", out var userId) ? userId : Guid.Empty;
        // newCourse.Instructor = instructor;

        context.Courses.Add(newCourse);
        await context.SaveChangesAsync(cancellationToken);

        return ServiceResult<Guid>.SuccessAsCreated(newCourse.Id, $"/api/courses/{newCourse.Id}");
    }
}