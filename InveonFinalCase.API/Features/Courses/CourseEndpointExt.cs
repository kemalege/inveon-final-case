using InveonFinalCase.API.Features.Courses.Create;
using InveonFinalCase.API.Features.Courses.GetAllByUserId;
using InveonFinalCase.API.Features.Courses.GetById;
using InveonFinalCase.API.Features.Courses.Update;

namespace InveonFinalCase.API.Features.Courses;

public static class CourseEndpointExt
{
    public static void AddCourseGroupEndpointExt(this WebApplication app)
    {
        app.MapGroup("api/v1/courses").WithTags("Courses")
            .CreateCourseGroupItemEndpoint()
            .GetByIdCourseGroupItemEndpoint()
            .GetByUserIdCourseGroupItemEndpoint()
            .UpdateCourseGroupItemEndpoint();
    }
}