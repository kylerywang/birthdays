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
      <h2>New Friend</h2>
      <form onSubmit={handleAddFriend}>
        <input
            value={newFriend.name}
            onChange={(evt) => setNewFriend({...newFriend, name: evt.target.value})}
            placeholder="Name"
            required
            pattern=".{4,}"
        />
        <input
            type="number"
            value={newFriend.birthday.month}
            onChange={(evt) => setNewFriend({...newFriend, birthday: {...newFriend.birthday, month: evt.target.value}})}
            placeholder="Month"
            required
        />
        <input
            type="number"
            value={newFriend.birthday.day}
            onChange={(evt) => setNewFriend({...newFriend, birthday: {...newFriend.birthday, day: evt.target.value}})}
            placeholder="Day"
            required
        />
        <button type="submit"> ADD FRIEND </button>
      </form>
    </>
  );
}
