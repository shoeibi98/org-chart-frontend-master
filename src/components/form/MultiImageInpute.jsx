// eslint-disable-next-line import/prefer-default-export
import React, { useCallback, useMemo, useState } from "react"
import Icon from "@mui/material/Icon"
import Fab from "@mui/material/Fab"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Grid } from "@mui/material"

function MultiImageInput({
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
  const MAX_COUNT = 5

  const [uploadedFiles, setUploadedFiles] = useState([])
  const [fileLimit, setFileLimit] = useState(false)
  const [images, setImages] = useState([])
  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles]
    let limitExceeded = false
    // eslint-disable-next-line array-callback-return,consistent-return
    files.some((file) => {
      if (uploaded.findIndex((item) => item.name === file.name) === -1) {
        uploaded.push(file)
        if (uploaded.length === MAX_COUNT) setFileLimit(true)
        if (uploaded.length > MAX_COUNT) {
          console.log(`You can only add a maximum of ${MAX_COUNT} files`)
          setFileLimit(false)
          limitExceeded = true
          return true
        }
      }
      if (!limitExceeded) setUploadedFiles(uploaded)
    })
  }
  const onFileSelect = useCallback(
    (event) => {
      const chosenFiles = Array.prototype.slice.call(event.target.files)
      handleUploadFiles(chosenFiles)
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < chosenFiles.length; i++) {
        const reader = new FileReader()
        reader.readAsDataURL(chosenFiles[i])
        reader.onload = function onLoadFile() {
          const { result } = reader
          setImages(() => [{ data: result }, ...images])
        }
      }
      console.log(images)
      return field.onChange(images)
    },
    [field, handleUploadFiles, images]
  )
  const onClearInput = useCallback(() => {
    setImages(field.name, null)
    return field.onChange(images)
  }, [field, images])

  const isImage = useMemo(() => {
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

  return (
    <div
      className={`m-4 p-5 rounded border-gray-400 border-1 hover:border-gray-700 ${
        fieldState.invalid && `border-red-A700`
      }`}
    >
      <div className="flex items-center justify-items-center">
        <Icon className="m-6 ml-0 mr-5">add_a_photo</Icon>
        <input
          className="position-absolute p-6 "
          type="file"
          onChange={onFileSelect}
          disabled={fileLimit}
          multiple
          accept="image/png,image/jpg,image/jpeg"
        />
      </div>
      {isImage && (
        <Grid container spacing={3} className="flex justify-items-center m-3">
          {field.value.map((file) => (
            <Grid xs={6}>
              <div className="flex items-center" key={file.data}>
                <img
                  src={file.data}
                  alt=""
                  className="rounded-lg h-100 w-auto cursor-pointer p-3 m-3"
                  style={{
                    maxHeight: 60,
                    maxWidth: "50%",
                    objectFit: "contain"
                  }}
                />
                <Fab onClick={onClearInput} size="small">
                  <DeleteForeverIcon />
                </Fab>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}
export default React.memo(MultiImageInput)
