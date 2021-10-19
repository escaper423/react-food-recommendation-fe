import Embed from '@editorjs/embed'
import Paragraph from '@editorjs/paragraph'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
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

export const searchOption = [
    "title","writer"
]

export const baseURL = "http://localhost:3001"

export const EDITOR_JS_TOOLS = {
    embed: Embed,
    paragraph: Paragraph,
    marker: Marker,
    header: Header,
    list: List,
    image: SimpleImage,
}
  