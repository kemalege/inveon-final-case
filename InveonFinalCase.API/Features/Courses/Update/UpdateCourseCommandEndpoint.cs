using InveonFinalCase.API.Shared.Filters;

namespace InveonFinalCase.API.Features.Courses.Update;

public static class UpdateCourseCommandEndpoint
{
    public static RouteGroupBuilder UpdateCourseGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapPut("/",
                async (UpdateCourseCommand command, IMediator mediator) =>
                    (await mediator.Send(command)).ToGenericResult())
            .WithName("UpdateCourse")
            .AddEndpointFilter<ValidationFilter<UpdateCourseCommand>>()
            .RequireAuthorization()
            .RequireAuthorization("InstructorRole");

        return group;
    }
}