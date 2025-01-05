using InveonFinalCase.API.Features.Categories.Dtos;

namespace InveonFinalCase.API.Features.Categories;

public class CategoryMapping : Profile
{
    public CategoryMapping()
    {
        CreateMap<Category, CategoryDto>().ReverseMap();
    }
}