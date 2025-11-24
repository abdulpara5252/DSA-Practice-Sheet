const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('./models/Problem');

dotenv.config();

const problems = [
    // Chapter 1: Arrays & Hashing (4 problems)
    {
        title: "Two Sum",
        chapter: "Arrays & Hashing",
        topic: "Arrays",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=KLlXCFG5TnA",
            leetcode: "https://leetcode.com/problems/two-sum/",
            article: "https://neetcode.io/problems/two-sum"
        }
    },
    {
        title: "Valid Anagram",
        chapter: "Arrays & Hashing",
        topic: "Strings",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=9UtInBqnCgA",
            leetcode: "https://leetcode.com/problems/valid-anagram/",
            article: "https://neetcode.io/problems/valid-anagram"
        }
    },
    {
        title: "Group Anagrams",
        chapter: "Arrays & Hashing",
        topic: "Strings",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=vzdNOK2oB2C",
            leetcode: "https://leetcode.com/problems/group-anagrams/",
            article: "https://neetcode.io/problems/group-anagrams"
        }
    },
    {
        title: "Top K Frequent Elements",
        chapter: "Arrays & Hashing",
        topic: "Heaps",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=YPTqKIgVkJk",
            leetcode: "https://leetcode.com/problems/top-k-frequent-elements/",
            article: "https://neetcode.io/problems/top-k-frequent-elements"
        }
    },

    // Chapter 2: Two Pointers (3 problems)
    {
        title: "Valid Palindrome",
        chapter: "Two Pointers",
        topic: "Strings",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=jJXJ16kPFWg",
            leetcode: "https://leetcode.com/problems/valid-palindrome/",
            article: "https://neetcode.io/problems/valid-palindrome"
        }
    },
    {
        title: "3Sum",
        chapter: "Two Pointers",
        topic: "Arrays",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=jzZsG8n2R9A",
            leetcode: "https://leetcode.com/problems/3sum/",
            article: "https://neetcode.io/problems/3sum"
        }
    },
    {
        title: "Container With Most Water",
        chapter: "Two Pointers",
        topic: "Arrays",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=UuiTKBwPgAo",
            leetcode: "https://leetcode.com/problems/container-with-most-water/",
            article: "https://neetcode.io/problems/container-with-most-water"
        }
    },

    // Chapter 3: Sliding Window (4 problems)
    {
        title: "Best Time to Buy and Sell Stock",
        chapter: "Sliding Window",
        topic: "Arrays",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=1pkOgXD63yU",
            leetcode: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
            article: "https://neetcode.io/problems/best-time-to-buy-and-sell-stock"
        }
    },
    {
        title: "Longest Substring Without Repeating Characters",
        chapter: "Sliding Window",
        topic: "Strings",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=wiGpQwVHdE0",
            leetcode: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            article: "https://neetcode.io/problems/longest-substring-without-repeating-characters"
        }
    },
    {
        title: "Longest Repeating Character Replacement",
        chapter: "Sliding Window",
        topic: "Strings",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=gqXU1UyA8pk",
            leetcode: "https://leetcode.com/problems/longest-repeating-character-replacement/",
            article: "https://neetcode.io/problems/longest-repeating-character-replacement"
        }
    },
    {
        title: "Minimum Window Substring",
        chapter: "Sliding Window",
        topic: "Strings",
        difficulty: "Hard",
        links: {
            youtube: "https://www.youtube.com/watch?v=jSto0O4AJbM",
            leetcode: "https://leetcode.com/problems/minimum-window-substring/",
            article: "https://neetcode.io/problems/minimum-window-substring"
        }
    },

    // Chapter 4: Stack (3 problems)
    {
        title: "Valid Parentheses",
        chapter: "Stack",
        topic: "Strings",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=WTzjTskDFMg",
            leetcode: "https://leetcode.com/problems/valid-parentheses/",
            article: "https://neetcode.io/problems/valid-parentheses"
        }
    },
    {
        title: "Min Stack",
        chapter: "Stack",
        topic: "Design",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=qkLl7nAwDPo",
            leetcode: "https://leetcode.com/problems/min-stack/",
            article: "https://neetcode.io/problems/min-stack"
        }
    },
    {
        title: "Daily Temperatures",
        chapter: "Stack",
        topic: "Arrays",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=cTBiBSnjO3c",
            leetcode: "https://leetcode.com/problems/daily-temperatures/",
            article: "https://neetcode.io/problems/daily-temperatures"
        }
    },

    // Chapter 5: Binary Search (4 problems)
    {
        title: "Binary Search",
        chapter: "Binary Search",
        topic: "Arrays",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=s4DPM8ct1pI",
            leetcode: "https://leetcode.com/problems/binary-search/",
            article: "https://neetcode.io/problems/binary-search"
        }
    },
    {
        title: "Search in Rotated Sorted Array",
        chapter: "Binary Search",
        topic: "Arrays",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=U8XENwh8Oy8",
            leetcode: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
            article: "https://neetcode.io/problems/search-in-rotated-sorted-array"
        }
    },
    {
        title: "Find Minimum in Rotated Sorted Array",
        chapter: "Binary Search",
        topic: "Arrays",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=nIVW4P8b1VA",
            leetcode: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
            article: "https://neetcode.io/problems/find-minimum-in-rotated-sorted-array"
        }
    },
    {
        title: "Time Based Key-Value Store",
        chapter: "Binary Search",
        topic: "Design",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=fu2cD_6E8Hw",
            leetcode: "https://leetcode.com/problems/time-based-key-value-store/",
            article: "https://neetcode.io/problems/time-based-key-value-store"
        }
    },

    // Chapter 6: Linked List (4 problems)
    {
        title: "Reverse Linked List",
        chapter: "Linked List",
        topic: "Linked List",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=G0_I-ZF0S38",
            leetcode: "https://leetcode.com/problems/reverse-linked-list/",
            article: "https://neetcode.io/problems/reverse-linked-list"
        }
    },
    {
        title: "Merge Two Sorted Lists",
        chapter: "Linked List",
        topic: "Linked List",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=XIdigk956u0",
            leetcode: "https://leetcode.com/problems/merge-two-sorted-lists/",
            article: "https://neetcode.io/problems/merge-two-sorted-lists"
        }
    },
    {
        title: "Linked List Cycle",
        chapter: "Linked List",
        topic: "Linked List",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=gBTe7lFR3vc",
            leetcode: "https://leetcode.com/problems/linked-list-cycle/",
            article: "https://neetcode.io/problems/linked-list-cycle"
        }
    },
    {
        title: "Remove Nth Node From End of List",
        chapter: "Linked List",
        topic: "Linked List",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=XVuQxVej6y8",
            leetcode: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
            article: "https://neetcode.io/problems/remove-nth-node-from-end-of-list"
        }
    },

    // Chapter 7: Trees (4 problems)
    {
        title: "Invert Binary Tree",
        chapter: "Trees",
        topic: "Binary Tree",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=OnSn2XEQ4MY",
            leetcode: "https://leetcode.com/problems/invert-binary-tree/",
            article: "https://neetcode.io/problems/invert-binary-tree"
        }
    },
    {
        title: "Maximum Depth of Binary Tree",
        chapter: "Trees",
        topic: "Binary Tree",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=hTM3phVI6YQ",
            leetcode: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
            article: "https://neetcode.io/problems/maximum-depth-of-binary-tree"
        }
    },
    {
        title: "Validate Binary Search Tree",
        chapter: "Trees",
        topic: "BST",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=s6ATEkipzow",
            leetcode: "https://leetcode.com/problems/validate-binary-search-tree/",
            article: "https://neetcode.io/problems/validate-binary-search-tree"
        }
    },
    {
        title: "Lowest Common Ancestor of BST",
        chapter: "Trees",
        topic: "BST",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=gs2LMfuOR9k",
            leetcode: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
            article: "https://neetcode.io/problems/lowest-common-ancestor-of-a-binary-search-tree"
        }
    },

    // Chapter 8: Tries (2 problems)
    {
        title: "Implement Trie",
        chapter: "Tries",
        topic: "Design",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=oobqoCJlHA0",
            leetcode: "https://leetcode.com/problems/implement-trie-prefix-tree/",
            article: "https://neetcode.io/problems/implement-trie-prefix-tree"
        }
    },
    {
        title: "Word Search II",
        chapter: "Tries",
        topic: "Backtracking",
        difficulty: "Hard",
        links: {
            youtube: "https://www.youtube.com/watch?v=asbcE9mZz_U",
            leetcode: "https://leetcode.com/problems/word-search-ii/",
            article: "https://neetcode.io/problems/word-search-ii"
        }
    },

    // Chapter 9: Heap / Priority Queue (3 problems)
    {
        title: "Kth Largest Element in Array",
        chapter: "Heap / Priority Queue",
        topic: "Arrays",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=XEmy13g1Qxc",
            leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
            article: "https://neetcode.io/problems/kth-largest-element-in-an-array"
        }
    },
    {
        title: "K Closest Points to Origin",
        chapter: "Heap / Priority Queue",
        topic: "Arrays",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=rI2EBUEMfTk",
            leetcode: "https://leetcode.com/problems/k-closest-points-to-origin/",
            article: "https://neetcode.io/problems/k-closest-points-to-origin"
        }
    },
    {
        title: "Find Median from Data Stream",
        chapter: "Heap / Priority Queue",
        topic: "Design",
        difficulty: "Hard",
        links: {
            youtube: "https://www.youtube.com/watch?v=itmhHWaHupI",
            leetcode: "https://leetcode.com/problems/find-median-from-data-stream/",
            article: "https://neetcode.io/problems/find-median-from-data-stream"
        }
    },

    // Chapter 10: Backtracking (4 problems)
    {
        title: "Subsets",
        chapter: "Backtracking",
        topic: "Arrays",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=REOH22Xwdkk",
            leetcode: "https://leetcode.com/problems/subsets/",
            article: "https://neetcode.io/problems/subsets"
        }
    },
    {
        title: "Combination Sum",
        chapter: "Backtracking",
        topic: "Arrays",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=GBKI9VSKdGg",
            leetcode: "https://leetcode.com/problems/combination-sum/",
            article: "https://neetcode.io/problems/combination-sum"
        }
    },
    {
        title: "Permutations",
        chapter: "Backtracking",
        topic: "Arrays",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=s7AvT7cGdSo",
            leetcode: "https://leetcode.com/problems/permutations/",
            article: "https://neetcode.io/problems/permutations"
        }
    },
    {
        title: "Word Search",
        chapter: "Backtracking",
        topic: "Matrix",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=pfiQ_PS1g8E",
            leetcode: "https://leetcode.com/problems/word-search/",
            article: "https://neetcode.io/problems/word-search"
        }
    },

    // Chapter 11: Graphs (4 problems)
    {
        title: "Number of Islands",
        chapter: "Graphs",
        topic: "DFS/BFS",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=pV2kpPD66nE",
            leetcode: "https://leetcode.com/problems/number-of-islands/",
            article: "https://neetcode.io/problems/number-of-islands"
        }
    },
    {
        title: "Clone Graph",
        chapter: "Graphs",
        topic: "DFS/BFS",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=mQeF6bN8hMk",
            leetcode: "https://leetcode.com/problems/clone-graph/",
            article: "https://neetcode.io/problems/clone-graph"
        }
    },
    {
        title: "Pacific Atlantic Water Flow",
        chapter: "Graphs",
        topic: "DFS/BFS",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=s-VkcjHqkGI",
            leetcode: "https://leetcode.com/problems/pacific-atlantic-water-flow/",
            article: "https://neetcode.io/problems/pacific-atlantic-water-flow"
        }
    },
    {
        title: "Course Schedule",
        chapter: "Graphs",
        topic: "Topological Sort",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=EgI5nU9etnU",
            leetcode: "https://leetcode.com/problems/course-schedule/",
            article: "https://neetcode.io/problems/course-schedule"
        }
    },

    // Chapter 12: Dynamic Programming (4 problems)
    {
        title: "Climbing Stairs",
        chapter: "Dynamic Programming",
        topic: "1D DP",
        difficulty: "Easy",
        links: {
            youtube: "https://www.youtube.com/watch?v=Y0lT9Fck7qI",
            leetcode: "https://leetcode.com/problems/climbing-stairs/",
            article: "https://neetcode.io/problems/climbing-stairs"
        }
    },
    {
        title: "House Robber",
        chapter: "Dynamic Programming",
        topic: "1D DP",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=73r3KWiEvyk",
            leetcode: "https://leetcode.com/problems/house-robber/",
            article: "https://neetcode.io/problems/house-robber"
        }
    },
    {
        title: "Longest Increasing Subsequence",
        chapter: "Dynamic Programming",
        topic: "1D DP",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=cjWnW0hdF1Y",
            leetcode: "https://leetcode.com/problems/longest-increasing-subsequence/",
            article: "https://neetcode.io/problems/longest-increasing-subsequence"
        }
    },
    {
        title: "Coin Change",
        chapter: "Dynamic Programming",
        topic: "1D DP",
        difficulty: "Medium",
        links: {
            youtube: "https://www.youtube.com/watch?v=H9bfqozjoqs",
            leetcode: "https://leetcode.com/problems/coin-change/",
            article: "https://neetcode.io/problems/coin-change"
        }
    }
];

// Seed function that can be called from server.js or run standalone
const seedDB = async (closeConnection = false) => {
    try {
        console.log('🌱 Starting database seeding...');
        console.log('Deleting existing problems...');
        const deleteResult = await Problem.deleteMany({});
        console.log(`Deleted ${deleteResult.deletedCount} problems`);
        
        console.log('Inserting new problems...');
        const insertResult = await Problem.insertMany(problems);
        console.log(`✅ Inserted ${insertResult.length} problems`);
        
        // Verify the data
        const count = await Problem.countDocuments();
        console.log(`📊 Total problems in database: ${count}`);
        console.log('✅ Database Seeded Successfully!');
        
        // Only close connection if running standalone
        if (closeConnection) {
            await mongoose.connection.close();
            console.log('✅ MongoDB connection closed');
            process.exit(0);
        }
    } catch (error) {
        console.error('❌ Seeding Error:', error);
        console.error('Error details:', error.message);
        if (closeConnection) {
            await mongoose.connection.close();
            process.exit(1);
        }
        throw error; // Re-throw if called from server.js
    }
};

// Export the function for use in server.js
module.exports = seedDB;

// If running directly (node seed.js), execute the seed function
if (require.main === module) {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/dsa-sheet';
    mongoose.connect(mongoURI)
        .then(async () => {
            console.log('MongoDB Connected for Seeding');
            await seedDB(true); // true = close connection after seeding
        })
        .catch(err => {
            console.error('MongoDB Connection Error:', err);
            process.exit(1);
        });
}
