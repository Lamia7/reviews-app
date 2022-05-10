import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'

export default function HomePage() {

  const { loading, error, data } = useFetch('http://localhost:1337/api/reviews')

  return (
    <>
    <div>HomePage</div>
    {loading && <p>Loading...</p>}
    {error && <p>Error...</p>}
    <div>
      {data && data.map((review) => (
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
