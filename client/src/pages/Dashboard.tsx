import { useState, useEffect } from 'react';
import axios from 'axios';
import ProblemRow from '../components/ProblemRow';
import Navbar from '../components/Navbar';
import Accordion from '../components/Accordion';
import { API_URL } from '@/lib/config';

interface Problem {
    _id: string;
    title: string;
    chapter: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Tough';
    links: {
        youtube?: string;
        leetcode?: string;
        article?: string;
    };
}

interface GroupedByTopic {
    [topic: string]: Problem[];
}

interface GroupedByChapter {
    [chapter: string]: GroupedByTopic;
}

const groupProblemsByChapter = (problems: Problem[] = []): GroupedByChapter => {
    return problems.reduce((acc, problem) => {
        if (!acc[problem.chapter]) {
            acc[problem.chapter] = {};
        }
        if (!acc[problem.chapter][problem.topic]) {
            acc[problem.chapter][problem.topic] = [];
        }
        acc[problem.chapter][problem.topic].push(problem);
        return acc;
    }, {} as GroupedByChapter);
};

const Dashboard: React.FC = () => {
    const [groupedProblems, setGroupedProblems] = useState<GroupedByChapter>({});
    const [completedProblems, setCompletedProblems] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                const [problemsRes, progressRes] = await Promise.all([
                    axios.get(`${API_URL}/problems`),
                    axios.get(`${API_URL}/problems/progress`, {
                        headers: { 'x-auth-token': token }
                    })
                ]);

                const problemsData = problemsRes.data.problems || problemsRes.data || [];
                const groupedData = problemsRes.data.grouped || groupProblemsByChapter(problemsData);

                setGroupedProblems(groupedData);
                setCompletedProblems(progressRes.data);
                setLoading(false);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleToggle = async (problemId: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${API_URL}/problems/toggle`,
                { problemId },
                { headers: { 'x-auth-token': token } }
            );

            setCompletedProblems(response.data);
        } catch (err: any) {
            if (err.response?.data?.msg) {
                alert(`Error: ${err.response.data.msg}`);
            } else {
                alert('Failed to update progress. Please try again.');
            }
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-6">
                    {Object.keys(groupedProblems).map(chapter => {
                        const chapterTopics = groupedProblems[chapter];
                        const chapterProblems = Object.values(chapterTopics).flat();
                        const chapterCompleted = chapterProblems.filter(p => completedProblems.includes(p._id)).length;
                        const chapterProgress = chapterProblems.length > 0 
                            ? Math.min(Math.round((chapterCompleted / chapterProblems.length) * 100), 100)
                            : 0;

                        return (
                            <Accordion key={chapter} title={`${chapter} - ${chapterCompleted}/${chapterProblems.length} (${chapterProgress}%)`}>
                                <div className="space-y-4">
                                    {Object.keys(chapterTopics).map(topic => {
                                        const topicProblems = chapterTopics[topic];
                                        const topicCompleted = topicProblems.filter(p => completedProblems.includes(p._id)).length;

                                        return (
                                            <div key={`${chapter}-${topic}`} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                                        <span className="w-2 h-6 bg-black rounded-full mr-3"></span>
                                                        {topic}
                                                    </h3>
                                                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                                        {topicCompleted} / {topicProblems.length}
                                                    </span>
                                                </div>
                                                <div className="overflow-x-auto">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                                                                Status
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                                Problem
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-32">
                                                                Difficulty
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider w-40">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {topicProblems.map(problem => (
                                                                <ProblemRow
                                                                    key={problem._id}
                                                                    problem={problem}
                                                                    isCompleted={completedProblems.includes(problem._id)}
                                                                    onToggle={handleToggle}
                                                                />
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Accordion>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
