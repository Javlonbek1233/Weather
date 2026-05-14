import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FETCH_WEATHER = async (city: string) => {
  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
    if (!response.ok) throw new Error("Weather service unavailable");
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
