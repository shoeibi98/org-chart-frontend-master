import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useRoleContext} from "./RoleWrapper";
import {useTranslation} from "react-i18next";
import i18next from 'i18next'
import fa from 'src/i18n/role/fa'
import {useQuery} from "@tanstack/react-query";
import {getPermissionsList} from "../../services/permissions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {useState} from "react";
import {Controller, useForm} from "react-hook-form";

i18next.addResourceBundle('fa', 'role', fa)


const EntryRoleDialog = () => {

  const {t} = useTranslation('role')
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const {open, handleClose, dialogTitle} = useRoleContext()
  const {data: permissionsData} = useQuery({
      queryKey: ["permissionsData"],
      queryFn: getPermissionsList
    }
  )


  const {
    control,
    handleSubmit,
    formState: {errors}
  } = useForm({
    mode: 'onBlur',
  })


  const togglePermission = id => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  const onSubmit = data => {
    console.log(data)
  }


  console.log(selectedCheckbox)

  return <>
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Typography variant='h5' component='span'>
            {dialogTitle === "add" ?
              t("createRole") : t("editRole")}
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            pb: theme => `${theme.spacing(5)} !important`,
            px: theme => [`${theme.spacing(15)} !important`, `${theme.spacing(15)} !important`]
          }}
        >
          <Box sx={{my: 4}}>
            <FormControl fullWidth sx={{mb: 4}}>
              <Controller
                name="roleName"
                control={control}
                render={({field: {value, onChange, onBlur}}) => (
                  <TextField
                    autoFocus
                    label={t('roleName')}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.username)}
                    required
                  />
                )}
              />
            </FormControl>
          </Box>

          <Typography variant='h6'>{t("rolePermissions")}</Typography>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  {/*<TableCell sx={{pl: '0 !important'}}>
                  <Box
                    sx={{
                      display: 'flex',
                      fontSize: '0.875rem',
                      whiteSpace: 'nowrap',
                      alignItems: 'center',
                      textTransform: 'capitalize',
                      '& svg': {ml: 1, cursor: 'pointer'}
                    }}
                  >
                    Administrator Access
                    <Tooltip placement='top' title='Allows a full access to the system'>
                      <Box sx={{display: 'flex'}}>
                        <Icon icon='mdi:information-outline' fontSize='1rem'/>
                      </Box>
                    </Tooltip>
                  </Box>
                </TableCell>
                <TableCell colSpan={3}>
                  <FormControlLabel
                    label='Select All'
                    sx={{'& .MuiTypography-root': {textTransform: 'capitalize'}}}
                   control={
                      <Checkbox
                        size='small'
                        onChange={handleSelectAllCheckbox}
                        indeterminate={isIndeterminateCheckbox}
                        checked={selectedCheckbox.length === rolesArr.length * 3}
                      />
                    }
                  />
                </TableCell>*/}
                </TableRow>
              </TableHead>
              <TableBody>
                {permissionsData?.map((item, index) => {
                  // const id = i.toLowerCase().split(' ').join('-')

                  return (
                    <TableRow key={index} sx={{'& .MuiTableCell-root:first-of-type': {pl: '0 !important'}}}>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                          color: theme => `${theme.palette.text.primary} !important`
                        }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell>
                        <FormControlLabel
                          label={t("assignPermission")}
                          control={
                            <Checkbox
                              size='small'
                              id={`${item.id}-read`}
                              onChange={() => togglePermission(`${item.id}-hasPermission`)}
                              checked={selectedCheckbox.includes(`${item.id}-hasPermission`)}
                            />
                          }
                        />
                      </TableCell>
                      {/* <TableCell>
                      <FormControlLabel
                        label='Write'
                        control={
                          <Checkbox
                            size='small'
                            id={`${id}-write`}
                            onChange={() => togglePermission(`${id}-write`)}
                            checked={selectedCheckbox.includes(`${id}-write`)}
                          />
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        label='Create'
                        control={
                          <Checkbox
                            size='small'
                            id={`${id}-create`}
                            onChange={() => togglePermission(`${id}-create`)}
                            checked={selectedCheckbox.includes(`${id}-create`)}
                          />
                        }
                      />
                    </TableCell>*/}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
          }}
        >
          <Box className='demo-space-x'>
            <Button size='large' type='submit' variant='contained'>
              {t("submit")}
            </Button>
            <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
              {t("cancel")}
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  </>
}
export default EntryRoleDialog
