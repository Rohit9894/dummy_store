import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const readFileAsDataUrl = (file) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      if (typeof fileReader.result === 'string') return resolve(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  })
}
