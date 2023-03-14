import * as friendsAPI from '../../utilities/friends-api'
import FriendCard from '../../components/FriendCard/FriendCard';
import {useState, useEffect} from 'react';
import NewFriendForm from '../../components/NewFriendForm/NewFriendForm';

export default function Friends({friends, setFriends, user}) {

    useEffect(function() {
        async function getFriends(){
          const friendsRetrieval= await friendsAPI.getAll()
          setFriends(friendsRetrieval);
        }
        getFriends()
      }, [])

    async function addFriend(newFriendData){
        console.log(newFriendData)
        const friend = await friendsAPI.newFriend(newFriendData)
        setFriends([...friends, friend])
    }

    async function deleteFriend(deleteFriendData){
        try {
            await friendsAPI.deleteFriend(deleteFriendData.id);
            setFriends(friends.filter(friend => friend.id !== deleteFriendData.id));
          } catch (err) {
            console.error(err);
          }
    }

    return(
    <div>
        <div>
            <div class="flex text-left text-xl m-4 mt-10">
                <h1 class="font-bold">Add New Birthday</h1>
            </div>
            <NewFriendForm addFriend = {addFriend} user={user}/>
        </div>
        <div>
            <div class="flex text-left text-xl m-4">
                <h1 class="font-bold">My Friends</h1>
            </div>
            <div className="rounded-lg border border-gray-200">
                
                <ul>
                    {friends.map((friend)=>(
                        <FriendCard friend={friend} key={friend.id} deleteFriend={deleteFriend}/>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    )
    
}

// return (
//     <>
//         <NewFriendForm addFriend = {addFriend} user={user}/>
//         <ul>
//             {friends.map((friend)=>(
//                 <FriendCard friend={friend} key={friend.id} deleteFriend={deleteFriend}/>
//             ))}
//         </ul>
//     </>
// )