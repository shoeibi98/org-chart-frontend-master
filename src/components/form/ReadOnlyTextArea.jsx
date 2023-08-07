import TextField from "@mui/material/TextField"
import React from "react"

function ReadOnlyTextArea({
  errors,
  label = undefined,
  value = undefined,
  id,
  field,
  formState,
  fieldState,
  ...props
}) {
  return (
    <div className="m-4 p-5">
      <TextField
        id={id}
        label={label}
        defaultValue={value}
        variant="outlined"
        fullWidth
        disabled
        {...props}
      />
    </div>
  )
}
export default React.memo(ReadOnlyTextArea)
