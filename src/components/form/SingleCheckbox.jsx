import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import React from "react"

 function SingleCheckbox  ({
  label = undefined,
  field,
  formState,
  fieldState,
  defaultChecked = false,
  ...props
})  {
  return (
    <div className={`my-14 mx-7 p-5 rounded border-gray-400 border-1 hover:border-gray-700 ${fieldState.invalid && `border-red-A700`}`}>
      <FormControlLabel
        control={<Checkbox defaultChecked={defaultChecked} size="small" />}
        label={label}
        {...field}
        {...props}
      />
    </div>
  )
}
export default React.memo(SingleCheckbox)
