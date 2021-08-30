import _ from 'lodash'

const editorjsParser = (data) => {
    let resultHTML = "";

    _.map(data.blocks, (item) => {
        let startTag = "";
        let content = "";
        let endTag = "";
        let caption = "";

        switch (item.type) {
            case "paragraph":
                startTag = '<p>'
                endTag = '</p>'
                content = item.data.text;
                break;
            case "embed":
                startTag = `<figure><embed src= ${item.data.embed} width=${item.data.width} height=${item.data.height}>`
                endTag = '</embed></figure>'
                caption = `<figcaption>${item.data.caption}</figcaption>`
                break;
            case "header":
                startTag = `<h${item.data.level}>`
                endTag = `</h${item.data.level}>`
                content = item.data.text;
                break;
            case "image":
                startTag = `<img src=${item.data.file.url} >`
                endTag = '</img>'
                caption = item.data.caption;
                break;
            case "list":
                startTag = item.data.style === "unordered"?'<ul>':'<ol>'
                endTag = startTag === '<ul>'?'</ul>':'</ol>'
                content = _.map(item.data.items, (listItem) => {
                    return (`<li>${listItem}</li>`)
                }) 
                break;
            default:
                break;
        }

        resultHTML += startTag + content + caption + endTag
    });

    return resultHTML;
}

export default editorjsParser
