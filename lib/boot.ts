export const BOOT_STORAGE_KEY = "portfolio:booted";
export const BOOT_ATTRIBUTE = "data-booted";

type ReadableStorage = Pick<Storage, "getItem">;
type WritableStorage = Pick<Storage, "setItem">;

export function hasBooted(storage: ReadableStorage | null): boolean {
  if (!storage) return false;
  try {
    return storage.getItem(BOOT_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markBooted(storage: WritableStorage | null, root: Element): void {
  try {
    storage?.setItem(BOOT_STORAGE_KEY, "1");
  } catch {
    // Storage can be blocked (private mode); the splash still hides for this page view.
  }
  root.setAttribute(BOOT_ATTRIBUTE, "true");
}

export function nextProgress(current: number): number {
  if (current >= 100) return 100;
  const step = current < 60 ? 5 : current < 90 ? 3 : 2;
  return Math.min(100, current + step);
}

/**
 * Runs synchronously while the HTML is parsed, before first paint, so returning
 * visitors never see the splash. See node_modules/next/dist/docs/01-app/02-guides/
 * preventing-flash-before-hydration.md.
 */
export const bootInlineScript = `(function(){try{if(sessionStorage.getItem("${BOOT_STORAGE_KEY}")==="1")document.documentElement.setAttribute("${BOOT_ATTRIBUTE}","true")}catch(e){}})()`;
