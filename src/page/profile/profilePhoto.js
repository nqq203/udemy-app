import ProfileNavBar from "./profileNavbar";
import { Button } from "../../components/Button/Button";
import { ProfileContainer, ProfileInfoContainer } from "./profileStyles";

export default function ProfilePhoto() {
    return (
        <ProfileContainer>
            <h1>Profile & settings</h1>

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