import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const SecretDashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, errors: 0, suggestions: 0 });

    // Auth State
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [authError, setAuthError] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                try {
                    // Determine URL: use local logic or direct call if supported.
                    // NOTE: The current Apps Script needs to support doGet for this to work.
                    const SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;
                    if (!SHEET_URL) return;

                    const response = await fetch(SHEET_URL);
                    if (!response.ok) throw new Error("Failed to fetch");

                    const json = await response.json();
                    if (json.result === 'success') {
                        // Assuming json.data is the array of rows
                        // The scripts 'doGet' needs to return { result: 'success', data: [...] }
                        processData(json.data);
                    }
                } catch (error) {
                    console.error("Dashboard Load Error:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [isAuthenticated]);

    const handleOtpChange = (val, index) => {
        if (!/^\d*$/.test(val)) return; // Numbers only

        const newOtp = [...otp];
        newOtp[index] = val;
        setOtp(newOtp);

        // Auto-Focus Next
        if (val && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }

        // Auto-verify when full
        if (newOtp.every(digit => digit !== '')) {
            if (newOtp.join('') === '3112') {
                setTimeout(() => setIsAuthenticated(true), 300); // Small delay for effect
            } else {
                setAuthError(true);
                // Shake and Reset
                setTimeout(() => {
                    setOtp(['', '', '', '']);
                    setAuthError(false);
                    document.getElementById('otp-0').focus();
                }, 1000);
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const processData = (rawData) => {
        // Skip header row usually, dependent on script implementation
        // Let's assume script returns objects: { Timestamp, Location, Type... }
        // If script returns array of arrays, we need to map headers.

        // For now, I'll mock the processing logic anticipating the script update I'll give the user.
        // Assuming data is array of objects.

        const processed = rawData;

        const total = processed.length;
        const errors = processed.filter(i => i.Type === 'error').length;
        const suggestions = processed.filter(i => i.Type === 'suggestion').length;

        setStats({ total, errors, suggestions });
        setData(processed);
    };

    // Calculate charts data
    // 1. By Location
    const locationData = data.reduce((acc, curr) => {
        const loc = curr.Location || 'Unknown';
        const existing = acc.find(i => i.name === loc);
        if (existing) existing.count++;
        else acc.push({ name: loc, count: 1 });
        return acc;
    }, []);

    // 2. By Severity/Impact (Pie)
    const severityData = data.reduce((acc, curr) => {
        const sev = curr.Severity_Impact || 'Unspecified';
        const existing = acc.find(i => i.name === sev);
        if (existing) existing.value++;
        else acc.push({ name: sev, value: 1 });
        return acc;
    }, []);

    // --- RENDER AUTH SCREEN ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden font-mono">
                {/* Cybersecurity Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] [background-size:20px_20px]" />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="z-10 flex flex-col items-center gap-8 p-12 bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl relative"
                >
                    {/* Glowing Lock Icon */}
                    <div className={`p-4 rounded-full bg-black/50 border-2 ${authError ? 'border-red-500 animate-pulse' : 'border-[#f26419]'}`}>
                        <div className="text-4xl">🔒</div>
                    </div>

                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 uppercase">
                            Restricted Access
                        </h1>
                        <p className="text-xs text-[#f26419] tracking-widest uppercase">
                            Security Clearance Level 4 Required
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {otp.map((digit, i) => (
                            <motion.input
                                key={i}
                                id={`otp-${i}`}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                animate={authError ? { x: [-10, 10, -10, 10, 0], borderColor: '#ef4444' } : {}}
                                className="w-14 h-16 bg-black/60 border border-white/20 rounded-lg text-center text-3xl font-bold focus:border-[#f26419] focus:outline-none focus:shadow-[0_0_20px_rgba(242,100,25,0.3)] transition-all text-white caretaker-transparent"
                            />
                        ))}
                    </div>

                    {authError && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 font-bold text-xs tracking-widest absolute -bottom-8"
                        >
                            ⛔ ACCESS DENIED: INVALID PROTOCOL
                        </motion.p>
                    )}
                </motion.div>
            </div>
        );
    }

    if (loading) return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center font-mono gap-4">
            <div className="w-10 h-10 border-4 border-[#f26419] border-t-transparent rounded-full animate-spin"></div>
            <div className="text-[#f26419] tracking-widest animate-pulse">DECRYPTING DATA STREAM...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-8 font-mono">
            <div className="flex justify-between items-end border-b border-gray-800 pb-4 mb-8">
                <h1 className="text-4xl text-[#f26419] font-bold uppercase tracking-widest">
                    Command Dashboard
                </h1>
                <div className="text-xs text-gray-500 text-right">
                    SECURE CONNECTION ESTABLISHED<br />
                    ID: ADARSH-ADMIN-01
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card title="Total Signals" value={stats.total} color="bg-blue-500/10 border-blue-500" />
                <Card title="Errors Reports" value={stats.errors} color="bg-red-500/10 border-red-500" />
                <Card title="Suggestions" value={stats.suggestions} color="bg-green-500/10 border-green-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Bar Chart: Locations */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl mb-6 text-gray-400">Signal Origins</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={locationData}>
                                <XAxis dataKey="name" stroke="#606060" fontSize={10} interval={0} angle={-45} textAnchor="end" height={80} />
                                <YAxis stroke="#606060" />
                                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                                <Bar dataKey="count" fill="#f26419" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart: Impact */}
                <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl mb-6 text-gray-400">Impact Analysis</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={severityData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {severityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Raw Feed */}
            <div className="mt-12">
                <h3 className="text-xl mb-6 text-gray-400">Incoming Feed</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-400">
                        <thead className="bg-white/5 uppercase text-xs">
                            <tr>
                                <th className="p-4 rounded-tl-lg">Type</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Sever/Impact</th>
                                <th className="p-4">Description</th>
                                <th className="p-4 rounded-tr-lg">Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.slice().reverse().map((row, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${row.Type === 'error' ? 'bg-red-500/20 text-red-500' :
                                            row.Type === 'suggestion' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-blue-500/20 text-blue-500'
                                            }`}>
                                            {row.Type}
                                        </span>
                                    </td>
                                    <td className="p-4">{row.Location}</td>
                                    <td className="p-4">{row.Severity_Impact}</td>
                                    <td className="p-4 max-w-xs truncate" title={row.Description}>{row.Description}</td>
                                    <td className="p-4">{row.Contact}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const Card = ({ title, value, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl border ${color} bg-opacity-10 backdrop-blur-sm`}
    >
        <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{title}</h4>
        <div className="text-4xl font-bold text-white">{value}</div>
    </motion.div>
);

export default SecretDashboard;
