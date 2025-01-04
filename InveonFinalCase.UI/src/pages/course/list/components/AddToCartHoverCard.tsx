import { HoverCardContent } from "@/components/ui/hover-card";

export function AddToCartHoverCard({
  summary,
  children,
}: {
  summary: string;
  children?: React.ReactNode;
}) {
  return (
    <HoverCardContent className="w-80 p-4 shadow-lg border border-border rounded-lg bg-card">
      <h3 className="text-lg font-semibold">Description</h3>
      <p className="text-muted-foreground text-sm mt-2">{summary}</p>
      <div className="mt-4">
          {children}
      </div>
    </HoverCardContent>
  );
}
