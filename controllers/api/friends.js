const Friend=require('../../models/friend');

module.exports = {
    getAll,
    show,
    create,
    delete: deleteFriend,
    update,
}

async function getAll(req, res) {
    const friends = await Friend.getFriends(req.user_id);
    res.json(friends)
}

async function show(req,res){

}


async function create(req, res) {
    try {
        const friend = await Friend.create(req.body)
        res.json(friend)
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function deleteFriend(req,res){
    try {
        const friendId = req.params.id;
        const friend = await Friend.findByIdAndDelete(friendId);
        return res.json(friend)
    } catch(err){
        console.log(err);
        res.status(400).json(err)
    }
    
}

async function update(req, res){

}

