import styled from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { LuMonitorPlay } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";
import { SiUdemy } from "react-icons/si";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";



export default function InstructorLayout() {
  const [isActivePage, setIsActivePage] = useState(1);

  const instructorPages = [
    {
      id: 0,
      icon: <SiUdemy />,
      link: "/",
    }, {
      id: 1,
      icon: <LuMonitorPlay />,
      link: "/instructor/courses",
    }, {
      id: 2,
      icon: <IoIosAddCircleOutline />,
      link: "/instructor/create",
    }, {
      id: 3,
      icon: <FaChartBar />,
      link: "/instructor/statistics",
    }
  ];

  const getItemActive = (id) => id === isActivePage ? "is-active" : "";

  return (
    <InstructorLayoutWrapper>
      <InstructorNav>
        {instructorPages.map((page) => {
          return (
            <Link className={getItemActive(page.id)} to={page.link} onClick={() => setIsActivePage(page.id)}>{page.icon}</Link>
          );
        })}
      </InstructorNav>
      <Outlet />
    </InstructorLayoutWrapper>
  );
}

const InstructorLayoutWrapper = styled.div`
  position: relative;
`

const InstructorNav = styled.div`
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  width: 70px;
  background-color: var(--color-gray-500);
  justify-content: space-around;
  height: 300px;
  top: 30%;
  color: var(--color-white);
  z-index: 1;
  align-items: center;
  
  .is-active {
    background-color: var(--color-gray-300);    
  }

  a {
    padding: 10px;
    color: var(--color-white);
    text-decoration: none;
    font-size: 40px;
    height: 40px;
    backgroud-color: var(--color-gray-300);
    display: flex;
    align-items: center;

    &:hover {
      background-color: var(--color-gray-300);
    }
  }
`