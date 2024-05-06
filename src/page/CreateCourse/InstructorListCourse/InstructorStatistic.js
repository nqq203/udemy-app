import styled from "styled-components";
import RevenueChart from "../../../components/RevenueChart/RevenueChart";
import EnrollmentChart from "../../../components/EnrollmentChart/EnrollmentChart";
import CourseRatingChart from "../../../components/CourseRatingChart/CourseRatingChart";
import { useEffect, useState } from "react";
import { callApiGetCompletedOrder, callApiGetCompletedOrderByYear } from "../../../api/order";
import { useQuery } from "react-query";

export default function InstructorStatistic() {
  const [processedRevenue, setProcessedRevenue] = useState([]);
  const [processedEnrollments, setProcessedEnrollments] = useState([]);
  const instructorId = localStorage.getItem("_id");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalEnrollments, setTotalEnrollments] = useState(0);

  const processRevenueDataFunc = (data) => {
    let processRevenueData = Array(12).fill(0);
    let processRevenueEnrollments = Array(12).fill(0);
    console.log(processedRevenue, processedEnrollments);
    data?.metadata?.forEach(item => {
      const monthIndex = item?._id?.month - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        processRevenueData[monthIndex] = item?.totalRevenue || 0;
        processRevenueEnrollments[monthIndex] = item?.totalSoldItems || 0;
      }
    });
    setProcessedRevenue(processRevenueData);
    setProcessedEnrollments(processRevenueEnrollments);
  }

  const { data: completedOrders, error: completedOrdersError } = useQuery(
    "completedOrders",
    () =>  callApiGetCompletedOrder(instructorId),
    {
      onSuccess: (data) => {
        console.log("data: ", data);
        if (data?.metadata[0] !== undefined) {
          setTotalRevenue(data.metadata[0].totalRevenue);
          setTotalEnrollments(data.metadata[0].totalSoldItems);
        }
      },
    }
  );

  const { data: chartData, isLoading, error: revenueDataError } = useQuery(
    "revenueData",
    () => callApiGetCompletedOrderByYear(instructorId),
    {
      onSuccess: (data) => {
        console.log(data);
        if (data?.success || data?.metadata?.length === 0) {
          processRevenueDataFunc(data);
        }
      },
    }
  );

  return (
    <InstructorStatisticWrapper>
      <h3>Statistics</h3>
      <div style={{ margin: "20px 0" }}>
        Get top insights about your performance
      </div>
      <Statistic>
        <StatisticOption>
          <TotalRevenue className="instructor-statistic-content">
            <div style={{ fontSize: "25px" }}>Total revenue</div>
            <div>{totalRevenue}</div>
          </TotalRevenue>
          <TotalEnrollments className="instructor-statistic-content">
            <div style={{ fontSize: "25px" }}>Total Enrollments</div>
            <div>{totalEnrollments}</div>
          </TotalEnrollments>
          {/* <Rating className="instructor-statistic-content">
            <div style={{ fontSize: "25px" }}>Instructor Rating</div>
            <div>0.00</div>
          </Rating> */}
        </StatisticOption>
        <StatisticChart>
          <RevenueChart revenueData={processedRevenue} />
          <EnrollmentChart enrollmentData={processedEnrollments} />
          {/* <CourseRatingChart /> */}
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
`;

const Statistic = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;

  .instructor-statistic-content {
    display: flex;
    flex-direction: column;
    font-family: var(--font-stack-text);
    gap: 20px;
  }
`;

const StatisticOption = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  border-bottom: 1px solid var(---color-gray-200);
`;

const StatisticChart = styled.div``;

const TotalRevenue = styled.div``;

const TotalEnrollments = styled.div``;
const Rating = styled.div``;
