import * as React from "react";
import * as Mathlive from "mathlive";
import "mathlive";

Mathlive.MathfieldElement.locale = "en";
Mathlive.MathfieldElement.decimalSeparator = ",";
Mathlive.MathfieldElement.keypressSound = "none";
Mathlive.MathfieldElement.plonkSound = "none";

export default function Mathfield(props) {
  const mathfield = React.useRef(null);

  const onInput = () => {
    if (props.onChange) {
      props.onChange(mathfield.current?.getValue() || "");
    }
  };

  const init = (mf) => {
    if (mf) mathfield.current = mf;
  };

  return (
    <div>
      <math-field
        ref={init}
        value={props.value}
        onInput={onInput}
        style={props.style}
      ></math-field>
    </div>
  );
}
