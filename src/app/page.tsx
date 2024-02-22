import axios from 'axios';

const fetchFromNotion = async () => {
  const res = await axios.get('http://localhost:3000/api/notion')
  
  return res.data
}

export default async function Home() {  
  const rows = await fetchFromNotion()
  
  return (
    <div className="h-screen">
      {
        rows.map((item: any, index: any) => (
          <div className="p-10">
            <h1 className=" p-3" key={index}>{item.Name.title[0].plain_text}</h1>
            <span key={index} className="p-3">英文團名: {item.first_name.rich_text[0].plain_text}</span>
            <span key={index}><a href={item.link_to_yt.url} className="text-red-500">Youtube</a></span>
          </div>
        ))
      }
    </div>
  );
}
