using InveonFinalCase.API.Features.Courses.Create;
using InveonFinalCase.API.Features.Courses.Dtos;

namespace InveonFinalCase.API.Features.Courses;

public class CourseMapping : Profile
{
    public CourseMapping()
    {
        CreateMap<CreateCourseCommand, Course>();
        CreateMap<Course, CourseDto>().ReverseMap();
    }
}