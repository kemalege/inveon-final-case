using Microsoft.AspNetCore.Identity;

namespace InveonFinalCase.API.Domain.Entities;

public class AppUser: IdentityUser
{
    public string? City { get; set; }
    
}