import React from "react";
import { useMutation } from "react-query";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ProfileNavBar from "./profileNavbar";
import { Button } from "../../components/Button/Button";
import Notification from "../../components/Notification/Notification";
import { ProfileContainer, ProfileInfoContainer } from "./profileStyles";
import { callApiChangePassword } from "../../api/user";

export default function ProfilePhoto() {
    const [notification, setNotification] = React.useState({});
    const changePasswordMutation = useMutation(
        (newPassword) => callApiChangePassword(newPassword),
        {
            onSuccess: (data) => {
                if(data.success){
                    setNotification({
                        content: data.message, 
                        visible: true
                    });
                }
                else{
                    setNotification({
                        content: data.message, 
                        visible: true
                    });
                }
            }
        }
    );

    function handleChangePassword() {
        document.getElementById("changePassword").style.display = "block";
    }

    function handleSubmit(event){
        event.preventDefault();
        
        const form = event.target;

        const currentpassword = form.currentpassword.value;
        const newpassword = form.newpassword.value;
        const confirmpassword = form.confirmpassword.value;

        const data = {
            email: localStorage.getItem('email'),
            currentPassword: form.currentpassword.value,
            newPassword: form.newpassword.value,
            confirmpassword: form.confirmpassword.value,
        };

        if(confirmpassword.length < 1){
            return;
        }
        if(newpassword.length < 1 || currentpassword.length < 1){
            setNotification({
                content: "Please fill in all fields",
                visible: true
            });
        }
        if(newpassword !== confirmpassword){
            setNotification({
                content: "Passwords do not match",
                visible: true
            });
            return;
        }   

        changePasswordMutation.mutate(data);
        form.reset();
    }

    return (
        <ProfileContainer>
            <Notification message={notification.content} visible={notification.visible} onClose={() => setNotification({content: '', visible: false})}/>
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
                    <h4>Email</h4>
                    <TextField name="userid" variant="outlined" defaultValue={localStorage.getItem('email')} disabled/>
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