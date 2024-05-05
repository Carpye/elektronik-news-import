import axios from "axios"
import mysql from "mysql"
import { NodeHtmlMarkdown } from "node-html-markdown"

const conn = mysql.createConnection({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  database: process.env.NAME,
  user: process.env.USER,
  password: process.env.PASSWORD,
})

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

conn.query("SELECT * FROM zseis_news order by cdate", async (_, result) => {
  result.forEach(async (element: any, index: number) => {
    await convert(element)
    console.log(
      Math.floor(((index + 1) / result.length) * 100) +
        "% Done" +
        ` - ${index + 1}/${result.length}`
    )
    await wait(parseInt(process.env.INTERVAL ?? "100"))
  })

  // const n = result.length
  // for (let index = 0; index < n; index++) {
  //   await convert(result[index])
  //   console.log(
  //     Math.floor(((index + 1) / n) * 100) + "% Done" + ` - ${index + 1}/${n}`
  //   )
  //   await wait(100)
  // }
})

conn.end()

async function convert(item: any) {
  put(item.title, NodeHtmlMarkdown.translate(item.headtext), item.cdate)
}

function put(title: string, content: string, date: string) {
  axios.post(
    "https://api.thefinalpath.net/api/articles",
    {
      data: {
        title: title,
        content: content,
        description: content,
        custom_date: date,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    }
  )
}
