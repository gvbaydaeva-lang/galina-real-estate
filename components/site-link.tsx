import Link from "next/link";
import type { ComponentProps } from "react";
import { sitePath } from "@/lib/site-path";

type SiteLinkProps = ComponentProps<typeof Link>;

export default function SiteLink({ href, ...props }: SiteLinkProps) {
  return <Link href={typeof href === "string" ? sitePath(href) : href} {...props} />;
}
