
import Stack from "@mui/material/Stack";

import MyLearningNavBar from "./myLearningNavbar";
import { MyLearningHeadingContainer, MyLearningContainer } from "./myLearningStyle";
import { Button } from "../../components/Button/Button";

export default function MyLearningTools() {
    return (
      <MyLearningContainer>
        <MyLearningHeadingContainer>
            <h1>My Learning</h1>
            <MyLearningNavBar />
        </MyLearningHeadingContainer>

        <Stack justifyContent='center' my={4} px={24}>
            <h2 style={{margin: '8px'}}>Learning reminder</h2>
            <h3 style={{margin: '8px'}}>Calendar events</h3>
            <p style={{margin: '0 8px'}}>Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals. Set time aside to learn and get reminders using your learning scheduler.</p>
            <Button 
                width="30%" 
                margin="16px 8px" 
                bgColor="var(--color-purple-300)" 
                hoverBgColor="var(--color-purple-400)" 
                fontWeight="700"
            >
                  Schedule Learning Time
            </Button>
        </Stack>
        
      </MyLearningContainer>
    )
}