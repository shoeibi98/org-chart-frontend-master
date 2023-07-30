import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import EntryRoleDialog from "./EntryRoleDialog";

const AddRoleCard = () => {

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    /*setSelectedCheckbox([])
       setIsIndeterminateCheckbox(false)*/
  }

  return <Grid item xs={12} sm={4} lg={3}>
    <Card
      sx={{cursor: 'pointer'}}
      //onClick={() => handleClickOpen()}
    >
      <Grid container sx={{height: '100%'}}>
        <Grid item xs={5}>
          <Box sx={{height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>
            <img width={65} height={130} alt='add-role' src='/images/pages/add-new-role-illustration.png'/>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <CardContent>
            <Box sx={{textAlign: 'right'}}>
              <Button
                variant='contained'
                sx={{mb: 2.5, whiteSpace: 'nowrap'}}
                onClick={() => {
                  handleClickOpen()
                  /*  setDialogTitle('Add')*/
                }}
              >
                ایجاد نقش
              </Button>
              <Typography variant='body2'>درصورت وجود نداشتن نقش مورد نظر، آن را ایجاد کنید.</Typography>
            </Box>
          </CardContent>
          {open && <EntryRoleDialog dialogTitle={'افزودن'} open={open} handleClose={handleClose}/>}
        </Grid>
      </Grid>
    </Card>
  </Grid>
}
export default AddRoleCard
