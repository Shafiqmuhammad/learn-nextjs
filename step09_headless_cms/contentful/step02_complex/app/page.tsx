import Image from 'next/image'
import { Inter } from 'next/font/google'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const inter = Inter({ subsets: ['latin'] })

async function getBlogs() {
  const res = await fetch(`https://cdn.contentful.com/spaces/z5hnl8szj944/environments/master/entries/5CO5SdvqL8L3rSmHzGoRCg?access_token=cOcH4xur71tGCOtOs2K3EsqNNrN4fOAAHjrhglAa2qk`, { cache: 'no-store' });
  
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();
  return (
    <div>
      {
        blogs.items.map((item: any) => (
          <>
            <div>{item.fields.name}</div>
            <div>{documentToReactComponents(item.fields.description)}</div>
            <div>{blogs.includes.Asset.map((a: any) => (
              <div>
                {item.fields.picture.sys.id == a.sys.id? 
                <Image src={"https:" + a.fields.file.url} alt="" width="100" height="100"/>: <div></div>}
              </div>
            ))}
            </div>
            <div>{blogs.includes.Entry.map((entry: any) => (
              <div>
                {item.fields.creator.sys.id == entry.sys.id? 
                <div>Author: {entry.fields.name}</div>: <div></div>}
              </div>
            ))}
            </div>
            <br/>
            <br/>
            <br/>
          </>
      ))}
    </div>
  )
}
