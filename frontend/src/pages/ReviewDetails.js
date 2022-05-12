import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

  const REVIEW = gql`
  query GetReview($id: ID!) {
    review(id: $id){
    data{
      id,
			attributes{
        title,
        body,
        rating
      }
    }
    }
  }
  `

/**
 * Page displaying a review details
 */
export default function ReviewDetails() {
  const { id } = useParams() // récup id de la review depuis URL
  // Récupérer la data en lançant la requête REVIEW avec id de l'URL en paramètre
  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id}
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  return (
    <>
    <div>Review Details</div>
        <div className="review-card">
          <div className="rating">{data.review.data.attributes.rating}</div>
          <h2>{data.review.data.attributes.title}</h2>

          <small>console list</small>

          <p>{data.review.data.attributes.body}</p>
        </div>
    </>
  )
}
