import styled from 'styled-components';
const MovieContainer=styled.div`
display:flex;
flex-direction:column;
cursor:pointer;
padding:10px;
width:300px;
box-shadow: 0 3px 10px 0 #aaa;
`;
const CoverImage=styled.img`
object-fit:cover;
height:262px;
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
const Info=styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
`;
const MovieInfo=styled.div`
font-size:16px;
font-weight:500;
color:black;
`;
const MovieComponent=(props)=>{
  const { Title, Year, imdbID, Type, Poster} = props.movie;
    return(
     <MovieContainer onClick={()=>props.onMovieSelect(imdbID)}>
    <CoverImage src={Poster}/>
    <MovieName>{Title}</MovieName>
    <Info>
        <MovieInfo>Year: {Year}</MovieInfo>
        <MovieInfo>Type: {Type}</MovieInfo>
        </Info> 
       </MovieContainer>
  );
        
}
 export default MovieComponent;