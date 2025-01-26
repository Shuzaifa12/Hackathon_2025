import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import fuel from '@/app/assets/section2/fuel.png';
import stering from '@/app/assets/section2/Stering wheel.png';
import user from '@/app/assets/section2/profile.png';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const page = async () => {

    const query1 = `*[_type == "Popularcar" ]`;
    const popularcars = await client.fetch(query1)

    // Remove duplicate categories
    const PopularCategories = popularcars.filter((item : any, index : any, self : any) =>
    index === self.findIndex((t:any) => (t.type && t.seatingCapacity) === (item.type && item.seatingCapacity))
  );

    const query2 = `*[_type == "RecommendedCar" ]`;
    const recommendedcars = await client.fetch(query2)

    // Remove duplicate categories
    const RecommendedCategories = recommendedcars.filter((item : any, index : any, self : any) =>
        index === self.findIndex((t:any) => t.seatingCapacity === item.seatingCapacity)
      );
      
  return (

<div className='flex'>
{/* Parent div for category page in which side bar with features and images are present */}

    {/* this div is for sidebar */}
    <div className='w-[20%] p-4 hidden md:block'>

        <div>
            <h1 className='text-[rgba(144,163,191,100%)] text-[12px] font-semibold'>TYPE</h1>

            <ul className='my-4 space-y-3'>
                
                {PopularCategories.map((list:any , index:number)=>(
                    <div key={index}>
                    <li  className='flex gap-3'>
                        <input type="checkbox" />
                        <h1 className='text-[rgba(89,103,128,100%)] font-semibold'>{list.type}</h1>
                    </li>
                    </div>
                ))}

                {RecommendedCategories.map((list:any , index:number)=>(
                    <li key={index} className='flex gap-3'>
                        <input type="checkbox" />
                        <h1 className='text-[rgba(89,103,128,100%)] font-semibold'>
                        {list.type}
                        </h1>
                    </li>
                ))}

            </ul>
        </div>

        <div className='mt-4'>
            <h1 className='text-[rgba(144,163,191,100%)] text-[12px] font-semibold'>Capacity</h1>
            
            <ul className='my-4 space-y-3'>
                
                {PopularCategories.map((list:any , index:number)=>(
                    
                    <li key={index} className='flex gap-3'>
                        <input type="checkbox" />
                        <h1 className='text-[rgba(89,103,128,100%)] font-semibold'>{list.seatingCapacity}</h1>
                    </li>
                ))}

                {RecommendedCategories.map((list:any , index:number)=>(
                    <li key={index} className='flex gap-3'>
                        <input type="checkbox" />
                        <h1 className='text-[rgba(89,103,128,100%)] font-semibold'>
                        {list.seatingCapacity}
                        </h1>
                    </li>
                ))}

            </ul>
        </div>

    </div>
        
    {/* this div is for the categories */}
    <div className='w-[80%] p-4 bg-[#F6F7F9] mx-auto'> 
        {/* this is the div in which cars listing is present */}
        <div className='my-2 w-fit mx-auto sm:mx-0 sm:w-full justify-center gap-8 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between'>
            {popularcars.map((r:any , index:number)=>(

                <Link key={index} href={`detailcars/popularcars/${r._id}`}>

                    <div  className='bg-white rounded-lg w-fit p-3 shrink-0'>

                        <h1 className='font-semibold font-[PlusJakartaSans] text-[16px] text-[rgba(144,163,191,100%)]'>{r._type}</h1>

                        {/* this is for car name */}
                        <div className='flex justify-between'>
                            <div>
                                <h1 className='font-bold text-[rgba(26,32,44,100%)] text-[16px]'>{r.name}</h1>
                            </div>
                        </div>

                        {/* div for car category heading */}
                        <div>
                            <h1 className='text-[rgba(89,103,128,100%)] font-bold text-[14px]'>{r.type}</h1>
                        </div>

                        {/* div for car image */}
                        <div className=' flex justify-center my-10'>
                            <Image src={urlFor(r.image).url()} alt='loading' width={200} height={200}></Image>
                        </div>

                        {/* div for specifications */}
                        <div className='flex justify-between'>
                            <div className='flex gap-1 items-center'>
                                <Image src={fuel} alt='loading' width={20} height={20}></Image>
                                <h1>{r.fuelCapacity}</h1>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <Image src={stering} alt='loading' width={20} height={20}></Image>
                                <h1>{r.transmission}</h1>
                            </div>
                            <div className='flex gap-1 items-center'>
                                <Image src={user} alt='loading' width={20} height={20}></Image>
                                <h1>{r.seatingCapacity}</h1>
                            </div>
                        </div>

                        {/* div for pricing and button */}
                        <div className='flex justify-between items-center my-2'>
                            <div>
                                <h1 className='font-[PlusJakartaSans] font-bold text-[20px]'>{r.pricePerDay}<span className='text-[14px] text-[rgba(26,32,44,100%)]'>day</span></h1>
                            </div>
                            
                            <Link href={`billing/popularcars/${r._id}`}><button className='bg-[#3563E9] text-white rounded-md px-6 py-2'>Rent Now</button></Link>
                            
                        </div>
                        
                    </div>

                </Link>

            ))}
        </div>

        {/* this is the div in which cars listing is present */}
        <div className='my-2 w-fit mx-auto sm:mx-0 sm:w-full justify-center gap-8 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between'>

                {recommendedcars.map((r:any , index:number)=>(

                    <Link key={index} href={`detailcars/recommendedcars/${r._id}`}>

                        <div  className='bg-white rounded-lg w-fit p-3 shrink-0'>

                            <h1 className='font-semibold font-[PlusJakartaSans] text-[16px] text-[rgba(144,163,191,100%)]'>{r._type}</h1>

                            {/* this is for car name */}
                            <div className='flex justify-between'>
                                <div>
                                    <h1 className='font-bold text-[rgba(26,32,44,100%)] text-[16px]'>{r.name}</h1>
                                </div>
                            </div>

                            {/* div for car category heading */}
                            <div>
                                <h1 className='text-[rgba(89,103,128,100%)] font-bold text-[14px]'>{r.type}</h1>
                            </div>

                            {/* div for car image */}
                            <div className=' flex justify-center my-10'>
                                <Image src={urlFor(r.image).url()} alt='loading' width={200} height={200}></Image>
                            </div>

                            {/* div for specifications */}
                            <div className='flex justify-between'>
                                <div className='flex gap-1 items-center'>
                                    <Image src={fuel} alt='loading' width={20} height={20}></Image>
                                    <h1>{r.fuelCapacity}</h1>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <Image src={stering} alt='loading' width={20} height={20}></Image>
                                    <h1>{r.transmission}</h1>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <Image src={user} alt='loading' width={20} height={20}></Image>
                                    <h1>{r.seatingCapacity}</h1>
                                </div>
                            </div>

                            {/* div for pricing and button */}
                            <div className='flex justify-between items-center my-2'>
                                <div>
                                    <h1 className='font-[PlusJakartaSans] font-bold text-[20px]'>{r.pricePerDay}<span className='text-[14px] text-[rgba(26,32,44,100%)]'>day</span></h1>
                                </div>
                                
                                <Link href={`billing/recommendedcars/${r._id}`}><button className='bg-[#3563E9] text-white rounded-md px-6 py-2'>Rent Now</button></Link>
                                
                            </div>
                            
                        </div>

                    </Link>
                ))}  
        </div>
    </div>
</div>
)
}

export default page