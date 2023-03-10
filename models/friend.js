const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const cfg = require('../config/twilio');
const Twilio = require('twilio');

const friendSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: {type: String, required: true},
    birthday:{
        month: { type: Number, required: true },
        day: { type: Number, required: true }
        // Don't want to include year
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals:true
    }
});

friendSchema.virtual('nextBirthday').get(function(){
    const currentYear = moment().year();
    const nextBirthday = moment(`${currentYear}-${this.birthday.month}-${this.birthday.day}`, 'YYYY-MM-DD');
  
    if (nextBirthday.isBefore()) {
      nextBirthday.add(1, 'year');
    }
  
    return nextBirthday.toISOString();
  });

friendSchema.virtual('daysUntil').get(function(){
    return ((moment(this.nextBirthday).diff(moment(), 'days'))%365)
    
})

friendSchema.statics.getFriends = async function (userId){
    userFriends = await this.find(
        {user: userId})
    
    userFriends.sort((a, b) => {
        if (a.nextBirthday < b.nextBirthday) {
            return -1;
        }
        if (a.nextBirthday > b.nextBirthday) {
            return 1;
        }
            return 0;
        });
    return userFriends
};

friendSchema.statics.getFeed = async function (users){
    
};

//methods
friendSchema.methods.requiresNotification = function(date) {
    console.log(`${this.daysUntil} days until ${this.name}'s birthday.`)
    return this.daysUntil === 0;
  };


friendSchema.statics.sendNotifications = function(callback) {
    const searchDate = new Date();
    Friend
      .find()
      .populate('user')
      .then(function(friends) {
        friends = friends.filter(function(friend) {
                return friend.requiresNotification(searchDate);
        });
        if (friends.length > 0) {
          sendNotifications(friends);
        }
      });
}

function sendNotifications(friends) {
    const client = new Twilio(cfg.twilio.accountSid, cfg.twilio.authToken);
    friends.forEach(function(friend) {
        const options = {
            to: `+1${friend.user.phone}`,
            from: cfg.twilio.phoneNumber,
            /* eslint-disable max-len */
            body: `It's ${friend.name}'s birthday! ????`,
            /* eslint-enable max-len */
        };

            // Send the message!
        client.messages.create(options, function(err, response) {
            if (err) {
                // Just log it for now
                console.error(err);
            } else {
                // Log the last few digits of a phone number
                let masked = friend.user.phone.substr(0,
                    friend.user.phone.length - 5);
                masked += '*****';
                console.log(`Message for ${friend.name} sent to ${masked}`);
            }
        });
    });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        // if (callback) {
        //   callback.call();
        // }
    }



const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
