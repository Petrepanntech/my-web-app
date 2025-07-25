import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";
import { useChat } from "@/context/ChatContext";

interface ActionCardProps {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  isChatTrigger?: boolean;
}

export function ActionCard({ title, description, href, Icon, isChatTrigger = false }: ActionCardProps) {
  const { setIsOpen } = useChat();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isChatTrigger) {
      e.preventDefault();
      setIsOpen(true);
    }
  }

  const CardContent = (
     <Card className="hover:bg-muted/50 transition-colors h-full" onClick={handleClick}>
        <CardHeader className="flex flex-row items-center gap-4">
          <Icon className="w-8 h-8 text-primary" />
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
  )

  return isChatTrigger ? (
    <div className="cursor-pointer">{CardContent}</div>
  ) : (
    <Link href={href}>
      {CardContent}
    </Link>
  );
}
