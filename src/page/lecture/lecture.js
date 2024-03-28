import {LectureViewContainer} from "./lectureStyle"
import { useState } from "react";

import { Grid,Box,ListItemButton,ListItemText,ListItemIcon,Divider } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';


export default function Lecture(){
    const sections = [
        {
          name: "Introduction to the course",
          lectures: [
            {
              title: "Introduction to the course",
              duration: 60,
              videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
            },
            {
              title: "Introduction to the course",
              duration: 60,
              videoID: "xNRJwmlRBNU?si=c3ONdCsHXwLHdFEo",
            },
            {
              title: "Introduction to the course",
              duration: 10,
              videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
            },
            {
              title: "Introduction to the course",
              duration: 10,
              videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
            },
          ],
        },
        {
          name: "Introduction to the course 2",
      
          lectures: [
            {
              title: "Introduction to the course 2",
              duration: 10,
              videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
            },
            {
              title: "Introduction to the course 2",
              duration: 10,
              videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
            },
            {
              title: "Introduction to the course 2",
              duration: 10,
              videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
            },
          ],
        },
        {
          name: "Introduction to the course 3",
          lectures: [
            {
              title: "Introduction to the course 3",
              duration: 10,
              videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
            },
            {
              title: "Introduction to the course 3",
              duration: 10,
              videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
            },
            {
              title: "Introduction to the course 3",
              duration: 10,
              videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
            },
          ],
        },
        {
            name: "Introduction to the course 4",
            lectures: [
              {
                title: "Introduction to the course 4",
                duration: 10,
                videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
              },
              {
                title: "Introduction to the course 4",
                duration: 10,
                videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
              },
              {
                title: "Introduction to the course 4",
                duration: 10,
                videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
              },
            ],
        },
        {
            name: "Introduction to the course 5",
            lectures: [
              {
                title: "Introduction to the course 5",
                duration: 10,
                videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
              },
              {
                title: "Introduction to the course 5",
                duration: 10,
                videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
              },
              {
                title: "Introduction to the course 5",
                duration: 10,
                videoID: "SdcdneSdoV4?si=6-5A_cdJLdJ9cohL",
              },
            ],
        },
      ];

    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedSection, setSelectedSection] = useState(sections[0].name);
    const [videoId, setSelectedVideoId] = useState(sections[0].lectures[0].videoID)
    console.log(sections[0].lectures[0].videoID)

    const handleListItemClick = (event, index,sectionName,idVideo) => {
        setSelectedIndex(index);
        setSelectedSection(sectionName)
        setSelectedVideoId(idVideo)
    };

    return (
        <Grid container>
            <Grid item xs={8}>
                <div>
                    <iframe width="100%" height="500" src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player" frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
            </Grid>

            <Grid item xs={4}>
                {sections.map((section, index) => (
                    <Box
                        key={index}
                        sx={{
                            bgcolor: open ? 'var(--color-white)' : null,
                        }}
                    >
                        <ListItemButton
                        alignItems="flex-start"
                        onClick={() => {setOpen(!open); setSelectedSection(section.name) }}
                        sx={{
                            px: 3,
                            pt: 2,
                            pb: 2,
                            '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                        }}
                        >
                        <ListItemText
                            primary= {section.name}
                            primaryTypographyProps={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            lineHeight: '20px',
                            mb: '2px',
                            }}
                            secondary= {`${section.lectures.length} lectures`}
                            secondaryTypographyProps={{
                            noWrap: true,
                            fontSize: 12,
                            lineHeight: '16px',
                            color: "var(--color-gray-300)",
                            }}
                            sx={{ my: 0 }}
                        />
                        <KeyboardArrowDown
                            sx={{
                            mr: -1,
                            opacity: 1,
                            transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                            transition: '0.2s',
                            }}
                        />
                        </ListItemButton>

                        {open && selectedSection == section.name &&
                        section.lectures.map((item,index) => (
                            <ListItemButton
                            key={index}
                            sx={{ py: 0.5, minHeight: 32,mb:1 }}
                            selected={selectedIndex === index && selectedSection == section.name}
                            onClick={(event) => handleListItemClick(event, index,section.name,item.videoID)}
                            >
                            <div style={{margin:"10px", color:"var(--color-grey-100)"}}>
                                <PlayCircleFilledIcon/>
                            </div>

                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', }}
                                secondary= {`${item.duration} min`}
                                secondaryTypographyProps={{
                                noWrap: true,
                                fontSize: 12,
                                lineHeight: '16px',
                                color: "var(--color-gray-300)",
                                }}
                            />
                            </ListItemButton>
                        ))}
                        <Divider />
                    </Box>
                ))}
            </Grid>
        </Grid>
    )
}