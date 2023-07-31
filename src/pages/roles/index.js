import RoleCards from "../../views/roles/RoleCards";
import PageHeader from "../../@core/components/page-header";
import Box from "@mui/material/Box";
import AddRoleCard from "../../views/roles/AddRoleCard";
import Grid from "@mui/material/Grid";
import RoleWrapper from "../../views/roles/RoleWrapper";
import EntryRoleDialog from "../../views/roles/EntryRoleDialog";

const Roles = () => {
  return <>
    <Box sx={{mb: 4}}>
      <PageHeader title="مدیریت نقش ها"/>
    </Box>
    <Grid container spacing={6} className='match-height'>
      <RoleWrapper>
        <>
          <RoleCards/>
          <AddRoleCard/>
          <EntryRoleDialog/>
        </>
      </RoleWrapper>
    </Grid>
  </>
}

export default Roles
