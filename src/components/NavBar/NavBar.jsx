import { Link } from 'react-router-dom'
import * as userService from '../../utilities/users-service' 

export default function NavBar() {

    function handleLogOut({user, setUser}) {
        userService.logOut()
        setUser(null)
    }

    return (
        <div class="bg-gray-100">
            <header class="sticky top-0 z-30 w-full px-2 py-4 bg-white sm:px-4 shadow-xl">
                <div class="flex items-center justify-between mx-auto max-w-7xl">
                <a href="/">
                    <span class="text-4xl font-extrabold text-blue-600">Birthday Texts</span>
                </a>
                <div class="flex items-center space-x-1">
                    <ul class="hidden space-x-2 md:inline-flex">
                        <li><Link to="/friends" className="px-4 py-2 font-semibold text-gray-600 rounded">Friends</Link></li>
                        <li><Link to="" className="px-4 py-2 font-semibold text-gray-600 rounded"onClick={handleLogOut}>Log Out</Link></li>


                    </ul>
                    <div class="inline-flex md:hidden">
                    <button class="flex-none px-2 ">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                        </svg>
                        <span class="sr-only">Open Menu</span>
                    </button>
                    </div>
                </div>
                </div>
            </header>

        {/* <section class="p-4 mx-auto max-w-7xl">
            <div class="mx-auto font-sans">
            <h1 class="text-2xl font-bold">Tailwind CSS sticky header</h1>
            <p> Header dummay data Lorem....</p>
            </div>
        </section> */}
        </div>

    )
}