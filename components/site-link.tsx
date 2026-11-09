import type { ComponentProps } from "react";
import { sitePath } from "@/lib/site-path";

type SiteLinkProps = ComponentProps<"a">;

export default function SiteLink({ href, ...props }: SiteLinkProps) {
  return <a href={typeof href === "string" ? sitePath(href) : href} {...props} />;
}
