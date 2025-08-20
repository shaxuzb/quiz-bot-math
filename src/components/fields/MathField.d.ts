import React from "react";

export interface MathFieldProps {
  value: string;
  onChange?: (val: string) => void;
  style?: React.CSSProperties;
}

export default function MathField(props: MathFieldProps): JSX.Element;
