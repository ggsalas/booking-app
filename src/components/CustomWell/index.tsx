import { SpectrumWellProps, Well } from "@adobe/react-spectrum";
import styles from "./styles.module.css";

type CustomWellProps = SpectrumWellProps & {
  color?: "blue";
};

export default function CustomWell({
  children,
  color,
  ...props
}: CustomWellProps) {
  return (
    <Well UNSAFE_className={color === "blue" ? styles.blue : ""} {...props}>
      {children}
    </Well>
  );
}
