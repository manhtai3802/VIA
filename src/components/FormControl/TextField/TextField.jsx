/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { Field } from 'formik';

export default function TextField({ name, label, ...props }) {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div>
          <Typography>{label}</Typography>
          <MuiTextField
            size="small"
            fullWidth
            {...field}
            error={!!meta.touched && !!meta.error}
            onBlur={() => {}}
            {...props}
          />
          {meta.touched && meta.error && <div style={{ color: 'red' }}>{meta.error}</div>}
        </div>
      )}
    </Field>
  );
}
