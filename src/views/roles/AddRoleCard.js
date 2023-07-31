import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {useRoleContext} from "./RoleWrapper";
import {useTranslation} from "react-i18next";
import i18next from 'i18next'
import fa from 'src/i18n/role/fa'

i18next.addResourceBundle('fa', 'role', fa)

const AddRoleCard = () => {
  const {t} = useTranslation('role')
  const {handleClickOpen, setDialogTitle} = useRoleContext()


  return <Grid item xs={12} sm={4} lg={3}>
    <Card
      sx={{cursor: 'pointer'}}
      onClick={() => handleClickOpen()}
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
                  setDialogTitle('add')
                }}
              >
                {t("createRole")}
              </Button>
              <Typography variant='body2'>{t("descriptionCreateRole")}</Typography>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  </Grid>
}
export default AddRoleCard
