import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API_KEY } from '../App';
const Container=styled.div`
display:flex;
flex-direction:row;
padding:20px 30px;
justify-content:center;
border-bottom: 1px solid lightgray;
`;
const MovieName=styled.div`
  font-size:18px;
  font-weigth:600;
  color:black;
  margin:15px 0;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
`;
const CoverImage=styled.img`
object-fit:cover;
height:232px;
padding:10px;
`;
const Info=styled.span`
font-size:18px;
font-weigth:600;
color:black;
margin:15px 0;
white-space:nowrap;

overflow:hidden;
`;
const MovieInfo=styled.div`
font-size:16px;
font-weight:500;
color:black;
overflow-wrap:break-word;
overflow:hidden;
& span{
    opacity:0.5;
}
`;
const Close=styled.button`
font-size:10px;
color:white;
background:red;
border-radius:0.4;
height:18px;
width:18px;
height:fit-content;
cursor:pointer;
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
            
        </Info>
        <Close onClick={()=>props.onMovieSelect()}>X</Close>
        </>):("Please wait .....")}
        </Container>
    );      
  };
   export default MovieInfoComponent;