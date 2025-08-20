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

  React.useEffect(() => {
    // faqat shu componentga tegishli math-fieldni olamiz
    const el = mathfield.current;
    if (!el) return;

    const handleFocus = () => {
      mathVirtualKeyboard.layouts = ["numeric", "symbols"];
      mathVirtualKeyboard.visible = true;
    };

    el.addEventListener("focus", handleFocus);

    return () => {
      el.removeEventListener("focus", handleFocus);
    };
  }, []);

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
