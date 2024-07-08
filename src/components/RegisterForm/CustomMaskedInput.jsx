import MaskedInput from "react-text-mask";

const CustomMaskedInput = (props) => {
  return (
    <MaskedInput
      {...props}
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
};

export default CustomMaskedInput;
