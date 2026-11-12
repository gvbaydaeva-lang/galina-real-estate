export function sitePath(path: string, basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "") {
  if (path.startsWith("#")) return path;

  const normalizedBasePath = basePath.replace(/\/$/, "");
  const [pathname, suffix = ""] = path.split(/(?=[?#])/);
  if (pathname === "/") return `${normalizedBasePath || ""}/${suffix}`;
  const staticPath = pathname.endsWith(".html") ? pathname : `${pathname}.html`;

  return `${normalizedBasePath}${staticPath}${suffix}`;
}

export function siteAssetPath(path: string, basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "") {
  const normalizedBasePath = basePath.replace(/\/$/, "");
  return `${normalizedBasePath}${path.startsWith("/") ? path : `/${path}`}`;
}
