using FluentValidation;
using FluentValidation.AspNetCore;

namespace InveonFinalCase.API.Shared.Extensions;

public static class CommonServiceExt
{
    public static IServiceCollection AddCommonServiceExt(this IServiceCollection services, Type assembly)
    {
        services.AddHttpContextAccessor();
        services.AddMediatR(x => x.RegisterServicesFromAssemblyContaining(assembly));

        services.AddFluentValidationAutoValidation();
        services.AddValidatorsFromAssemblyContaining(assembly);


        services.AddAutoMapper(assembly);
        return services;
    }
}