import React from "react";
import ImageUploading from "react-images-uploading";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ImageIcon from '@mui/icons-material/Image';

import ProfileNavBar from "./profileNavbar";
import { Button } from "../../components/Button/Button";
import { ProfileContainer, ProfileImageUploader, ProfileInfoContainer, ProfileImageButton, ProfileImageUploadContainer } from "./profileStyles";

export default function ProfilePhoto() {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(images);
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

            <ProfileInfoContainer>
                <h4>Image preview</h4>
                <ImageUploading
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url">
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
                    </ImageUploading>
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
        </ProfileContainer>
    );
}