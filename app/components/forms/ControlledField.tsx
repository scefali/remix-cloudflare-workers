import React from 'react';
import { Controller } from 'react-hook-form';

import Field from './Field';

type Props = {
  name: string;
  control: any; // TODO: fix types
} & React.ComponentProps<typeof Field>;

export default function ControlledField({ name, control, ...rest }: Props) {
  return (
    <Controller
      {...{ name, control }}
      // don't pass ref
      render={({ field: { ref, value, ...field }, fieldState: { error } }) => {
        const errorMessage = error?.message;
        console.log({field, rest})
        // TODO: find better way of prevent value being undefined because no default value given
        return <Field {...{ errorMessage }} value={value || ''} {...field} {...rest} />;
      }}
    />
  );
}