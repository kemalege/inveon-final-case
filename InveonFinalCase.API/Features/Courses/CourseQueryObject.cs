using InveonFinalCase.API.Shared.Queries;

namespace InveonFinalCase.API.Features.Courses;

public class CourseQueryObject : BaseQueryObject
{
    public Guid? CategoryId { get; set; }
}

