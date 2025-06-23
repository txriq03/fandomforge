"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/data/navItems";
const BottomBar = () => {
  const pathname = usePathname();

  return (
    <nav className="scrollbar-none fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden overflow-x-auto">
      <ul className="flex min-w-max justify-evenly items-center gap-4 px-4 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.name} className="shrink-0">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 text-xs px-3 py-1 transition-colors duration-400",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomBar;
