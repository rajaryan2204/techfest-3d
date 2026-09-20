import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface LoginGateProps {
    title?: string;
    message?: string;
    redirectTo?: string;
}

const LoginGate = ({ title = "Login Required", message, redirectTo }: LoginGateProps) => {
    const router = useRouter();
    const returnUrl = redirectTo || router.asPath;
    const loginUrl = `/auth/login?url=${encodeURIComponent(returnUrl)}`;

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-r from-[#000] via-[#05281D] to-[#000] px-6 text-center'>
            <Link href='/' className='cursor-pointer'>
                <Image src='/logo/techfest.webp' alt='logo' width={200} height={80} className='md:w-96 w-48' />
            </Link>
            <div className='flex flex-col items-center gap-3 max-w-xl'>
                <h1 className='md:text-4xl text-2xl font-bold tracking-wide text-white'>{title}</h1>
                <p className='text-lg text-[#f1f1f1]'>
                    {message || "Please login to access this page."}
                </p>
                <p className='text-sm text-gray-400'>Login or create an account to continue.</p>
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
                <Link href={loginUrl} className='rounded-full bg-[#0CC7F8] hover:bg-white text-white hover:text-[#0CC7F8] px-8 py-3 font-medium transition-all cursor-pointer'>
                    Login / Register
                </Link>
                <Link href='/' className='rounded-full bg-transparent border border-white/40 hover:border-white text-white px-8 py-3 font-medium transition-all cursor-pointer'>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default LoginGate;
