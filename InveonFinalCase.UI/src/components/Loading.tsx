import { Loader2 } from "lucide-react";

export const Loading = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
        <Loader2 className="animate-spin w-16 h-16 text-primary" />
    </div>
);
