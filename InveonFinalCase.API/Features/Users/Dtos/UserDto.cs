﻿namespace InveonFinalCase.API.Features.Users.Dtos;

public record UserDto(
    string Id,
    string UserName,
    string Email,
    string PhoneNumber,
    string City);
