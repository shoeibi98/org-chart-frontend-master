import React from "react"
import FormControlLabel from "@mui/material/FormControlLabel"
import { FormGroup } from "@mui/material"
import FormLabel from "@mui/material/FormLabel"
import Checkbox from "@mui/material/Checkbox"

function ArrayCheckbox({
  label = undefined,
  field,
  required,
  formState,
  fieldState,
  checkBoxValue = [],
  defaultChecked = false,
  ...props
}) {
  const [checkedState, setCheckedState] = React.useState({})
  const handleChange = (event) => {
    const { id, checked } = event.target
    // setCheckedState({ [id]:checked, ...checkedState })
    console.log(field.value, id, checked)
    return field.onChange({ [id]: checked, ...field.value })
  }

  /*  useEffect(() => {
    checkBoxValue.map((item) => setCheckedState((values) => ({ ...values, [item.id]: false })))
  }, [checkBoxValue])
 */
  return (
    <div
      className={`my-10 mx-7 p-5 rounded border-gray-400 border-1 hover:border-gray-700 ${
        fieldState.invalid && `border-red-A700`
      }`}
    >
      <FormLabel className={`${fieldState.invalid && `text-red`}`}>{label}</FormLabel>
      <FormGroup row>
        {checkBoxValue.map((item) => (
          <FormControlLabel
            key={item.id}
            value={checkedState}
            control={
              <Checkbox
                checked={checkedState[item.id]}
                name={item.value}
                id={item.id}
                size="small"
                onClick={handleChange}
              />
            }
            label={item.value}
            {...field.name}
            {...field.ref}
            {...field.onBlur}
          />
        ))}
      </FormGroup>
    </div>
  )
}

export default React.memo(ArrayCheckbox)
