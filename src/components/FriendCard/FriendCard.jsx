export default function FriendCard({friend, deleteFriend}) {
    function handleDeleteButton(){
        deleteFriend(friend)
    }

    const nextBirthdayDate = new Date(friend.nextBirthday);
    const formattedDate = nextBirthdayDate.toLocaleString("en-US", { month: "long", day: "numeric" });

    return (
        <div className="flex items-center justify-between bg-white rounded-lg px-6 py-4">
            <div className="flex-1 mr-4">
                <p className="text-sm font-medium text-blue-500 mt-1">IN {friend.daysUntil} DAYS</p>
                <h3 className="text-lg font-medium text-gray-900">{friend.name}</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">{formattedDate}</p>
            </div>
            <button className="flex-shrink-0 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={handleDeleteButton}>
                Delete
            </button>
        </div>

    );
}

