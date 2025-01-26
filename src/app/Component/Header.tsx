import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logoimg from '@/app/assets/header/Logo_image.png';
import searchlogo from '@/app/assets/header/search-normal.png';
import filter from '@/app/assets/header/filter.png';
import heart from '@/app/assets/header/heart.png';
import { SignedIn, SignedOut , SignInButton, UserButton} from '@clerk/nextjs'


const Header =  () => {
  return (
    <>
    {/* Main div for Header in which logo and link pic search bar will shown*/}
    <div>

        {/* top div for label and  logo along with input bar for the medium to larger screens*/}
        <div className='flex justify-between items-center mx-[25px] my-[32px]'>
        
        {/* title and input bar div */}
            <div className='flex md:w-[60%] justify-between'>
                <div className='w-fit'>
                    <h1 className='text-[#3563E9] font-[PlusJakartaSans] font-bold text-[24px] uppercase'><Link href={"/"}>Morent</Link></h1>
                </div>

                <div className='hidden sm:block'>  
                    <div className='flex items-center px-3 py-1 space-x-3 border border-[#C3D4E9] rounded-2xl'>
                        <Image src={searchlogo} alt='loading' width={20} height={20} className='cursor-pointer' />
                        <input type="text" placeholder='Search something here' className='outline-none bg-transparent placeholder:text-[#596780]'/>
                        <Link href={"/category"}><Image src={filter} alt='loading' width={25} height={25} className='cursor-pointer'/></Link>
                    </div>
                </div>
            </div>    

            {/* all nav links div */}
            <div className='w-fit flex items-center gap-2'>
                <div className=''>
                <Link href={"/mywishlist"}> <Image src={heart} alt='loading' width={35} height={35} /></Link>
                </div>

                <div>
                    <SignedOut>
                        <SignInButton> 
                            <div className='border-2 border-black flex items-center justify-center bg-white rounded-full p-1'>
                                <Image src={logoimg} alt='loading' width={18} height={18} className='cursor-not-allowed' />
                            </div>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn >
                        <div className='border-2 border-black rounded-full flex items-center justify-center'>
                            <UserButton />
                        </div>
                    </SignedIn>
                </div>

            </div>

        </div>

        {/* For smaller screen div in which input bar and filter button is present */}
        <div className='block sm:hidden'>
            <div className='mx-[25px] my-[32px] flex justify-between'>

                <div className='flex px-4 py-3 space-x-3 w-[80%] drop-shadow-lg border border-[#C3D4E9] rounded-2xl'>
                    <Image src={searchlogo} alt='loading' width={30} height={30} className='cursor-pointer' />
                    <input type="text" placeholder='Search something here' className='outline-none bg-transparent placeholder:text-[#596780]'/>
                </div>

                <div className='flex items-center justify-center w-[15%] border border-[#C3D4E9] rounded-xl'>
                    <Link href={"/category"}><Image src={filter} alt='loading' width={25} height={25} className='cursor-pointer'/></Link>
                </div>
            </div>
        </div>
        
    </div>
    </>
  )
}

export default Header