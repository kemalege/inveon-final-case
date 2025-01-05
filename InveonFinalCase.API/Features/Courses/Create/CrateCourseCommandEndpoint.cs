﻿using InveonFinalCase.API.Shared.Filters;
using Microsoft.AspNetCore.Mvc;

namespace InveonFinalCase.API.Features.Courses.Create;

public static class CreateCourseCommandEndpoint
{
    public static RouteGroupBuilder CreateCourseGroupItemEndpoint(this RouteGroupBuilder group)
    {
        group.MapPost("/",
                async (CreateCourseCommand command, IMediator mediator) =>
                    (await mediator.Send(command)).ToGenericResult())
            .RequireAuthorization()
            .RequireAuthorization("InstructorRole")
            .WithName("CreateCourse")
            .Produces<Guid>(StatusCodes.Status201Created)
            .Produces(StatusCodes.Status404NotFound)
            .Produces<ProblemDetails>(StatusCodes.Status400BadRequest)
            .Produces<ProblemDetails>(StatusCodes.Status500InternalServerError)
            .AddEndpointFilter<ValidationFilter<CreateCourseCommand>>();

        return group;
    }
}