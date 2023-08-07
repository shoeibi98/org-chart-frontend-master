// eslint-disable-next-line import/prefer-default-export
import FormControlLabel from "@mui/material/FormControlLabel"
import RadioGroup from "@mui/material/RadioGroup"
import FormLabel from "@mui/material/FormLabel"
import {Radio as MaterialRadio} from "@mui/material"
import React from "react"
import FormHelperText from "@mui/material/FormHelperText";

function Radio({
                 label = undefined,
                 options = [],
                 row = false,
                 field,
                 formState,
                 fieldState,
                 ...props
               }) {

  return (
    <div
      className={`m-8 p-5 border-1  border-gray-400hover:border-gray-700 ${
        field.value === undefined && `border-red-A700`
      }`}
    >
      <FormLabel color="error">{label}</FormLabel>
      <RadioGroup row {...field}>
        {options?.map((item) => (
          <FormControlLabel
            key={item.id}
            value={item.id}
            control={<MaterialRadio size="small"/>}
            sx={{color: "black"}}
            label={item.value}
          />
        ))}
      </RadioGroup>
    {/*  {   field.value === undefined&& <FormHelperText>helperText</FormHelperText>}*/}

    </div>
  )
}

export default React.memo(Radio)
