import MaskedInput from "react-text-mask";
import React from "react";

const CustomMaskedInput = React.forwardRef(function CustomMaskedInput(
  props,
  ref
) {
  return (
    <MaskedInput
      {...props}
      ref={ref}
      mask={[
        "+",
        "3",
        "8",
        " ",
        "(",
        /[0-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
      ]}
    />
  );
});

export default CustomMaskedInput;
