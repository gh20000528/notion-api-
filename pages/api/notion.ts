import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse} from 'next';

const notionSecret = process.env.NOTION_TOKEN
const notionDatabaseID = process.env.NOTION_DATABASE_ID

const notion = new Client({ auth: notionSecret })


export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    if (!notionSecret || !notionDatabaseID) throw new Error('Missing notion seret or DB_ID.')

    const query = await notion.databases.query({
        database_id: notionDatabaseID,
    })

    const data = {}
    
    // @ts-ignore
    const rows = query.results.map((res) => res.properties) as Row[]



    const RowData = rows.map(row => ({
        "id": 1,
        "date": "0309",
        "title": row.title.title[0].text.content,
        "tags": row.Tags.multi_select.map((tag: any) => tag.name),
        "content": row.schedule.rich_text[0].text.content.split('\n'),
        "startTime": row.startTime.rich_text[0].text.content,
        "icon": row.icon.rich_text[0].text.content
    }));
    
    
    res.status(200).json({ RowData })
}
