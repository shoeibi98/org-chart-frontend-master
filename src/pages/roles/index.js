import RoleCards from "../../views/roles/RoleCards";
import PageHeader from "../../@core/components/page-header";
import Box from "@mui/material/Box";
import AddRoleCard from "../../views/roles/AddRoleCard";
import Grid from "@mui/material/Grid";

const Roles = () => {
  return <>
    <Box sx={{mb: 4}}>
      <PageHeader title="مدیریت نقش ها"/>
    </Box>
    <Grid container spacing={6} className='match-height'>
      <RoleCards/>
      <AddRoleCard/>
    </Grid>
  </>
}

export default Roles
