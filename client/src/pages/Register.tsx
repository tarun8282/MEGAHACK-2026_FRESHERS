import React from 'react';

const Register: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Join NagarSetu</h2>
                    <p className="text-slate-500 dark:text-slate-400">Be the bridge to a better city</p>
                </div>
                {/* Registration flow will be implemented here */}
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl text-indigo-700 dark:text-indigo-400 text-sm">
                    Registration flow implementation pending (OTP-based signup for Citizens)
                </div>
            </div>
        </div>
    );
};

export default Register;
