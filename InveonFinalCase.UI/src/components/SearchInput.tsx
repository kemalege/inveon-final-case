import { useCategory } from "@/context/category-provider";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
const { searchTerm, setSearchTerm } = useCategory();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="relative flex-1">
            <Input
                type="text"
                placeholder="Search for anything"
                className="pl-10"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-muted-foreground" />
        </div>
    );
};

export default SearchInput;
