import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import ProfileNavBar from "./profileNavbar";
import { Button } from "../../components/Button/Button";
import { ProfileContainer, ProfileInfoContainer } from "./profileStyles";

const information = {
    firstName: "John",
    lastName: "Doe",
    headline: "Web Developer",
    biography: "I am a web developer with 10 years of experience.",
    website: "https://www.example.com",
    twitter: "https://www.twitter.com",
    facebook: "https://www.facebook.com",
    linkedin: "https://www.linkedin.com",
    youtube: "https://www.youtube.com",
}

export default function ProfileInfo() {
    function handleSubmit(event){
        event.preventDefault();
        
        const form = event.target;
        
        const data = {
            firstName: form.firstname.value,
            lastName: form.lastname.value,
            headline: form.headline.value,
            biography: form.biography.value,
            website: form.website.value,
            twitter: form.twitter.value,
            facebook: form.facebook.value,
            linkedin: form.linkedin.value,
            youtube: form.youtube.value,
        };

        console.log(data);
    }

    return (
        <ProfileContainer>
            <h1>Profile & settings</h1>

            <ProfileNavBar />

            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <ProfileInfoContainer>
                            <h4>First Name</h4>
                            <TextField name="firstname" variant="outlined" defaultValue={information.firstName} fullWidth required/>
                        </ProfileInfoContainer>

                        <ProfileInfoContainer>
                            <h4>Last Name</h4>
                            <TextField name="lastname" variant="outlined" defaultValue={information.lastName} fullWidth required/>
                        </ProfileInfoContainer>
                        
                        <ProfileInfoContainer>
                            <h4>Headline</h4>
                            <TextField name="headline" variant="outlined" defaultValue={information.headline} fullWidth/>
                        </ProfileInfoContainer>

                        <ProfileInfoContainer>
                            <h4>Biography</h4>
                            <TextField name="biography" multiline variant="outlined" rows={3} defaultValue={information.biography} fullWidth/>
                            <p className="profile-note">To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality. Your biography should have at least 50 words, links and coupon codes are not permitted.</p>
                        </ProfileInfoContainer>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <ProfileInfoContainer>
                            <h4>Website</h4>
                            <TextField name="website" variant="outlined" defaultValue={information.website} fullWidth/>
                        </ProfileInfoContainer>
                        
                        <ProfileInfoContainer>
                            <h4>Twitter</h4>
                            <TextField name="twitter" variant="outlined" defaultValue={information.twitter} fullWidth/>
                        </ProfileInfoContainer>

                        <ProfileInfoContainer>
                            <h4>Facebook</h4>
                            <TextField name="facebook" variant="outlined" defaultValue={information.facebook} fullWidth/>
                        </ProfileInfoContainer>
                        
                        <ProfileInfoContainer>
                            <h4>LinkedIn</h4>
                            <TextField name="linkedin" variant="outlined" defaultValue={information.linkedin} fullWidth/>
                        </ProfileInfoContainer>
                        
                        <ProfileInfoContainer>
                            <h4>Youtube</h4>
                            <TextField name="youtube" variant="outlined" defaultValue={information.youtube} fullWidth/>
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