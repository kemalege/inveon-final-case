using System.Security.Claims;

namespace InveonFinalCase.API.Shared.Helpers;

public static class TokenHelper
{
    public static Guid GetUserId(HttpContext httpContext)
    {
        var userIdClaim = httpContext?.User.Claims
            .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
        {
            throw new UnauthorizedAccessException("User ID not found in token.");
        }

        return userId;
    }

    public static string GetInstructorName(HttpContext httpContext)
    {
        var instructorClaim = httpContext?.User.Claims
            .FirstOrDefault(c => c.Type == ClaimTypes.GivenName)?.Value;

        if (string.IsNullOrEmpty(instructorClaim))
        {
            throw new UnauthorizedAccessException("Instructor name not found in token.");
        }

        return instructorClaim;
    }
}
