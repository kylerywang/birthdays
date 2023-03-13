export default function FriendCard({friend, deleteFriend}) {
    function handleDeleteButton(){
        deleteFriend(friend)
    }

    // async function sendText(){
    //     editFriend(friend)
    // }

    return (
        <div class="flex items-center justify-between bg-white rounded-lg px-6 py-4">
            <div class="flex-1 mr-4">
                <h3 class="text-lg font-medium text-gray-900">{friend.name}</h3>
                <p class="text-sm font-medium text-gray-500 mt-1">Birthday: {friend.birthday.month}/{friend.birthday.day}</p>
            </div>
            <button class="flex-shrink-0 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Delete
            </button>
        </div>

    );
}

