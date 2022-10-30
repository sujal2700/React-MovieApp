import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_KEY } from '../App';
const Container=styled.div`

display:flex;
flex-direction:row;
padding:20px 30px;
overflow-x:scroll;
border-bottom: 1px solid lightgray;
@media (max-width:600px){
  display:inline-block;
  overflow:scroll;
  
}
`;
const MovieName=styled.div`
  font-size:18px;
  font-weigth:600;
  color:black;
  margin:15px 0;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
  @media (max-width:600px){
    font-size:12px;
  }
  
`;
const CoverImage=styled.img`
 
height:232px;
padding:10px;
@media (max-width:600px){
  height:200px;
  width:260px;
}
`;
const Info=styled.span`
font-size:18px;
font-weigth:600;
color:black;
margin:15px 0;
white-space:nowrap;
overflow:hidden;
@media (max-width:600px){
  font-size:12px;
  font-weigth:500;
  overflow-wrap:break-word;
  
}
`;
const MovieInfo=styled.div`
font-size:12px;
font-weight:500;
color:black;
@media (max-width:600px){
  font-size:12px;
  font-weigth:500;
  overflow-wrap:break-word;
}
& span{
    opacity:0.5;
    @media (max-width:600px){
      font-size:10px;
      font-weigth:500;
      
    }
    
}

`;
const Close=styled.button`
font-size:10px;
color:white;
background:red;
border-radius:0.4;
border:none;
width:60px;
height:fit-content;
cursor:pointer;
font-weight:bold;
&:hover{
  border:1px-solid;
}
`;
const MovieInfoComponent=(props)=>{
    const[movieInfo, setMovieInfo]=useState();
    const {selected}=props; 
    useEffect(()=>{
         axios.get(`https://www.omdbapi.com/?i=${selected}&apikey=${API_KEY}`).then((response)=>setMovieInfo(response.data)); 
    },[selected]);
      return(
       <Container>{movieInfo ? (<>
        <CoverImage src={movieInfo?.Poster}/>
        <Info>
            <MovieName> {movieInfo?.Type.toUpperCase()}: {movieInfo?.Title}</MovieName>
            <MovieInfo>IMDB Rating: <span>{movieInfo?.imdbRating}</span></MovieInfo>
            <MovieInfo>Language:<span>{movieInfo?.Language}</span></MovieInfo>
            <MovieInfo>Released:<span>{movieInfo?.Released}</span></MovieInfo>
            <MovieInfo>Runtime: <span>{movieInfo?.Runtime}</span></MovieInfo> 
            <MovieInfo>Actors: <span>{movieInfo?.Actors}</span></MovieInfo>
            <MovieInfo>Plot: <span>{movieInfo?.Plot}</span></MovieInfo>
            
        </Info>
        <Close onClick={()=>props.onMovieSelect()}>Close</Close>
        </>):("Please wait .....")}
        </Container>
    );      
  };
   export default MovieInfoComponent;
