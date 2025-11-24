interface Problem {
    _id: string;
    title: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Tough';
    links: {
        youtube?: string;
        leetcode?: string;
        article?: string;
    };
}

interface ProblemRowProps {
    problem: Problem;
    isCompleted: boolean;
    onToggle: (id: string) => void;
}

const ProblemRow: React.FC<ProblemRowProps> = ({ problem, isCompleted, onToggle }) => {
    const handleCheckboxChange = () => {
        onToggle(problem._id);
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'text-gray-700 bg-gray-100 border-gray-300';
            case 'Medium': return 'text-gray-800 bg-gray-200 border-gray-400';
            case 'Hard':
            case 'Tough': return 'text-black bg-gray-300 border-gray-500';
            default: return 'text-gray-600 bg-gray-100 border-gray-200';
        }
    };

    return (
        <tr className={`hover:bg-gray-50 transition-colors duration-150 group ${isCompleted ? 'bg-gray-100' : ''}`}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="relative inline-flex items-center">
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={handleCheckboxChange}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-gray-400 bg-white transition-all checked:border-black checked:bg-black hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
                    />
                    <svg
                        className="absolute h-3.5 w-3.5 text-white pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-medium transition-colors ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {problem.title}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                {problem.links.youtube && (
                    <a
                        href={problem.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-400 hover:text-black transition-colors tooltip"
                        title="Watch Solution"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                    </a>
                )}
                {problem.links.leetcode && (
                    <a
                        href={problem.links.leetcode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-400 hover:text-black transition-colors"
                        title="Solve on LeetCode"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg>
                    </a>
                )}
                {problem.links.article && (
                    <a
                        href={problem.links.article}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-400 hover:text-black transition-colors"
                        title="Read Article"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                    </a>
                )}
            </td>
        </tr>
    );
};

export default ProblemRow;
