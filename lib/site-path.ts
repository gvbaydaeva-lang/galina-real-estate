export function sitePath(path: string, basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "") {
  if (!basePath || path.startsWith("#")) return path;

  const normalizedBasePath = basePath.replace(/\/$/, "");
  return path === "/" ? `${normalizedBasePath}/` : `${normalizedBasePath}${path}`;
}
