const Thought = require('../models/Thought');
const mongoose = require('mongoose');

module.exports = {
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

            const updateBody = { ...body };
            delete updateBody.reactions; 
    
            const thought = await Thought.findOneAndUpdate(
                { _id: params.id },
                { $set: updateBody },
                { new: true, runValidators: true }
            );
    
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (error) {
            if (error.name === 'ValidationError') {
                res.status(400).json({ message: 'Validation Error', errors: error.errors });
            } else if (error.name === 'CastError') {
                res.status(400).json({ message: 'Invalid ID format' });
            } else {
                res.status(500).json(error);
            }
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
    async getThoughtByIdAndReactions({ params: { id } }, res) {
        try {
            const thought = await Thought.findById(id);
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json({ thought, reactions: thought.reactions });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async addReaction({ params: { id }, body: reactionBody }, res) {
        try {
            const thought = await Thought.findById(id);
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            thought.reactions.push(reactionBody);
            await thought.save(); 
    
            res.json({ message: 'Reaction added successfully!', thought });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteReaction({ params: { id, reactionId } }, res) {
        try {
            const thought = await Thought.findById(id);
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id for delete!' });
                return;
            }
            // Convert reactionId from string to ObjectId for comparison
            const objectIdReactionId = new mongoose.Types.ObjectId(reactionId);
            // Filter out the reaction to be deleted
            thought.reactions = thought.reactions.filter(reaction => !reaction.reactionId.equals(objectIdReactionId));
            await thought.save(); // Save the updated thought document without the deleted reaction
    
            res.json({ message: 'Reaction deleted successfully!', thought });
        } catch (error) {
            console.error('Error in deleteReaction:', error); 
            res.status(500).json({ message: 'An error occurred', error: error.message });
        }
    }
};
