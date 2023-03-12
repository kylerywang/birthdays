import sendRequest from './send-request';

const BASE_URL = '/api/friends';


export async function getAll(){
    return sendRequest(`${BASE_URL}`);
}

export async function getById(friendId){
    return sendRequest(`${BASE_URL}/${friendId}`);
}

export async function newFriend(friendData){
    return sendRequest(BASE_URL, 'POST', friendData);
}

export async function deleteFriend(friendId){
    return sendRequest(`${BASE_URL}/${friendId}`, 'DELETE');
}

export async function updateFriend(friendId, friendData){
    return sendRequest(`${BASE_URL}/${friendId}`, 'PUT', friendData);
}