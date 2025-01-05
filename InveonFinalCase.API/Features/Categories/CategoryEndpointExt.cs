using InveonFinalCase.API.Features.Categories.GetAll;
namespace InveonFinalCase.API.Features.Categories;

    public static class CategoryEndpointExt
    {
        public static void AddCategoryGroupEndpointExt(this WebApplication app)
        {
            app.MapGroup("api/v1/categories").WithTags("Categories")
                .GetAllCategoryGroupItemEndpoint();
        }
    }
