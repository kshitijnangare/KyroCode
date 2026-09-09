import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge.
 * This is essential for preventing class conflicts in your components.
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}