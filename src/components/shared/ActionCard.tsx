import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";


interface ActionCardProps {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
}

export function ActionCard({ title, description, href, Icon }: ActionCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  }

  return (
    <div className="cursor-pointer h-full" onClick={handleClick}>
      <Card className="hover:bg-muted/50 transition-colors h-full">
          <CardHeader className="flex flex-row items-center gap-4">
            <Icon className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </CardHeader>
        </Card>
    </div>
  );
}
