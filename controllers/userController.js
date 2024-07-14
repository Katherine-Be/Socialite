const User = require('../models/user');


module.exports = {
    async getAllUsers(req, res) {
        try {
            // await User.deleteMany({}); //use if deleteing all users
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    async getUserById({ params }, res) {
        try {
            const user = await User.findOne({ _id: params.id });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateUser({ params, body }, res) {
        try {
            const user = await User
                .findOneAndUpdate({
                    _id: params.id
                },
                    body,
                    { new: true, runValidators: true }
                );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteUser({ params }, res) {
        try {
            const user = await User.findOneAndDelete({ _id: params.id });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    async addFriend({ params: { userId, friendId } }, res) {
        try {
            console.log(userId)
            const user = await User.findById(userId);
            // const user = await User.findOne({
            //     _id: userId
            // })
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            user.friends.push(friendId);
            await user.save();
    
            res.json({ message: 'Friend added successfully!', user });
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    },
    async removeFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};



