import styled from "styled-components";

export default function InstructorStatistic() {
  return (
    <InstructorStatisticWrapper>
      <h3>Statistics</h3>
      <div>Get top insights about your performance</div>
      <Statistic>
        <TotalRevenue>
          <div>Total revenue</div>
          <div>100000</div>
        </TotalRevenue>
        <TotalEnrollments>
          <div></div>
        </TotalEnrollments>
        <Rating>

        </Rating>
      </Statistic>
    </InstructorStatisticWrapper>
  );
}

const InstructorStatisticWrapper = styled.div`

`

const Statistic = styled.div`

`

const TotalRevenue = styled.div`

`

const TotalEnrollments = styled.div`

`
const Rating = styled.div`

`