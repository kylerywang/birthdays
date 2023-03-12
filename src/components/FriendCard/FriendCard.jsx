export default function FriendCard({friend, deleteFriend}) {
    function handleDeleteButton(){
        deleteFriend(friend)
    }

    // async function sendText(){
    //     editFriend(friend)
    // }

    return (
        <>
            <h3>{friend.name} | {friend.birthday.month}/{friend.birthday.day}</h3>
            {/* <button onClick={sendText}>Edit</button> */}
            <button onClick={handleDeleteButton}>Delete</button>
        </>
    );
}