const Thought = require('../models/Thought');

const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getThoughtById({ params },
        res) {
        try {
            const thought = await Thought.findOne({ _id: params.id });
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateThought({ params, body }, res) {
        try {
            const thought = await Thought
                .findOneAndUpdate({
                    _id: params.id
                },
                    body,
                    { new: true, runValidators: true }
                );
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteThought({ params }, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: params.id });
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async addReaction({ params, body }, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteReaction({ params }, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

