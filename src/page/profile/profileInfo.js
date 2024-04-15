import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import ProfileNavBar from "./profileNavbar";
import Notification from "../../components/Notification/Notification";
import { Button } from "../../components/Button/Button";
import { ProfileContainer, ProfileInfoContainer, ProfileLoading } from "./profileStyles";
import { callApiGetUserByEmail, callApiUpdateProfile } from "../../api/user";

const information = {
    biography: "I am a web developer with 10 years of experience.",
    website: "https://www.example.com",
    facebook: "https://www.facebook.com",
    linkedin: "https://www.linkedin.com",
}

const getUserInfo = async () => {
    var userInfo = await callApiGetUserByEmail(localStorage.getItem('email'));
    return userInfo;
}

export default function ProfileInfo() {
    const navigate = useNavigate();
    const [notification, setNotification] = React.useState({});
    const { data, isLoading } = useQuery('userInfo', getUserInfo);
    const profileMutation = useMutation(
        (profileChange) => callApiUpdateProfile(profileChange),
        {
            onSuccess: (data) => {
                if(data.success){
                    setNotification({
                        content: data.message,
                        visible: true
                    });
                    navigate('/profile/info');
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

    var userInfo = data;
    if(isLoading){
        return (
            <ProfileLoading>
                <CircularProgress color="inherit" />
            </ProfileLoading>
        );
    }

    function handleSubmit(event){
        event.preventDefault();
        
        const form = event.target;
        
        const profileInfo = {
            email: localStorage.getItem('email'),
            fullName: form?.fullname?.value,
            biography: form?.biography?.value,
            website: form?.website?.value,
            facebook: form?.facebook?.value,
            linkedin: form?.linkedin?.value,
        };

        if(profileInfo.firstName === "" || profileInfo.lastName === ""){
            setNotification({
                content: "Please fill in all fields",
                visible: true
            });
            return;
        }

        profileMutation.mutate(profileInfo);
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
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <ProfileInfoContainer>
                            <h4>Username</h4>
                            <TextField name="fullname" variant="outlined" defaultValue={localStorage.getItem('fullname')} fullWidth required/>
                        </ProfileInfoContainer>

                        <ProfileInfoContainer>
                            <h4>Biography</h4>
                            <TextField name="biography" multiline variant="outlined" rows={3} defaultValue={userInfo?.metadata?.biography} placeholder={information?.biography} fullWidth/>
                            <p className="profile-note">To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality. Your biography should have at least 50 words, links and coupon codes are not permitted.</p>
                        </ProfileInfoContainer>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ProfileInfoContainer>
                            <h4>Website</h4>
                            <TextField name="website" variant="outlined" defaultValue={userInfo?.metadata?.website} placeholder={information?.website} fullWidth/>
                        </ProfileInfoContainer>

                        <ProfileInfoContainer>
                            <h4>Facebook</h4>
                            <TextField name="facebook" variant="outlined" defaultValue={userInfo?.metadata?.facebook} placeholder={information?.facebook} fullWidth/>
                        </ProfileInfoContainer>
                        
                        <ProfileInfoContainer>
                            <h4>LinkedIn</h4>
                            <TextField name="linkedin" variant="outlined" defaultValue={userInfo?.metadata?.linkedin} placeholder={information?.linkedin}fullWidth/>
                        </ProfileInfoContainer>
                    </Grid>
                </Grid>

                <Button 
                    id="infoSaveBtn" 
                    width="fit-content" 
                    padding="16px 20px" 
                    fontWeight="700" 
                    type="submit"
                >
                    Save
                </Button>
            </form>
        </ProfileContainer>
    );
}