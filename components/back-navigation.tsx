import Link from "@/components/site-link";

type BackNavigationProps = {
  href: string;
  label: string;
};

export function BackNavigation({ href, label }: BackNavigationProps) {
  return <p className="back-navigation"><Link className="text-link" href={href} aria-label={label}><span aria-hidden="true">←</span></Link></p>;
}
