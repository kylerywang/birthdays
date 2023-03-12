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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const nextBirthday = new Date(`${currentYear}-${this.month}-${this.day}`);

    if (nextBirthday < currentDate) {
        nextBirthday.setFullYear(currentYear + 1); // Set next year's birthday date
    }

    return nextBirthday;})

friendSchema.virtual('daysUntil').get(function(){
    return Math.floor((this.nextBirthday.getTime() - Date.now() )/ (1000 *60*60*24));
})

//statics
friendSchema.statics.getFriends = function (userId){
    return this.find(
        {user: userId})
};

//methods
friendSchema.methods.requiresNotification = function(date) {
    // const nextBirthdayPST = moment(this.nextBirthday).tz('America/Los_Angeles');
    const fiveMinFromNow = moment(date).tz('America/Los_Angeles').add(2, 'minutes');
    const currentDatePST = moment(date).tz('America/Los_Angeles');
    const duration = moment.duration(fiveMinFromNow.diff(currentDatePST));
    // const duration = moment.duration(nextBirthdayPST.diff(currentDatePST));
    const durationInMinutes = Math.round(duration.asMinutes());
    return durationInMinutes === 0; // Change this value to 5 or however many minutes you want to test for
  };

friendSchema.statics.sendNotifications = function(callback) {
    const searchDate = new Date();
    Friend
      .find()
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
    const client = new Twilio(cfg.twilioAccountSid, cfg.twilioAuthToken);
    friends.forEach(function(friend) {
            // Create options to send the message
        const options = {
            to: `+ ${friend.user.phone}`,
            from: cfg.twilioPhoneNumber,
            /* eslint-disable max-len */
            body: `It's ${friend.name}'s Birthday!`,
            /* eslint-enable max-len */
        };

            // Send the message!
        client.messages.create(options, function(err, response) {
            if (err) {
                // Just log it for now
                console.error(err);
            } else {
                // Log the last few digits of a phone number
                let masked = friend.user.phoneNumber.substr(0,
                    friend.user.phoneNumber.length - 5);
                masked += '*****';
                console.log(`Message sent to ${masked}`);
            }
        });
        });
        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call();
        }
    }




module.exports = mongoose.model('Friend', friendSchema);
