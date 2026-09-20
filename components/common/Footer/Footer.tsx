import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FooterCircuitTraces from './FooterCircuitTraces';

import './footer.css'

const Footer = () => {
    return (
        <div className='w-full flex flex-col md:h-screen h-auto items-center justify-center pt-20 relative bg-[#000D1A] text-white Candara overflow-hidden'>
            {/* Aggressive Cyber Circuit Traces Background */}
            <FooterCircuitTraces />

            <div className='w-11/12 flex md:flex-row flex-col gap-24 h-full relative z-10'>

                <div className='w-full h-full justify-center flex flex-col gap-16'>

                    <div className='w-full grid md:grid-cols-3 grid-cols-2 gap-10'>
                        <div className='flex flex-col gap-2 w-full h-full'>
                            <div>Explore</div>
                            <div className='flex flex-col h-full md:text-2xl text-base px-4 gap-2 border-l-2 border-[#433e38]'>
                                <Link href='/auth/register' className='italic hover:underline cursor-pointer'>
                                    Register
                                </Link>
                                <Link href='/about-us' className='italic hover:underline cursor-pointer'>
                                    About Us
                                </Link>
                                <Link href='/events' className='italic hover:underline cursor-pointer'>
                                    Events
                                </Link>
                                <Link href='/workshop' className='italic hover:underline cursor-pointer'>
                                    Workshops
                                </Link>
                                <Link href='/teams' className='italic hover:underline cursor-pointer'>
                                    Our Team
                                </Link>
                                <Link href='#' className='italic hover:underline cursor-pointer'>
                                    Prefest Events
                                </Link>
                                <Link href='/gallery' className='italic hover:underline cursor-pointer'>
                                    Gallery
                                </Link>
                                <Link href='/sponsors' className='italic hover:underline cursor-pointer'>
                                    Sponsors
                                </Link>
                                <Link href='/terms' className='italic hover:underline cursor-pointer'>
                                    Terms of Service
                                </Link>
                                <Link href='/privacy-policy' className='italic hover:underline cursor-pointer'>
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full h-full'>
                            <div>Socials</div>
                            <div className='flex flex-col h-full md:text-2xl text-base px-4 gap-2 border-l-2 border-[#433e38]'>
                                <Link href='#' target='_blank' className='italic hover:underline cursor-pointer'>
                                    Instagram
                                </Link>
                                <Link href='#' target='_blank' className='italic hover:underline cursor-pointer'>
                                    LinkedIn
                                </Link>
                                <Link href='#' target='_blank' className='italic hover:underline cursor-pointer'>
                                    Youtube
                                </Link>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full h-full'>
                            <div>Reach Us</div>
                            <div className='flex flex-col h-full md:text-2xl text-base px-4 gap-2 border-l-2 border-[#433e38]'>
                                <div className='italic'>
                                    <span className='hover:underline cursor-pointer'>+91 78568-93952</span><br />
                                    <span className='hover:underline cursor-pointer'>Naman kumar sinha</span>
                                </div>
                                <div className='italic'>
                                    <span className='hover:underline cursor-pointer'>+91 97711-74465</span><br />
                                    <span className='hover:underline cursor-pointer'>Shubham kumar singh</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-auto flex md:flex-row flex-col items-center justify-center md:gap-4 gap-1'>
                        <Image src='/events/header/sliet.svg' alt='mini robot' width={400} height={400} className='h-28 w-auto' />
                        <Image src='/logo/techfest-text.svg' alt='mini robot' width={400} height={400} className='h-28 w-auto' />
                    </div>
                </div>
                <Image src='/header/footer.svg' alt='' width={400} height={400} className='h-full w-auto hidden md:block' />
            </div>
        </div>
    )
}

export default Footer