import { useParams } from 'react-router-dom'   
import { useState } from 'react'

function ArtistView () {
    const { id } = useParams() // Take the record id object and set to useParams
    const [ artistData, setArtistData ] = useState([]) // Declare a variable for our useState hook into an array. useState returns a pair of values. The current state and a function that updates it.
    
    return (
        <div>
            <h2>The id passed was: {id}</h2>
            <p>Artist Data Goes Here</p>
        </div>
    )
}

export default ArtistView