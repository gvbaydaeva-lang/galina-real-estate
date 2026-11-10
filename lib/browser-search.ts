import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  return () => window.removeEventListener("popstate", onStoreChange);
}

function getSnapshot() {
  return window.location.search;
}

function getServerSnapshot() {
  return "";
}

export function useBrowserSearch() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
