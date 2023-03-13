import { useState } from "react";

export default function NewFriendForm({ addFriend, user }) {
  const [newFriend, setNewFriend] = useState({
    name: "",
    birthday: {
        month: null,
        day: null
    },
    user: user
  });
  function handleAddFriend(evt) {
    evt.preventDefault();
    addFriend(newFriend)
    setNewFriend({
        name: "",
        birthday: {
            month: null,
            day: null,
        },
        user: user
    });
  }
  return (
    <>
    <div class="flex text-left text-xl my-4">
        <h1 class="font-bold">Add New Birthday</h1>
    </div>
    <form class="w-full" onSubmit={handleAddFriend}>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={newFriend.name}
            onChange={(evt) => setNewFriend({...newFriend, name: evt.target.value})}
            placeholder="Name"
            required
            pattern=".{4,}" />
            <p class="text-gray-600 text-xs italic"></p>
            </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
                Birthday Month
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number"
                value={newFriend.birthday.month}
                onChange={(evt) => setNewFriend({...newFriend, birthday: {...newFriend.birthday, month: evt.target.value}})}
                placeholder="Month"
                required />
            <p class="text-gray-500 text-xs italic">Please enter as a number 1-12.</p>
            </div>
            <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Birthday Day
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number"
                value={newFriend.birthday.day}
                onChange={(evt) => setNewFriend({...newFriend, birthday: {...newFriend.birthday, day: evt.target.value}})}
                placeholder="Day"
                required/>
            </div>
            <div class="w-full text-right">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-3 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Add Friend
                </button>

            </div>
        </div>
    </form>
    </>
  );
}
