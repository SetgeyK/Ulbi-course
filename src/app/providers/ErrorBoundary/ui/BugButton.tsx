import { useEffect, useState } from 'react'


export const BugButton = () => {
    const [error, setError] = useState(false)
    useEffect(() => {
        if (error) {
         throw new Error()
        }
    }, [error])
    return(
        <button onClick={() => setError(prev => !prev)} >
            throw error
        </button>
    )
}