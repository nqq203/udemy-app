import Typography from "@mui/material/Typography";

import ProfileNavBar from "./profileNavbar";
import { Button } from "../../components/Button/Button";
import { ProfileContainer, ProfileInfoContainer } from "./profileStyles";

export default function ProfilePhoto() {
    return (
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
                <h4>Image preview</h4>
                <p className="profile-note">Minimum 200x200 pixels, Maximum 6000x6000 pixels</p>
            </ProfileInfoContainer>

            <Button 
                id="photoSaveBtn" 
                width="fit-content" 
                padding="16px 20px" 
                fontWeight="700" 
            >
                Save
            </Button>
        </ProfileContainer>
    );
}