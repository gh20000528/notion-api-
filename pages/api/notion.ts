import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse} from 'next';

const notionSecret =process.env. NOTION_TOKEN
const notionDatabaseID = process.env.NOTION_DATABASE_ID

const notion = new Client({ auth: notionSecret })

type Row = {
    first_name: { id: string, rich_test: { text:{ content: string } }[] }
    link_to_yt: { id: string, url: string }
    name: { id: string, title: { text: { content: string } }[] }
}

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    if (!notionSecret || !notionDatabaseID) throw new Error('Missing notion seret or DB_ID.')

    const query = await notion.databases.query({
        database_id: notionDatabaseID,
    })
    
    // @ts-ignore
    const rows = query.results.map((res) => res.properties) as Row[]

    // console.log('rows',rows);

    res.status(200).json(rows)
}
