import React, {useEffect, useState} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'
import userService from '../../services/user-service'
import AdminContent from "./admin-content";
import PrivateContent from "./private-content";
import PublicContent from "./public-content";

const Profile = () => {
    const {userId} = useParams();
    const [otherUser, setOtherUser] = useState({})
    const [currentUser, setCurrentUser] = useState({username: '', password: ''})
    const [friends, setFriends] = useState([])
    useEffect(() => {
        userService.profile()
            .then((currentUser) => {
                setCurrentUser(currentUser)
            })
        userService.findAllMyFriends()
            .then((friends) => setFriends(friends))
        if(userId) {
            userService.findUserById(userId)
                .then(otherUser => setOtherUser(otherUser))
        }
    }, [])
    const history = useHistory()
    const logout = () => {
        userService.logout()
            .then(() => {
                history.push("/")
            })
    }
    return(
        <div>
            <h1>Profile</h1>
            
            <PublicContent/>
            
            {
                currentUser && currentUser.role === "ADMIN" &&
                    <AdminContent/>
            }
            
            {
                currentUser && userId && currentUser.id === userId &&
                    <PrivateContent/>
            }
            
            {
                currentUser && !userId &&
                    <PrivateContent/>
            }
            
            {JSON.stringify(currentUser)}
            <h3>Welcome {currentUser.username}</h3>
            
            <ul className="list-group">
                {
                    friends.map((friend) => {
                        return (
                            <li className="list-group-item">
                                <Link to={`/profile/${friend.id}`}>
                                    {friend.username}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <button
                onClick={logout}
                className="btn btn-primary">
                Logout
            </button>
        </div>
    )
}

export default Profile;