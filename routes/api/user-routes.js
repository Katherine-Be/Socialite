const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

//  retrieve all users/create new user
router.route('/').get(getAllUsers).post(createUser);

//  get single user by id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

//  add/remove friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;

//might have to use mongoose's patch method to update users