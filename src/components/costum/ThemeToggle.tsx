import { MonitorCog, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col" align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`${theme === "light" ? "border-2 border-primary bg-primary text-primary-foreground" : ""}`}
        >
          <Sun className="mr-2 h-[1rem] w-[1rem]" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`${theme === "dark" ? "border-2 border-primary bg-primary text-primary-foreground" : ""}`}
        >
          <Moon className="mr-2 h-[1rem] w-[1rem]" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`${theme === "system" ? "border-2 border-primary bg-primary text-primary-foreground" : ""}`}
        >
          <MonitorCog className="mr-2 h-[1rem] w-[1rem]" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
