/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Field } from "formik";
import { useState } from "react";

function PasswordField({ name, label }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div>
          <Typography>{label}</Typography>
          <OutlinedInput
            size="small"
            {...field}
            type={showPassword ? "text" : "password"}
            fullWidth
            onBlur={() => {}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {meta.touched && meta.error && (
            <div style={{ color: "red" }}>{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}

export default PasswordField;
