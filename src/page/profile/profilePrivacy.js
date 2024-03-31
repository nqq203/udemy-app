import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ProfileNavBar from "./profileNavbar";
import { Button } from "../../components/Button/Button";
import { ProfileContainer, ProfileInfoContainer } from "./profileStyles";
import { Box } from "@mui/material";

const information = {
    userID: "123456",
    username: "JohnDoe",
}

export default function ProfilePhoto() {
    function handleChangePassword() {
        document.getElementById("changePassword").style.display = "block";
    }

    function handleSubmit(event){
        event.preventDefault();
        
        const form = event.target;

        const data = {
            userid: form.userid.value,
            username: form.username.value,
            currentpassword: form.currentpassword.value,
            newpassword: form.newpassword.value,
            confirmpassword: form.confirmpassword.value,
        };

        console.log(data);
    }

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

            <form onSubmit={handleSubmit}>

                <ProfileInfoContainer>
                    <h4>User ID</h4>
                    <TextField name="userid" variant="outlined" defaultValue={information.userID} disabled/>
                </ProfileInfoContainer>

                <ProfileInfoContainer>
                    <h4>Username</h4>
                    <TextField name="username" variant="outlined" defaultValue={information.username}/>
                </ProfileInfoContainer>

                <ProfileInfoContainer>
                    <Button 
                        id="changePasswordBtn" 
                        width="fit-content" 
                        padding="16px 20px" 
                        fontWeight="700" 
                        onClick={handleChangePassword}
                    >
                        Change Password
                    </Button>
                </ProfileInfoContainer>

                <Box id="changePassword" sx={{display: 'none'}}>
                    <ProfileInfoContainer>
                        <h4>Current password</h4>
                        <TextField name="currentpassword" type="password" variant="outlined" />
                    </ProfileInfoContainer>
                    <ProfileInfoContainer>
                        <h4>New password</h4>
                        <TextField name="newpassword" type="password" variant="outlined" />
                    </ProfileInfoContainer>
                    <ProfileInfoContainer>
                        <h4>Confirm new password</h4>
                        <TextField name="confirmpassword" type="password" variant="outlined" />
                    </ProfileInfoContainer>
                    <Button 
                        id="privacySaveBtn" 
                        width="fit-content" 
                        padding="16px 20px" 
                        fontWeight="700" 
                        type="submit"
                    >
                        Save
                    </Button>
                </Box>
            </form>
        </ProfileContainer>
    );
}