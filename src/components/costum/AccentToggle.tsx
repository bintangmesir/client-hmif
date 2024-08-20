import { Palette } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useEffect } from "react";

const accents = [
  {
    name: "zinc",
    color: "240 5.2% 33.9%",
  },
  {
    name: "slate",
    color: "215.3 19.3% 34.5%",
  },
  {
    name: "stone",
    color: "33.3 5.5% 32.4%",
  },
  {
    name: "gray",
    color: "215 13.8% 34.1%",
  },
  {
    name: "neutral",
    color: "0 0% 32.2%",
  },
  {
    name: "red",
    color: "0 72.2% 50.6%",
  },
  {
    name: "rose",
    color: "346.8 77.2% 49.8%",
  },
  {
    name: "orange",
    color: "20.5 90.2% 48.2%",
  },
  {
    name: "green",
    color: "142.1 70.6% 45.3%",
  },
  {
    name: "blue",
    color: "217.2 91.2% 59.8%",
  },
  {
    name: "yellow",
    color: "47.9 95.8% 53.1%",
  },
  {
    name: "violet",
    color: "263.4 70% 50.4%",
  },
];

const AccentToggle = () => {
  const { switcher, themes, currentTheme } = useThemeSwitcher();

  useEffect(() => {
    const savedTheme = localStorage.getItem("accent");
    if (savedTheme && themes[savedTheme]) {
      switcher({ theme: themes[savedTheme] });
    } else {
      localStorage.setItem("accent", "zinc");
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("accent");
    if (savedTheme && themes[savedTheme]) {
      const accent = accents.filter((accent) => accent.name === savedTheme);

      if (accent.length < 1) {
        return switcher({ theme: "zinc" });
      }
      switcher({ theme: themes[savedTheme] });
    }
  }, [themes, switcher]);

  const handleAccentChange = (accentName: string) => {
    switcher({ theme: themes[accentName] });
    localStorage.setItem("accent", accentName);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="grid grid-cols-3 gap-1" align="end">
        {accents.map((accent, id) => {
          return (
            <DropdownMenuItem
              key={id}
              className={`${currentTheme === accent.name ? "justify-center border-2 border-primary bg-primary text-primary-foreground" : ""} capitalize`}
              onClick={() => handleAccentChange(accent.name)}
            >
              <span
                className={`${currentTheme === accent.name ? "hidden" : "flex"} mr-1 h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full border-card`}
                style={{
                  backgroundColor: `hsl(${accent.color})`,
                }}
              ></span>
              {accent.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccentToggle;
