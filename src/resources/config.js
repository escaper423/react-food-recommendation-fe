import Embed from '@editorjs/embed'
import Paragraph from '@editorjs/paragraph'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import List from '@editorjs/list'

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
    "제목","글쓴이"
]

export const baseURL = "http://localhost:3001"

export const EDITOR_JS_TOOLS = {
    embed: Embed,
    paragraph: Paragraph,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: Image,
    raw: Raw,
    header: Header,
    list: List,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
    simpleImage: SimpleImage
}
  