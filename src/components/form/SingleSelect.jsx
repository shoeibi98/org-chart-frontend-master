import {InputLabel, Select} from "@mui/material"
import React from "react"
import MenuItem from "@mui/material/MenuItem";

function SingleSelect({
                        label = undefined,
                        options = [{}],
                        field,
                        required = false,
                      formState,
                      fieldState
})
{
  return (
    <div className="m-4 p-5">
      <InputLabel>{label} {!!required && " *"}</InputLabel>
      <Select
        label={label}
        fullWidth
        value={field.value}
        error={fieldState.error}
        options={options}
        getOptionLabel={option => option.value || ''}
        // renderInput={params => <TextField {...params} label={`${label}${required && " *"}`}/>}
        {...field}
      >
        {options?.map((item) => (
          <MenuItem key={item.id} value={item.value} id={item.id}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </div>
  )
}

export default React.memo(SingleSelect)
