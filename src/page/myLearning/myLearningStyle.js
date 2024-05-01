import styled from 'styled-components';
 
export const MyLearningContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const MyLearningHeadingContainer = styled.div`
    padding: 48px 160px 0px;
    background-color: var(--color-gray-500);
    h1 {
        color: var(--color-white);
    }
`

export const MyCourseRating = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 8px 0px;
`

export const MyCourseCardItemName = styled.h4`
    font-weight: 700;
    margin: 8px 0px;
`

export const MyCourseCardItemDescription = styled.p`
    margin: 0px;
    font-size: 12px;
    color: var(--color-gray-300);
`

export const MyCourseLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
`
export const CourseCardLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`

