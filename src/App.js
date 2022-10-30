import styled from 'styled-components';
import MovieComponent from './components/moviecomponent';
import MovieInfoComponent from './components/movieinfo';
import { useState } from 'react';
import axios from 'axios';
export const API_KEY="52fb11dc";
const Container=styled.div`
display:flex;
flex-direction:column;
overflow-y:hidden;
overflow-x:hidden;
`;
const Header=styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
background-color:red;
color:white;
padding:10px;
font-size:20px;
font-weight:bold;
@media (min-width:0px) and (max-width:280){
  height:10%;
  width:50%;
 }

`;
const AppName=styled.div`
display:flex;
flex-direction:row;
align-items:center;
@media (min-width:0px) and (max-width:280px){
  display:none;
 }
`;
const MovieImage=styled.img`
 width:45px;
 height:45px;
 margin:15px;
`;
const SearchBox=styled.div`
 display:flex;
 flex-direction:row;
 padding:10px 10px;
 background-color:white;
 border-radius:6px;
 margin-left:20px;
 width:45%;
 align-items:center;
 @media (min-width:280px) and (max-width:600px){
  width:30%;
 }
 @media (min-width:0px) and (max-width:280px){
  width:180px;
 }
`;
const SearchIcon=styled.img`
   width:32px;
   height:45px;
`;
const SearchInput=styled.input`
color:black;
font-size:16px;
font-weight:bold;
border:none;
outline:none;
margin-left:15px;
@media (min-width:0px) and (max-width:600px){
  width:90%;
  margin-left:0.2px;
 }
`;
const MovieList=styled.div`
display:flex;
flex-direction:row;
flex-wrap:wrap;
padding: 30px;
padding:30px;
justify-content:space-evenly;
gap:24px;
`;
const Background=styled.img`

width:50%;
height:50%;
@media (min-width:0px) and (max-width:500px){
  height:100%;
  width:100%;
 }

`;

function App() {
  const[searchQuery,updateSearchQuery]=useState();
  const [timeoutId, updateTimeoutId]=useState();
  const [movieList, updateMovieList]=useState([]);
  const [selected, onMovieSelect]=useState();
  const fetchData=async (searchValue)=>{
   const response= await axios.get(`https://www.omdbapi.com/?s=${searchValue}&apikey=${API_KEY}`);
    updateMovieList(response.data.Search)
  }
  const onTextChange=(event)=>{
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout=setTimeout(()=> fetchData(event.target.value),500); 
    updateTimeoutId(timeout);
  };
  
  return (
    <Container>
     <Header><AppName>
    <MovieImage src="./icon/movie.jpg"/>
       Movie Info App</AppName>
      <SearchBox>
        <SearchIcon src="./icon/search.jpg"/>
        <SearchInput placeholder="Search Movie" value={searchQuery} onChange={onTextChange}/>
      </SearchBox>
      </Header>
      {selected  && <MovieInfoComponent selected={selected} onMovieSelect={onMovieSelect}/>}
      <MovieList>
     {movieList?.length?movieList.map((movie,index)=> (<MovieComponent key={index}  movie={movie} onMovieSelect={onMovieSelect}/>
     )) : <Background src="./icon/popcorn1.gif" />}
      </MovieList>
    </Container>
  );

}

export default App;
