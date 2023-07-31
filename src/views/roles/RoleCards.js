import {useQuery} from "@tanstack/react-query";
import {getRoles} from "../../services/roles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {AvatarGroup} from "@mui/lab";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Icon from 'src/@core/components/icon'
import Tooltip from "@mui/material/Tooltip";
import {useRoleContext} from "./RoleWrapper";
import {useTranslation} from "react-i18next";
import i18next from 'i18next'
import fa from 'src/i18n/role/fa'


i18next.addResourceBundle('fa', 'role', fa)


const RoleCards = () => {

  const {setOpen, setDialogTitle} = useRoleContext()
  const {t} = useTranslation('role')

  const {data: rolesData} = useQuery({
      queryKey: ["rolesData"],
      queryFn: getRoles
    }
  )

  return <>
    {rolesData?.data?.map((item, index) => (
      <Grid item xs={12} sm={4} lg={3} key={index}>
        <Card>
          <CardContent>
            {/*{` ${item?.users.length} کاربر`}*/}
            <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography variant='body2'>
                {t('userAssign', {value: item?.users.length})}
              </Typography>
              <AvatarGroup max={4} sx={{'& .MuiAvatar-root': {width: 40, height: 40, fontSize: '0.875rem'}}}>
                {item?.users.map((user, index) => (
                  <Tooltip key={index} title={user}>
                    <Avatar/>
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <Box sx={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
                <Typography variant='h6'>{item.name}</Typography>
                {/* <Typography
                  href='/'
                  variant='body2'
                  component={Link}
                  sx={{color: 'primary.main', textDecoration: 'none'}}
                  onClick={e => {
                    e.preventDefault()
                    handleClickOpen()
                    setDialogTitle('Edit')
                  }}
                >
                  Edit Role
                </Typography>*/}
              </Box>
              <Tooltip title={t("editRole")}>
                <IconButton sx={{color: 'text.secondary'}} onClick={() => {
                  setDialogTitle("edit")
                  setOpen(true)
                }}>
                  <Icon icon='mdi:note-edit-outline' fontSize={20}/>
                </IconButton>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </>
}
export default RoleCards
