import {Dialog, DialogActions, DialogTitle} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const EntryRoleDialog = ({open, handleClose, dialogTitle}) => {
  return <>
    <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
      <DialogTitle
        sx={{
          textAlign: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pt: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Typography variant='h5' component='span'>
          {`${dialogTitle}نقش `}
        </Typography>
        <Typography variant='body2'>Set Role Permissions</Typography>
      </DialogTitle>
      {/* <DialogContent
        sx={{
          pb: theme => `${theme.spacing(5)} !important`,
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`]
        }}
      >
        <Box sx={{my: 4}}>
          <FormControl fullWidth>
            <TextField label='Role Name' placeholder='Enter Role Name'/>
          </FormControl>
        </Box>
        <Typography variant='h6'>Role Permissions</Typography>
        <TableContainer>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell sx={{pl: '0 !important'}}>
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
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rolesArr.map((i, index) => {
                const id = i.toLowerCase().split(' ').join('-')

                return (
                  <TableRow key={index} sx={{'& .MuiTableCell-root:first-of-type': {pl: '0 !important'}}}>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        color: theme => `${theme.palette.text.primary} !important`
                      }}
                    >
                      {i}
                    </TableCell>
                    <TableCell>
                      <FormControlLabel
                        label='Read'
                        control={
                          <Checkbox
                            size='small'
                            id={`${id}-read`}
                            onChange={() => togglePermission(`${id}-read`)}
                            checked={selectedCheckbox.includes(`${id}-read`)}
                          />
                        }
                      />
                    </TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>*/}
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
          pb: theme => [`${theme.spacing(8)} !important`, `${theme.spacing(12.5)} !important`]
        }}
      >
        <Box className='demo-space-x'>
          <Button size='large' type='submit' variant='contained' onClick={handleClose}>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  </>
}
export default EntryRoleDialog
