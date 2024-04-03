import {HeaderLecture,LectureOptionStyle,CourseContentStyle,
  CourseContentContainer,LectureOptionContainer,
  OverviewSection,ReviewSection} from "./lectureStyle"
import { useState } from "react";

import { Grid,Box,ListItemButton,ListItemText,ListItemIcon,Divider } from "@mui/material";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Link } from 'react-router-dom';
import { height, width } from "@mui/system";
import { auto } from "@popperjs/core";
import { AspectRatio } from "@mui/icons-material";
import { element } from "prop-types";



export default function Lecture(){
    const sections = [
        {
          name: "Introduction to the course",
          lectures: [
            {
              title: "Introduction to the course",
              duration: 60,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course",
              duration: 60,
              videoID: "https://player.cloudinary.com/embed/?public_id=shoes_video&cloud_name=demo",
            },
            {
              title: "Introduction to the course",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
          ],
        },
        {
          name: "Introduction to the course 2",
      
          lectures: [
            {
              title: "Introduction to the course 2",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 2",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 2",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
          ],
        },
        {
          name: "Introduction to the course 3",
          lectures: [
            {
              title: "Introduction to the course 3",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 3",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 3",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
          ],
        },
        {
            name: "Introduction to the course 4",
            lectures: [
              {
                title: "Introduction to the course 4",
                duration: 10,
                videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
              },
              {
                title: "Introduction to the course 4",
                duration: 10,
                videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
              },
              {
                title: "Introduction to the course 4",
                duration: 10,
                videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
              },
            ],
        },
        {
            name: "Introduction to the course 5",
            lectures: [
              {
                title: "Introduction to the course 5",
                duration: 10,
                videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
              },
              {
                title: "Introduction to the course 5",
                duration: 10,
                videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
              },
              {
                title: "Introduction to the course 5",
                duration: 10,
                videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
              },
            ],
        },

        {
          name: "Introduction to the course 6",
          lectures: [
            {
              title: "Introduction to the course 6",
              duration: 60,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 6",
              duration: 60,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 6",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 6",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
          ],
        },
        {
          name: "Introduction to the course 7",
      
          lectures: [
            {
              title: "Introduction to the course 7",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 7",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 7",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
          ],
        },
        {
          name: "Introduction to the course 8",
          lectures: [
            {
              title: "Introduction to the course 8",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 8",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
            {
              title: "Introduction to the course 8",
              duration: 10,
              videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
            },
          ],
        },
        {
            name: "Introduction to the course 9",
            lectures: [
              {
                title: "Introduction to the course 9",
                duration: 10,
                videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
              },
              {
                title: "Introduction to the course 9",
                duration: 10,
                videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
              },
              {
                title: "Introduction to the course 9",
                duration: 10,
                videoID: "https://player.cloudinary.com/embed/?public_id=samples%2Fcld-sample-video&cloud_name=dkpxptajd",
              },
            ],
        },
        {
            name: "Introduction to the course 10",
            lectures: [
              {
                title: "Introduction to the course 10",
                duration: 10,
                videoID: "UgIwjLg4ONk?si=KJt1GPzPDU6NHwFX",
              },
              {
                title: "Introduction to the course 10",
                duration: 10,
                videoID: "UgIwjLg4ONk?si=KJt1GPzPDU6NHwFX",
              },
              {
                title: "Introduction to the course 10",
                duration: 10,
                videoID: "UgIwjLg4ONk?si=KJt1GPzPDU6NHwFX",
              },
            ],
        },
    ];

    // Lecture Options
    const [lectureOptionClick, setLectureOptionClick] = useState("Overview");
    const [optionContent,setOptionContent] = useState(<OverviewSection></OverviewSection>)

    // Course content
    const [open, setOpen] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [selectedSection, setSelectedSection] = useState(sections[0].name);
    const [videoId, setSelectedVideoId] = useState(sections[0].lectures[0].videoID)

    const handleListItemClick = (event, index, sectionName,idVideo) => {
      setSelectedIndex(index);
      setSelectedSection(sectionName)
      setSelectedVideoId(idVideo)
    };

    const handleLectureOptionClick = (option) => {
      setLectureOptionClick(option);
      if(option == "Overview"){
        setOptionContent(<OverviewSection></OverviewSection>)
      } else if(option == "Reviews"){
        setOptionContent(<ReviewSection></ReviewSection>)
      }
    }

    return (
      <Grid container>
        <HeaderLecture courseName = "Course Name"></HeaderLecture>
        <Grid item xs={8}>
          <div>
            <iframe
              src={`${videoId}&player[controls]=true&player[showJumpControls]=true&player[fluid]=true&player[colors][accent]=%235624D0`}
              height="360"
              title="Cloudinary Sample"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              style={{height:500,width:"100%", AspectRatio:"640/360"}}
              allowfullscreen
              frameborder="0"
            ></iframe>
          </div>

          <LectureOptionStyle>
            <nav>
              <ul>
                <li className={lectureOptionClick == "Overview" ? "isClick" : "" } onClick={() => handleLectureOptionClick("Overview")}>Overview</li>
                <li className={lectureOptionClick == "Reviews" ? "isClick" : "" } onClick={() => handleLectureOptionClick("Reviews")}>Reviews</li>
              </ul>
            </nav>
          </LectureOptionStyle>

          <LectureOptionContainer content={optionContent}></LectureOptionContainer>
        </Grid>

        <Grid item xs={4}>
          <CourseContentStyle>
            <h3>Course content</h3>
          </CourseContentStyle>

          <CourseContentContainer>
            {sections.map((section, index) => (
              <Box
                  key={index}
                  sx={{
                      bgcolor: open ? 'white' : null,
                  }}
              >
                <ListItemButton
                    alignItems="flex-start"
                    onClick={() => {setOpen(!open); setSelectedSection(section.name); setSelectedIndex(-1) }}
                    sx={{
                        px: 3,
                        pt: 2,
                        pb: 2,
                        '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                        backgroundColor: "var(--color-gray-100)",
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
                    sx={{ my: 0}}
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
                    sx={{ py: 0.5, minHeight: 32,mb:1,backgroundColor:"white" }}
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
          </CourseContentContainer>
        </Grid>
      </Grid>
    )
}