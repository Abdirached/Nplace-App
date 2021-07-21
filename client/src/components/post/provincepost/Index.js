import {useEffect} from 'react'
// import locationListener from '../../../hooks/LocationListner' will need later
import {postsAdded} from '../../../features/provinceposts/ProvincePostsSlice'
import {useDispatch} from 'react-redux'
const axios = require('axios')

export default function ProvincePost() {
    const dispatch= useDispatch()
    useEffect(() => {
        provincePosts()
    }, [])
    const provincePosts = async function getProvincePosts(){
        try {
            const response = await axios.get("http://localhost:5000/Posts/province/Hargeisa",{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                }
            })
            console.log(response.data.posts)
            dispatch(postsAdded(response.data.posts))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            iam post index component for province
        </div>
    )
}
