import Link from "@/components/site-link";

type BackNavigationProps = {
  href: string;
  label: string;
};

export function BackNavigation({ href, label }: BackNavigationProps) {
  return <p><Link className="text-link" href={href}><span aria-hidden="true">← </span>{label}</Link></p>;
}
