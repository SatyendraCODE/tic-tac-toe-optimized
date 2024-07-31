import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setColorVariantsClass(color: string, selectedColor: string) {
  const CLASS_NAME = "w-5 h-5 rounded-full";
  switch (color) {
    case "red":
      return color === selectedColor
        ? `${CLASS_NAME} bg-red-600 hover:bg-red-500 outline outline-offset-1 outline-2 outline-blue-400/70 dark:outline-blue-500/70 `
        : `${CLASS_NAME} bg-red-600 hover:bg-red-500 `;
    case "blue":
      return color === selectedColor
        ? `${CLASS_NAME} bg-blue-600 hover:bg-blue-500 outline outline-offset-1 outline-2 outline-blue-400/70 dark:outline-blue-500/70 `
        : `${CLASS_NAME} bg-blue-600 hover:bg-blue-500 `;
    case "green":
      return color === selectedColor
        ? `${CLASS_NAME} bg-green-600 hover:bg-green-500 outline outline-offset-1 outline-2 outline-blue-400/70 dark:outline-blue-500/70 `
        : `${CLASS_NAME} bg-green-600 hover:bg-green-500 `;
    case "amber":
      return color === selectedColor
        ? `${CLASS_NAME} bg-amber-600 hover:bg-amber-500 outline outline-offset-1 outline-2 outline-blue-400/70 dark:outline-blue-500/70 `
        : `${CLASS_NAME} bg-amber-600 hover:bg-amber-500 `;
    default:
      return color === selectedColor
        ? `${CLASS_NAME} bg-yellow-600 hover:bg-yellow-500 outline outline-offset-1 outline-2 outline-blue-400/70 dark:outline-blue-500/70 `
        : `${CLASS_NAME} bg-yellow-600 hover:bg-yellow-500 `;
  }
}
