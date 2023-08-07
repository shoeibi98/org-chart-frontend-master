import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import TextField from "@mui/material/TextField"
import React from "react"
import {AdapterDateFnsJalali} from '@mui/x-date-pickers/AdapterDateFnsJalali';

function JalaliDatePicker({
                            label = undefined,
                            disabled = false,
                            required = false,
                            onChange,
                            field,
                            formState,
                            fieldState,
                            ...props
                          }) {

  return (
    <div className="m-4 p-5">
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <DatePicker
          sx={{width:"100%"}}
          label={label}
          value={field.value}
          disabled={disabled}
          error={fieldState.error}
          renderInput={(params) => (
            <TextField fullWidth error={fieldState.error} required={required} {...params} />
          )}
          {...field}
          {...props}
        />
      </LocalizationProvider>
    </div>
  )
}

export default React.memo(JalaliDatePicker)
