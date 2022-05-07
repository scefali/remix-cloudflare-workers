import React from "react";

import Input from "@mui/material/Input";

type Props = {
  errorMessage?: React.ReactNode;
} & React.ComponentProps<typeof Input>;

export default function Field({ errorMessage, ...rest }: Props) {
  return (
    <React.Fragment>
      <Input {...rest} />
      {errorMessage && <span>{errorMessage}</span>}
    </React.Fragment>
  );
}
