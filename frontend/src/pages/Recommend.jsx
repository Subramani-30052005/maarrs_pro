// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { API } from '../api'

// export default function Recommend(){
//   const { moodName } = useParams()
//   const [recommended, setRecommended] = useState([])
//   const [mood, setMood] = useState('')

//   useEffect(()=> {
//     async function load(){
//       try {
//         const res = await API.get(`/recommendation/${encodeURIComponent(moodName)}`)
//         setMood(res.data.mood)
//         setRecommended(res.data.recommended || [])
//       } catch (err) {
//         console.error(err)
//         setRecommended([])
//       }
//     }
//     load()
//   }, [moodName])

//   return (
//     <div>
//       <h2>Recommendations for: {mood}</h2>
//       {recommended.length === 0 ? <p>No recommended songs</p> : (
//         <ol>{recommended.map((s,i)=><li key={i}>{s}</li>)}</ol>
//       )}
//     </div>
//   )
// }
