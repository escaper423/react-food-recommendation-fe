import Embed from '@editorjs/embed'
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'
import Marker from '@editorjs/marker'
import List from '@editorjs/list'
import SimpleImage from '@editorjs/simple-image'

export const categoryContents = [
    "모두","일반","공지","의견","질문"
];

export const categoryId = [
    "all","general","notice","feedback","question"
]

export const sortOrder = [
    "최근 글 우선","조회수","추천수",
]

export const sortId = [
    "recent", "views", "commends"
]

export const searchOption = [
    "title","writer"
]

export const PORT = 3002
export const baseURL = `http://localhost:${PORT}`

export const EDITOR_JS_TOOLS = {
    embed: Embed,
    paragraph: Paragraph,
    marker: Marker,
    header: Header,
    list: List,
    image: SimpleImage,
}
  