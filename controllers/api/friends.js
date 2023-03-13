const Friend=require('../../models/friend');

module.exports = {
    getAll,
    create,
    delete: deleteFriend,
}

async function getAll(req, res) {
    const friends = await Friend.getFriends(req.user._id);
    res.json(friends)
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


