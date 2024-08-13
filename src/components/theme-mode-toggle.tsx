"use client";

import * as React from "react";

import { Theme } from "gif-picker-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { useThemeCustom } from "@/app/store/theme-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();
  const { setCustomTheme } = useThemeCustom();

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    setCustomTheme(theme === "system" ? Theme.AUTO : theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className={cn(
            theme === Theme.LIGHT ? "text-blue-500 font-medium" : ""
          )}
          onClick={() => handleThemeChange("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            theme === Theme.DARK ? "text-blue-500 font-medium" : ""
          )}
          onClick={() => handleThemeChange("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === "system" ? "text-blue-500 font-medium" : "")}
          onClick={() => handleThemeChange("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
