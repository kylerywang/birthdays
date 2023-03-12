import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar() {

    function handleLogOut({user, setUser}) {
        userService.logOut()
        setUser(null)
    }

    return (
        <nav>
            <Link to="feed">Home</Link>
            &nbsp; | &nbsp;
            <Link to="/friends">Friends</Link>
            &nbsp; | &nbsp;<Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    )
}