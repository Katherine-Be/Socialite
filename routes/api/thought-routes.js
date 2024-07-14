const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    getThoughtByIdAndReactions,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

//  get all/create new thought

router.route('/').get(getAllThoughts).post(createThought);

//  get single thought by id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

//  add reaction
router.route('/:id/reactions').post(addReaction).get(getThoughtByIdAndReactions);

//  remove reaction
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;

