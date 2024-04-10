import { Link, LinkProps } from "react-router-dom";

export default function LinkButton({
  children,
  ...props
}: LinkProps & React.RefAttributes<HTMLAnchorElement>) {
  // TODO: handle all button styles
  return (
    <Link
      {...props}
      className="Dniwja_spectrum-Button Dniwja_spectrum-BaseButton Dniwja_i18nFontFamily Dniwja_spectrum-FocusRing Dniwja_spectrum-FocusRing-ring"
      style={{ color: 'black' }}
    >
      <span className="Dniwja_spectrum-Button-label">{children}</span>
    </Link>
  );
}
