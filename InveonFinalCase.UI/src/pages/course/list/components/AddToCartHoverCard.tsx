import { Button } from "@/components/ui/button";
import { HoverCardContent } from "@/components/ui/hover-card";

export function AddToCartHoverCard({ summary }: { summary: string }) {
  return (
    <HoverCardContent className="w-80 p-4 shadow-lg border border-border rounded-lg bg-card">
      <h3 className="text-lg font-semibold">Description</h3>
      <p className="text-muted-foreground text-sm mt-2">{summary}</p>
      <Button className="mt-4 w-full bg-purple-600 font-semibold text-white">Add to Cart</Button>
    </HoverCardContent>
  );
}
