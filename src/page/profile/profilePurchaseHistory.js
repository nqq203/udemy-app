import ProfileNavBar from "./profileNavbar";
import { ProfileContainer, ProfileInfoContainer } from "./profileStyles";
import Typography from "@mui/material/Typography";
import Notification from "../../components/Notification/Notification";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import { callApiGetPurchaseHistory } from "../../api/order";

import { useState } from "react";
import { useQuery } from "react-query";

const orders = [
  {
    totalPrice: 100,
    items: [
      {
        courseName: "abc",
        coursePrice: 100,
      },
      {
        courseName: "abcd",
        coursePrice: 100,
      },
      {
        courseName: "abcef",
        coursePrice: 100,
      },
    ],

    date: "2021-10-10",
    paymentmethod: "cards",
    status: "completed",
  },
];

const ProfilePurchaseHistory = () => {
  const { data, isSuccess } = useQuery("purchaseHistory", async () =>
    callApiGetPurchaseHistory(localStorage.getItem("_id"))
  );
  const changeDateFormat = (date) => {
    const dateObj = new Date(date);
    const dateString = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
    const timeString = dateObj.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const result = `${dateString} - ${timeString}`;
    return result;
  };
  return (
    <PurchaseHistoryContainer>
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
          <PurchaseHistoryContainer>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold", fontSize: '17px' }}>
                      Order Date
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: '17px' }}>Items</TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: '17px' }} align="center">
                      Total Price
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: '17px' }} align="center">
                      Payment Method
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold", fontSize: '17px' }} align="center">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.metadata.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{changeDateFormat(order.date)}</TableCell>
                      <TableCell>
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span style={{
                              maxWidth: "350px",
                            }}>{item.courseName}</span>
                            <span>${item.coursePrice}</span>
                          </div>
                        ))}
                      </TableCell>
                      <TableCell align="center">${order.totalPrice}</TableCell>
                      <TableCell align="center">
                        {order.paymentmethod}
                      </TableCell>
                      <TableCell align="center">{order.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </PurchaseHistoryContainer>
        </ProfileInfoContainer>
      </ProfileContainer>
    </PurchaseHistoryContainer>
  );
};

const PurchaseHistoryContainer = styled.div`
  font-family: var(--font-stack-text);
`;
export default ProfilePurchaseHistory;
