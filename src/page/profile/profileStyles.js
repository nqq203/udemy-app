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