import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import ImageUploading from "react-images-uploading";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ImageIcon from '@mui/icons-material/Image';

import ProfileNavBar from "./profileNavbar";
import { Button } from "../../components/Button/Button";
import { ProfileContainer, ProfileImageUploader, ProfileInfoContainer, ProfileImageButton, ProfileImageUploadContainer } from "./profileStyles";
import { callApiUpdateAvatar } from "../../api/user";
import Notification from "../../components/Notification/Notification";

export default function ProfilePhoto() {
    const navigate = useNavigate();
    const [images, setImages] = React.useState([]);
    const [file, setFile] = React.useState();
    const [notification, setNotification] = React.useState({});
    const maxNumber = 1;

    const avatarMutation = useMutation(
        (avatarChange) => callApiUpdateAvatar(avatarChange),
        {
            onSuccess: (data) => {
                if(data.success){
                    setNotification({
                        content: data.message,
                        visible: true
                    });
                    navigate('/profile/photo');
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

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    function handleSubmit(event){
        event.preventDefault();
        const form = event.target;
        console.log(form.avatar?.files[0])
        avatarMutation.mutate(form.avatar?.files[0]);
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
                    <h4>Image preview</h4>
                    <input name="avatar" type="file" onChange={handleChange} />
                    <img src={file} />
                    {/* <ImageUploading
                        value={images}
                        onChange={onChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"> */}
                            {/* {({
                                imageList,
                                onImageUpload,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                            }) => (
                                // write your building UI
                                <div className="upload__image-wrapper">
                                    <ProfileImageUploader
                                        style={isDragging ? { color: 'var(--color-purple-300)' } : undefined}
                                        onClick={onImageUpload}
                                        {...dragProps}
                                    >
                                        {imageList.length === 0 ? (
                                            <>
                                                <ImageIcon fontSize="large"/>
                                                <Typography fontWeight={600}>
                                                    Click or Drop here
                                                </Typography>
                                            </>
                                        ) : 
                                            imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <img src={image['data_url']} alt="" width="150" />
                                                    <div className="image-item__btn-wrapper">
                                                        <ProfileImageButton onClick={() => onImageUpdate(index)}>Update</ProfileImageButton>
                                                        <ProfileImageButton onClick={() => onImageRemove(index)}>Remove</ProfileImageButton>
                                                    </div>
                                                </div>
                                            ))
                                        } 
                                    </ProfileImageUploader>
                                </div>
                            )} */}
{/* 
                            {({ imageList, dragProps, isDragging, onImageRemove }) => (
                                <ProfileImageUploadContainer {...dragProps}>
                                    {imageList.length === 0 ? (isDragging ? "Drop here please" : "Upload an image") : ""}
                                    {imageList.map((image, index) => (
                                        <Stack>
                                            <img key={index} src={image.data_url} />
                                            <ProfileImageButton onClick={() => onImageRemove(index)}>Remove</ProfileImageButton>
                                        </Stack>
                                    ))}
                                </ProfileImageUploadContainer>
                            )}
                        </ImageUploading> */}
                    <p className="profile-note">Minimum 200x200 pixels, Maximum 6000x6000 pixels</p>
                </ProfileInfoContainer>

                <Button 
                    id="photoSaveBtn" 
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