const {Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const friendsSchema = new Schema(
    {
        friendId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
            immutable: true // This makes the field immutable after it's set initially
          },
        friendUsername: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

module.exports = friendsSchema;