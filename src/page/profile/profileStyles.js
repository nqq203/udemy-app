import styled from 'styled-components';

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 48px 120px;
`

export const ProfileInfoContainer = styled.div`
    margin-bottom: 16px;
    h4 {
        margin: 8px 0px;
    }
    .profile-note {
        margin: 8px 0px 0px;
        font-size: 12px;
        color: var(--color-gray-300);
    }
`

export const ProfileLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
`

export const ProfileImageUploader = styled.button`
    width: 300px;
    height: 300px;
    background: var(--color-gray-100);
    padding: 8px 16px;
    border: 1px solid var(--color-gray-600);
    cursor: pointer;
    margin: 8px 0px;
`

export const ProfileImageButton = styled.button`
    background: var(--color-purple-300);
    color: var(--color-white);
    font-weight: 700;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    margin: 8px 0px;
`

export const ProfileImageUploadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid var(--color-gray-600);
    width: 400px;
    height: 300px;
    img {
        width: 300px;
        height: 200px;
        object-fit: cover;
        border-radius: 4px;
    }
`