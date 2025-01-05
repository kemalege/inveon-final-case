import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCategory } from "@/context/category-provider";

const HeaderCategoryFilter = () => {
  const { categories, selectedCategory, setSelectedCategory } = useCategory();

  return (
    <>
      {window.location.pathname === "/" && (
        <nav className="bg-primary-foreground text-secondary-foreground">
          <div className="container mx-auto px-4 flex items-center text-sm font-medium">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "text-secondary-foreground hover:text-primary",
                  selectedCategory?.id === category.id ? "text-primary rounded-none border-b-2 border-purple-600" : ""
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </nav>
      )}
    </>
  );
};

export default HeaderCategoryFilter;
