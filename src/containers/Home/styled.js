import styled from "styled-components"

export const Container = styled.div`
   background-color: #FDFDF5;
 .title {
    font-weight: bold;
    font-size: 3rem;
 }

 .content {
    width: 38%;
    display: flex;
    flex-direction: column;
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    padding: 15vh 8vw 0;
 }

 .line-wrap {
    overflow: hidden;
 }

 .line {
	transform-origin: 0% 50%;
	padding-bottom: 0.35rem;
	white-space: nowrap;
	will-change: transform;
}

 /* .content--open {
    visibility: visible;
 } */
  
`

export const GridItem = styled.div`
    cursor: pointer;
  display: grid;
  grid-row: ${props => props.row || 1};
  grid-column: ${props => props.col || 1};
  padding: .5rem;

  .img {
    overflow: hidden;
    border-radius: ${props => props.borderItemRadius || '1rem'};
    width: 100%;
    height: 100%;
    
    .inner {
        
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 50% 50%;
      background-image: url(${props => props.imgUrl});
    }
}

`

export const MiniGridItem = styled.div`

cursor: pointer;
  display: grid;
  grid-row: ${props => props.row || 1};
  grid-column: ${props => props.col || 1};
  padding: .25rem;

   

  .img {
   &:hover {
      opacity: 0.5;
   }
    overflow: hidden;
    border-radius: .5rem;
    width: 100%;
    height: 100%;
    
    .inner {
        
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 50% 50%;
      background-image: url(${props => props.imgUrl});
    }
   }

`
