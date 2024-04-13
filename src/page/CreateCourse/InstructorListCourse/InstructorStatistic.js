import styled from "styled-components";
import RevenueChart from "../../../components/RevenueChart/RevenueChart";
import EnrollmentChart from "../../../components/EnrollmentChart/EnrollmentChart";
import CourseRatingChart from "../../../components/CourseRatingChart/CourseRatingChart";

export default function InstructorStatistic() {
  return (
    <InstructorStatisticWrapper>
      <h3>Statistics</h3>
      <div style={{margin: "20px 0"}}>Get top insights about your performance</div>
      <Statistic>
        <StatisticOption>
          <TotalRevenue className="instructor-statistic-content">
            <div style={{fontSize: "25px"}}>Total revenue</div>
            <div>100000</div>
          </TotalRevenue>
          <TotalEnrollments className="instructor-statistic-content">
            <div style={{fontSize: "25px"}}>Total Enrollments</div>
            <div>100</div>
          </TotalEnrollments>
          <Rating className="instructor-statistic-content">
            <div style={{fontSize: "25px"}}>Instructor Rating</div>
            <div>0.00</div>
          </Rating>
        </StatisticOption>
        <StatisticChart>
          <RevenueChart />
          <EnrollmentChart />
          <CourseRatingChart />
        </StatisticChart>
      </Statistic>
    </InstructorStatisticWrapper>
  );
}

const InstructorStatisticWrapper = styled.div`
  padding: 20px 8vw;

  h3 {
    font-size: 25px;
    font-family: var(--font-stack-heading-serif);
  }
`

const Statistic = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08);
  padding: 20px;

  .instructor-statistic-content {
    display: flex;
    flex-direction: column;
    font-family: var(--font-stack-text);
    gap: 20px;
  }
`

const StatisticOption = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  border-bottom: 1px solid var(---color-gray-200);
`

const StatisticChart = styled.div`
`

const TotalRevenue = styled.div`

`

const TotalEnrollments = styled.div`

`
const Rating = styled.div`
`