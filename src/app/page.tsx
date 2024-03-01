import axios from 'axios';
import Link from 'next/link';

const fetchFromNotion = async () => {
  const res = await axios.get('http://localhost:3001/api/notion')
  
  return res.data
}

export default async function Home() {  
  const rows = await fetchFromNotion()
  
  return (
    <div className="h-screen">
      <div className='flex w-3/4 m-auto py-10'>
        {
          rows.map((item: any, index: any) => (
            <div className="">
              <h1 className="" key={index}>{item.name}</h1>
              <span key={index} className="">英文名稱: {item.firstname}</span>
              <span key={index}><a href={item.youtubeUrl} className="text-red-500">Youtube</a></span>
            </div>
          ))
        }
      </div>
      <h1 className="title">
        <Link href="/post/first-page">this page!</Link>
      </h1>
    </div>
  );
}
