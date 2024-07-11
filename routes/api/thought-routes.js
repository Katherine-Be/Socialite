const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/');
//  get all/create new thought
router.route('/:thoughts').get(getAllThoughts).post(createThought);

//  get single thought by id
router.route('/:thoughts/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

//  add/remove reaction
router.route('/:thoughts/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;

//might have to use mongoose's patch method to update thoughts