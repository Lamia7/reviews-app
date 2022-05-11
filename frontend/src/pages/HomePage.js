import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql  } from '@apollo/client'

const REVIEWS = gql`
query GetReviews {
  reviews{
    data{
      id,
      attributes{
        title,
        body,
        rating,
      }
    }
  }
}
`

export default function HomePage() {

  const { loading, error, data } = useQuery(REVIEWS)
  const [reviewsArray, setReviewArray] = useState([])
  

  useEffect(() => {
    if (data !== undefined) {
      // console.log(reviewsArray)
      setReviewArray(data.reviews.data)
    }
  })

  return (
    <>
    <div>HomePage</div>
    {loading && <p>Loading...</p>}
    {error && <p>Error...</p>}
    <div>
      {reviewsArray.length > 0 && reviewsArray.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

          <small>console list</small>

          <p>{review.attributes.body}</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
    ))}
    </div>
    </>
  )
}
