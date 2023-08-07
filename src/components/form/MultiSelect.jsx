import {InputLabel, Select} from "@mui/material"
import React, {useState} from "react"
import MenuItem from "@mui/material/MenuItem";

function MultiSelect({
                       label = undefined,
                       options = [{}],
                       field,
                       formState,
                       fieldState,
                       required = false,
                     }) {

  const [value, setValue] = useState([])
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className="m-4 p-5">
      <InputLabel>{label} {!!required && " *"}</InputLabel>
      <Select
        multiple
        fullWidth
        label={label}
        value={value}
        options={options}
        onChange={handleChange}
        error={fieldState.error}
        {...field.name}
        {...field.onChange}
        {...field.onBlur}
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

export default React.memo(MultiSelect)
