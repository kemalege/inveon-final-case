﻿using InveonFinalCase.API.Shared.Dtos;
using InveonFinalCase.API.Shared.Exceptions;

namespace InveonFinalCase.API.Shared.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

public static class CustomExceptionHandler
{
    public static void UseCustomException(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(config =>
        {
            config.Run(async context =>
            {
                context.Response.StatusCode = 500;
                context.Response.ContentType = "application/json";

                var errorFeature = context.Features.Get<IExceptionHandlerFeature>();

                
                
                if (errorFeature != null)
                {
                    var ex = errorFeature.Error;

                    ErrorDto errorDto = null;

                    if (ex is CustomException)
                    {
                        errorDto = new ErrorDto(ex.Message, true);
                    }
                    else
                    {
                        errorDto = new ErrorDto(ex.Message, false);
                    }

                    var response = Response<NoDataDto>.Fail(errorDto, 500);

                    await context.Response.WriteAsync(JsonSerializer.Serialize(response));
                }
            });
        });
    }
}