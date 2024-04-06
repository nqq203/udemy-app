import {SearchResultContainer, FilterList,ViewListCourseStyle,StyleH4} from "./viewListSearchStyle.js"
import {Grid} from '@mui/material';
import { useLocation } from "react-router-dom";
import {callApiGetCoursesBySearching} from '../../api/course'
import { useQuery } from 'react-query';
import { useEffect,useState,useRef } from "react";
import { PropagateLoader } from 'react-spinners';



export default function ViewListCourse() {
  const [loading,setLoading] = useState(true)
  const [data,setData] = useState(null)

  const queryParams = new URLSearchParams(window.location.search);
  const keyword = queryParams.get('keyword');
  const pageNumber = queryParams.get('p')
  const rating = queryParams.get('rating') || 0;

  const {data: fetchCourses, isSuccess, isLoading, isError, refetch } = useQuery(
    "searchByKeyword-page 1",
    () => callApiGetCoursesBySearching(keyword,pageNumber,rating),
    {
      onSuccess: (data) => {
        console.log(data)
        if(data.code === 200){
          console.log("success fetch")
          setData(data?.metadata)
        }
        
        setLoading(false)
      }, 
      onError: (error) => {
        console.error("Error fetching data", error);
      },

      staleTime: Infinity
    }
  )

  useEffect(() => {
    console.log(refetch)
  }, [data])
  return (
    <ViewListCourseStyle>
      {loading ? (
        <div className="container">
          <PropagateLoader color="var(--color-blue-300)" />
        </div>
      ) : (
        data?.totalDocs === 0 ? (
          <div className="container">
            <h2>
              Sorry, we couldn't find any results for "{keyword}"
            </h2>
            <h3>Try adjusting your search. Here are some ideas:</h3>
            <ul>
              <li>Make sure all words are spelled correctly</li>
              <li>Try different search terms</li>
              <li>Try more general search terms</li>
            </ul>
          </div>
        ) : (
          <div>
            <h1>{data?.totalDocs} results for "{keyword}"</h1>
              <SearchResultContainer data={data} keyword={keyword} refetch={refetch}/>
          </div> 
        )
      )}
    </ViewListCourseStyle>
  );
}

