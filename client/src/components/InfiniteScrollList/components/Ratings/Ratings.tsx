import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface IRatingsProps {
  rating: number;
  ratingNumber: boolean;
}

const Ratings = ({ rating, ratingNumber=true }: IRatingsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="star filled" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half-star" className="star filled" />);
  }

  while(stars.length < 5) {
    stars.push(<FaRegStar className="star empty" />)
  }

  return <div className="ratings">{stars} {ratingNumber && <p className='average-rating'>{rating.toFixed(1)}</p>}</div>;
};

export default Ratings;
