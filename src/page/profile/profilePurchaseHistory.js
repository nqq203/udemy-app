import ProfileNavBar from "./profileNavbar";
import { ProfileContainer, ProfileInfoContainer } from "./profileStyles";
import Typography from "@mui/material/Typography";
import Notification from "../../components/Notification/Notification";

const ProfilePurchaseHistory = () => {
  return (
    <div>
      <ProfileContainer>
        <Typography
          variant="h4"
          fontWeight={800}
          fontFamily={"serif"}
          color="var(--color-gray-500)"
          marginLeft={1}
          marginBottom={2}
        >
          Profile & settings
        </Typography>
        <ProfileNavBar />
        <ProfileInfoContainer>

        </ProfileInfoContainer>
      </ProfileContainer>
    </div>
  );
};

export default ProfilePurchaseHistory;
