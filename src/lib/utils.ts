import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string and removes any conflicting Tailwind utility classes.
 *
 * @param inputs - The class names to be combined.
 * @returns The combined class names as a string.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
