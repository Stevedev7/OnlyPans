import {  Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLazyGetAverageRatingsQuery } from '../../../../slices/recipeApi';
import Ratings from '../Ratings';
import recipeImage from '../../../../../assets/img/recipe-image-placeholder.jpg'

import './RecipeCard.css'

interface IRecipeCardProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    images: { url: string} [];
  }
}

const RecipeCard = ({recipe: { title, description, id, images }}: IRecipeCardProps) => {
  
  const [ratings,setRatings] = useState();
  const [count, setCount] = useState();
  const [getAverageRatings] = useLazyGetAverageRatingsQuery();

  useEffect(() => {
    (async() => {
      try{
        const response = await getAverageRatings(id).unwrap();
        setRatings(response.data._avg.rating);
        setCount(response.data._count);
      } catch(error){
        console.log("Couldn't fetch average ratings.")
      }
    }) ()
  }, [])
  return (
    <Col lg={3} >
      <Link style={{ textDecoration: 'none'}} to={`/recipes/${id}`}>
        <Card className='border-0 m-2'>
          <div className='image-container'>
            <Card.Img className="card-image" variant="top" src={ images.length != 0 ? images[0].url : recipeImage}/>
          </div>
          <Card.Body>
            <Card.Title><h3 className='font-weight-bold'>{title}</h3></Card.Title>
            <Card.Text>
                {description.length <= 100 ? description : `${description.substring(0, 97)}...`}
            </Card.Text>
            {
              ratings ? <>

              <Row>
                <Col>
                  <Ratings rating={ratings} />
                </Col>
                <Col>
                <p>Number of ratings: {count}</p>
                </Col>
              </Row>
              </> : <p>No ratings yet.</p>
            }
          </Card.Body>
        </Card>
      </Link>
    </Col>
  )
}

export default RecipeCard