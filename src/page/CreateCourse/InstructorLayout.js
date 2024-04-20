import styled from 'styled-components';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LuMonitorPlay } from 'react-icons/lu';
import { FaChartBar } from 'react-icons/fa';
import { SiUdemy } from 'react-icons/si';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInstructorPage } from '../../redux/instructorPageSlice';
import { setCourseType } from '../../redux/courseManagementSlice';
import { setCourseData } from '../../redux/coursesSlice';

export default function InstructorLayout() {
  const location = useLocation();
  const [isActivePage, setIsActivePage] = useState(1);
  const dispatch = useDispatch();
  const instructorPage = useSelector(state => state.instructorPage.page);

  useEffect(() => {
    console.log(instructorPage);
    if (instructorPage === 2) {
      setIsActivePage(instructorPage);
    }
  }, [instructorPage]);

  const instructorPages = [
    { id: 0, icon: <SiUdemy />, link: '/' },
    { id: 1, icon: <LuMonitorPlay />, link: '/instructor/courses' },
    { id: 2, icon: <IoIosAddCircleOutline />, link: '/instructor/create' },
    { id: 3, icon: <FaChartBar />, link: '/instructor/statistics' },
  ];

  const getItemActive = (id) => id === isActivePage ? 'is-active' : '';
  const handleNavigate = (pageId) => {
    setIsActivePage(pageId);
    dispatch(setCourseType('create'));
    dispatch(setInstructorPage(pageId));
    dispatch(setCourseData(null));
  }

  return (
    <InstructorLayoutWrapper>
      <InstructorNav>
      {instructorPages.map((page) => (
        <Link
          className={`nav-item ${getItemActive(page.id, page.link)}`}
          to={page.link}
          onClick={() => handleNavigate(page.id)}
          // Disable link if it's the current page
          tabIndex={location.pathname === page.link ? -1 : undefined}
          aria-disabled={location.pathname === page.link}
          style={{
            pointerEvents: location.pathname === page.link ? 'none' : undefined,
            opacity: location.pathname === page.link ? 0.5 : undefined,
          }}
        >
          {page.icon}
        </Link>
      ))}
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
  top: 40%; // Positioned at the middle of the page
  transform: translateY(-50%); // Shift upwards to center align vertically
  display: flex;
  flex-direction: column;
  background-color: var(--color-gray-500);
  justify-content: center; // Center items vertically
  padding: 20px 0; // Padding at top and bottom
  color: var(--color-white);
  z-index: 10;
  align-items: center;
  border-radius: 0 10px 10px 0; // Rounded corners on the right side
  width: 60px;

  .nav-item {
    padding: 12px;
    margin: 5px;
    color: var(--color-white);
    font-size: 24px;
    transition: background-color 0.3s, transform 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover, &.is-active {
      background-color: var(--color-purple-300);
      transform: scale(1.1); // Scale up on hover
    }
  }
`


