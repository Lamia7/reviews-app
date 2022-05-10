import { useEffect, useState } from 'react';

/**
 * Hook créé pour récupérer de la data du back
 * @param {string} url 
 * @returns loading, error, data
 */
const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    // Dès que ce hook est appelé et à chq màj de url
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(url)
                const json = await res.json()
                
                setData(json.data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [url])

    return { loading, error, data }
}

export default useFetch