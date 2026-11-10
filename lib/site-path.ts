export function sitePath(path: string, basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "") {
  if (!basePath || path.startsWith("#")) return path;

  const normalizedBasePath = basePath.replace(/\/$/, "");
  if (path === "/") return `${normalizedBasePath}/`;

  const [pathname, suffix = ""] = path.split(/(?=[?#])/);
  const staticPath = pathname.endsWith(".html") ? pathname : `${pathname}.html`;

  return `${normalizedBasePath}${staticPath}${suffix}`;
}
