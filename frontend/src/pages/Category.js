import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data{
        id,
      	attributes{
          name,
          reviews{
            data{
              id,
            	attributes{
                title,
                body,
                rating,
                categories{
                  data{
                    id,
                    attributes{
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
}
`

export default function Category() {
  const { id } = useParams() // récup id de la category depuis URL
  // Récupérer la data en lançant la requête CATEGORY avec id de l'URL en paramètre
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id}
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error...</p>

  console.log(data)

  return (
    <div>
      <h2>{data.category.data.attributes.name}</h2>
      {data.category.data.attributes.reviews.data.map((review) => (
        <div key={review.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

          {review.attributes.categories.data.map((category) => (
            <small key={category.attributes.id}>{category.attributes.name}</small>
          ))}

          <p>{review.attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  )
}
