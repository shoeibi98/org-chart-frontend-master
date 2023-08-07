import TextField from "@mui/material/TextField"
import React from "react"
import {Icon, InputAdornment} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";

function Input({
                 label = undefined,
                 required = false,
                 id,
                 error,
                 field,
                 formState,
                 fieldState,
                 type = "text",
                 inputIcon,
                 ...props
               }) {

  return (
    <div className="m-4 p-5">
      <TextField
        id={id}
        type={type}
        label={`${label}${required && " *"}`}
        fullWidth
        error={fieldState.error}
        InputProps={(!!inputIcon) && {
          startAdornment: (
          <InputAdornment position='start'>
            <Icon icon='mdi:email-outline' />
          </InputAdornment>
          )
        }}
        {...field}
        {...props}
      />
      {fieldState.error && (
        <FormHelperText sx={{color: 'error.main'}}>
          {fieldState.error.message}
        </FormHelperText>
      )}
    </div>
  )
}

export default React.memo(Input)
