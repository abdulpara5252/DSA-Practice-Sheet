import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { API_URL } from '@/lib/config';

interface Problem {
    _id: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Tough';
}

const Progress: React.FC = () => {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [completedProblems, setCompletedProblems] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const [problemsRes, progressRes] = await Promise.all([
                    axios.get(`${API_URL}/problems`),
                    axios.get(`${API_URL}/problems/progress`, {
                        headers: { 'x-auth-token': token }
                    })
                ]);

                const problemsData = problemsRes.data.problems || problemsRes.data;
                setProblems(problemsData);
                
                const validCompletedProblems = (progressRes.data || []).filter((completedId: string) => 
                    problemsData.some((p: Problem) => p._id === completedId)
                );
                
                setCompletedProblems(validCompletedProblems);
                setLoading(false);
            } catch (err: any) {
                console.error('Fetch error:', err);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    // Separate problems by difficulty
    const easyProblems = problems.filter(p => p.difficulty === 'Easy');
    const mediumProblems = problems.filter(p => p.difficulty === 'Medium');
    const hardProblems = problems.filter(p => p.difficulty === 'Hard' || p.difficulty === 'Tough');

    // Count completed problems for each difficulty
    const easyCompleted = easyProblems.filter(p => completedProblems.includes(p._id)).length;
    const mediumCompleted = mediumProblems.filter(p => completedProblems.includes(p._id)).length;
    const hardCompleted = hardProblems.filter(p => completedProblems.includes(p._id)).length;

    // Calculate percentages
    const easyPercentage = easyProblems.length > 0 ? Math.round((easyCompleted / easyProblems.length) * 100) : 0;
    const mediumPercentage = mediumProblems.length > 0 ? Math.round((mediumCompleted / mediumProblems.length) * 100) : 0;
    const hardPercentage = hardProblems.length > 0 ? Math.round((hardCompleted / hardProblems.length) * 100) : 0;

    // Overall stats
    const totalProblems = problems.length;
    const totalCompleted = completedProblems.length;
    const overallPercentage = totalProblems > 0 ? Math.round((totalCompleted / totalProblems) * 100) : 0;

    console.log('Progress Debug:', {
        totalProblems,
        totalCompleted,
        easyProblems: easyProblems.length,
        easyCompleted,
        mediumProblems: mediumProblems.length,
        mediumCompleted,
        hardProblems: hardProblems.length,
        hardCompleted,
        overallPercentage
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Progress Report</h1>
                        
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-semibold text-gray-900">Easy</span>
                                    <span className="text-lg font-bold text-gray-900">{easyPercentage}% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div
                                        className="bg-green-500 h-4 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${Math.min(easyPercentage, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    {easyCompleted} of {easyProblems.length} problems completed
                                </p>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-semibold text-gray-900">Medium</span>
                                    <span className="text-lg font-bold text-gray-900">{mediumPercentage}% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div
                                        className="bg-yellow-500 h-4 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${Math.min(mediumPercentage, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    {mediumCompleted} of {mediumProblems.length} problems completed
                                </p>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-lg font-semibold text-gray-900">Hard</span>
                                    <span className="text-lg font-bold text-gray-900">{hardPercentage}% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div
                                        className="bg-red-500 h-4 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${Math.min(hardPercentage, 100)}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    {hardCompleted} of {hardProblems.length} problems completed
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-black rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">Overall Progress</h2>
                        <div className="text-5xl font-bold mb-6">{overallPercentage}%</div>
                        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-white h-4 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${Math.min(overallPercentage, 100)}%` }}
                            ></div>
                        </div>
                        <p className="text-gray-300 mt-4 text-lg">
                            {totalCompleted} of {totalProblems} problems completed
                        </p>
                        
                        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-700">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{easyCompleted}</div>
                                <div className="text-xs text-gray-400 mt-1">Easy</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">{mediumCompleted}</div>
                                <div className="text-xs text-gray-400 mt-1">Medium</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-400">{hardCompleted}</div>
                                <div className="text-xs text-gray-400 mt-1">Hard</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Problems Remaining</p>
                                    <p className="text-3xl font-bold text-gray-900">{totalProblems - totalCompleted}</p>
                                </div>
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                                    <p className="text-3xl font-bold text-gray-900">{overallPercentage}%</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Progress;