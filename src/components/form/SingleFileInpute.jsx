// eslint-disable-next-line import/prefer-default-export
import TextField from "@mui/material/TextField"
import React, { useCallback, useMemo, useState } from "react"
import Icon from "@mui/material/Icon"
import Typography from "@mui/material/Typography"

// eslint-disable-next-line import/prefer-default-export
function SingleFileInput({
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allowedImageTypes = ["image/jpg", "image/png", "image/jpeg", "application/pdf"]
  const [inputFile, setInputFile] = useState("")
  const validateFile = useCallback(
    (file) => {
      if (!allowedImageTypes.includes(file.type)) {
        return false
      }

      const maxSizeBytes = maxSize * 1024
      return file.size <= maxSizeBytes;


    },
    [allowedImageTypes, maxSize]
  )
  const handleChange = useCallback(
    (e) => {
      const reader = new FileReader()
      if (e?.target?.files && e.target.files[0]) {
        const file = e.target.files[0]
        if (validateFile(file)) {
          reader.readAsDataURL(file)
          reader.onload = function onLoadFile() {
            setInputFile((value)=>(reader.result))
            console.log(inputFile)
            return field.onChange(reader.result)
          }
        }
        reader.onerror = function ReadingFailed() {}
      }
    },
    [field, validateFile]
  )
  const onClearInput = useCallback(() => {
    setInputFile(field.name, null)
  }, [field.name])

 /*  const isImage = useMemo(() => {
    let boolTemp = true
    if (!field?.value || field?.value?.length === 0) return false
    // console.log(field.value)
    // eslint-disable-next-line array-callback-return
    field.value.map((file) => {
      const mimeType = file.data
      // console.log("type", file)
      if (mimeType) {
        boolTemp = boolTemp || ["image/png", "image/jpg", "image/jpeg"].includes(mimeType)
        // console.log("if", boolTemp)
      } else {
        boolTemp = boolTemp && false
        // console.log("else", boolTemp)
      }
    })
    // console.log("return", boolTemp)
    return boolTemp
  }, [field.value])
 */
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
            startAdornment: <Icon className="mt-6 ml-3">attach_file</Icon>
          }}
          required={required}
          onChange={handleChange}
          {...field.name}
          {...field.ref}
          {...props}
        />
        {inputFile !== "" && (
          <img
            src={inputFile}
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
export default React.memo(SingleFileInput)
