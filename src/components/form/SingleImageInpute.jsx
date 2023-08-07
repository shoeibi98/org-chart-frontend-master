import TextField from "@mui/material/TextField"
import React, { useCallback, useState } from "react"
import Icon from "@mui/material/Icon"

function SingleImageInput({
  label = undefined,
  required = false,
  id,
  field,
  formState,
  fieldState,
  type = "text",
  maxSize = 1024,
  ...props
}) {
  const allowedImageTypes = ["image/jpg", "image/png", "image/jpeg"]
  const [image, setImage] = useState("")
  const validateImage = useCallback(
    (file) => {
      if (!allowedImageTypes.includes(file.type)) {
        console.log("validation.invalid-image")
        return false
      }

      const maxSizeBytes = maxSize * 1024
      if (file.size > maxSizeBytes) {
        console.log("validation.invalid-file-size")
        return false
      }

      return true
    },
    [allowedImageTypes, maxSize]
  )
  const handleChange = useCallback(
    (e) => {
      const reader = new FileReader()
      if (e?.target?.files && e.target.files[0]) {
        const file = e.target.files[0]
        if (validateImage(file)) {
          reader.readAsDataURL(file)
          reader.onload = function onLoadFile() {
            setImage(reader.result)
            return field.onChange(reader.result)
          }
        }
      }
    },
    [field, validateImage]
  )
  return (
    <div className="my-8 p-5">
      <div className="flex items-center justify-items-center pr-0">
        <TextField
          type={type}
          id={id}
          error={fieldState.invalid}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: <Icon className="mt-6 ml-3">photo_camera</Icon>
          }}
          required={required}
          onChange={handleChange}
          {...field.name}
          {...field.ref}
          {...props}
        />
        {image !== "" && (
          <img
            src={image}
            alt=""
            className="rounded border-1 border-gray-400 h-100 w-auto cursor-pointer"
            style={{
              maxHeight: 50,
              objectFit: "contain"
            }}
          />
        )}
      </div>
    </div>
  )
}
export default React.memo(SingleImageInput)
