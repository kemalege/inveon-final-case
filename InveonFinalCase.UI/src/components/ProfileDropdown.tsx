import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router";

interface ProfileHoverCardProps {
    token?: {
        given_name?: string;
        email?: string;
    };
}

export function ProfileDropDown({ token }: ProfileHoverCardProps) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-foreground cursor-pointer">
                    {token?.given_name?.charAt(0).toUpperCase()}
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 bg-card shadow-lg border border-border p-4">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarFallback>
                            {token?.given_name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h4 className="text-lg font-semibold">{token?.given_name}</h4>
                        <p className="text-sm text-muted-foreground">{token?.email}</p>
                    </div>
                </div>
                <div className="mt-4 space-y-4 text-sm font-medium text-primary">
                    <Link to="/home/learning-content" className="block hover:text-purple-600">
                        Learning Content
                    </Link>
                    <Link to="/cart" className="block hover:text-purple-600">
                        Cart
                    </Link>
                    <Link to="/purchase-history" className="block hover:text-purple-600">
                        Purchase History
                    </Link>
                    <Link to="/user/edit-profile" className="block hover:text-purple-600">
                        Edit Profile
                    </Link>
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}
