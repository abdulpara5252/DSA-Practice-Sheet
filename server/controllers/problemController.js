const Problem = require('../models/Problem');
const User = require('../models/User');

exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().sort({ chapter: 1, topic: 1, title: 1 });
        
        const groupedData = problems.reduce((acc, problem) => {
            if (!acc[problem.chapter]) {
                acc[problem.chapter] = {};
            }
            if (!acc[problem.chapter][problem.topic]) {
                acc[problem.chapter][problem.topic] = [];
            }
            acc[problem.chapter][problem.topic].push(problem);
            return acc;
        }, {});

        res.json({
            problems: problems,
            grouped: groupedData
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getUserProgress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('completedProblems');
        res.json(user.completedProblems);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.toggleProblemCompletion = async (req, res) => {
    try {
        const { problemId } = req.body;
        
        if (!problemId) {
            return res.status(400).json({ msg: 'Problem ID is required' });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const Problem = require('../models/Problem');
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ msg: 'Problem not found' });
        }

        const problemIdStr = problemId.toString();
        const completedIds = user.completedProblems.map(id => id.toString());
        
        const index = completedIds.indexOf(problemIdStr);
        if (index === -1) {
            user.completedProblems.push(problemId);
        } else {
            const originalIndex = user.completedProblems.findIndex(
                id => id.toString() === problemIdStr
            );
            if (originalIndex !== -1) {
                user.completedProblems.splice(originalIndex, 1);
            }
        }

        await user.save();
        
        const updatedProgress = user.completedProblems.map(id => id.toString());
        res.json(updatedProgress);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
