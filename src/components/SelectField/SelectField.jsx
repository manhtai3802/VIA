/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { Field } from "formik";

export default function SelectField({ name, label, dataArr, ...props }) {
  return (
    <Field name={name}>
      {({ field }) => (
        <div>
          <Box style={{ minWidth: 120 }}>
            <Typography>{label}</Typography>
            <FormControl fullWidth>
              <Select
                style={{ height: "40px" }}
                {...field}
                {...props}
                fullWidth
              >
                {dataArr.map((val) => (
                  <MenuItem key={val.value} value={val.value}>
                    {val.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      )}
    </Field>
  );
}
