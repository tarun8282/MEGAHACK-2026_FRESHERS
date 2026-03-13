import React from 'react';

const Login: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-deva">Welcome back</h2>
                    <p className="text-slate-500 dark:text-slate-400">Log in to track your complaints</p>
                </div>
                {/* Auth flow will be implemented here */}
                <div className="p-4 bg-saffron-50 dark:bg-saffron-900/20 border border-saffron-200 dark:border-saffron-800 rounded-lg text-saffron-700 dark:text-saffron-400 text-sm">
                    Auth flow implementation pending (OTP for Citizens, Password for Officers/Admins)
                </div>
            </div>
        </div>
    );
};

export default Login;
