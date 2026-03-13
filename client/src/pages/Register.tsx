import React from 'react';

const Register: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-deva">Join NagarSetu</h2>
                    <p className="text-slate-500 dark:text-slate-400">Be the bridge to a better city</p>
                </div>
                {/* Registration flow will be implemented here */}
                <div className="p-4 bg-navy-blue-50 dark:bg-navy-blue-900/20 border border-navy-blue-200 dark:border-navy-blue-800 rounded-lg text-navy-blue-700 dark:text-navy-blue-400 text-sm">
                    Registration flow implementation pending (OTP-based signup for Citizens)
                </div>
            </div>
        </div>
    );
};

export default Register;
