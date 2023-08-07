import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"

const NoResult = () => {
  const { t } = useTranslation(["attributes"])

  return (
    <div className="flex flex-1 items-center justify-center h-full">
      <Typography color="textSecondary" variant="h5">
        {t("messages:NO_DATA")}
      </Typography>
    </div>
  )
}

export default NoResult