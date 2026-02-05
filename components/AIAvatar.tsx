import React from 'react';

interface AIAvatarProps {
    size?: number;
    className?: string;
}

const AIAvatar: React.FC<AIAvatarProps> = ({ size = 256, className = '' }) => {
    return (
        <div
            className={`relative ${className}`}
            style={{ width: size, height: size }}
        >
            {/* Outer glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-500 to-cyan-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>

            {/* Main container */}
            <div className="relative w-full h-full bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 rounded-2xl border border-primary/30 overflow-hidden">

                {/* Circuit pattern background */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                    <defs>
                        <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M10 0 L10 8 M0 10 L8 10 M12 10 L20 10 M10 12 L10 20" stroke="#3b82f6" strokeWidth="0.5" fill="none" />
                            <circle cx="10" cy="10" r="1.5" fill="#3b82f6" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#circuit)" />
                </svg>

                {/* Animated rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-3/4 h-3/4 border border-primary/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                    <div className="absolute w-1/2 h-1/2 border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                </div>

                {/* AI Face */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        {/* Head */}
                        <div className="w-32 h-36 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-t-[50%] rounded-b-[30%] relative shadow-lg">

                            {/* Face plate */}
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-20 bg-gradient-to-b from-navy-800 to-navy-900 rounded-xl border border-primary/30">

                                {/* Eyes */}
                                <div className="flex justify-center gap-4 pt-4">
                                    <div className="relative">
                                        <div className="w-6 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
                                        <div className="absolute inset-0 w-6 h-4 bg-white rounded-full opacity-30 blur-sm"></div>
                                    </div>
                                    <div className="relative">
                                        <div className="w-6 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
                                        <div className="absolute inset-0 w-6 h-4 bg-white rounded-full opacity-30 blur-sm"></div>
                                    </div>
                                </div>

                                {/* Mouth/Speaker */}
                                <div className="mt-3 mx-auto w-12 h-3 flex gap-0.5 justify-center">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-1.5 bg-primary rounded-full animate-pulse"
                                            style={{
                                                height: `${8 + Math.random() * 8}px`,
                                                animationDelay: `${i * 0.1}s`
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>

                            {/* Antenna */}
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-8 bg-gradient-to-t from-slate-400 to-slate-300 rounded-full">
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50 animate-ping"></div>
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full"></div>
                            </div>

                            {/* Side accents */}
                            <div className="absolute top-10 -left-1 w-2 h-8 bg-slate-400 rounded-full"></div>
                            <div className="absolute top-10 -right-1 w-2 h-8 bg-slate-400 rounded-full"></div>
                        </div>

                        {/* Neck */}
                        <div className="w-12 h-6 bg-gradient-to-b from-slate-500 to-slate-600 mx-auto rounded-b-lg relative">
                            <div className="absolute inset-x-2 top-1 h-1 bg-navy-800 rounded"></div>
                            <div className="absolute inset-x-2 top-3 h-1 bg-navy-800 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
                            style={{
                                left: `${15 + i * 15}%`,
                                top: `${20 + (i % 3) * 25}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + i * 0.5}s`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Corner accents */}
                <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-lg"></div>
                <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-primary/50 rounded-tr-lg"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-primary/50 rounded-bl-lg"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-primary/50 rounded-br-lg"></div>
            </div>
        </div>
    );
};

export default AIAvatar;
