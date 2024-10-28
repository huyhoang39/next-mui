import { TextField } from '@mui/material';
import { HTMLInputTypeAttribute } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormItemProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
}

export default function FormInput<T extends FieldValues>({ control, name, label, type, disabled }: FormItemProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          required
          fullWidth
          autoComplete={name}
          label={label}
          type={type}
          value={field.value}
          onChange={field.onChange}
          disabled={disabled}
          error={!!fieldState.error}
          helperText={!!fieldState.error ? fieldState.error?.message : undefined}
        />
      )}
    />
  );
}
