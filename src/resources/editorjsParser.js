import _ from 'lodash'

const editorjsParser = (data) => {
    let resultHTML = "";

    if (data) {
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
                    startTag = `<img src=${item.data.url} ${item.data.stretched ? 'width="100%"' : ""} loading="lazy"/>`
                    endTag = ''
                    caption = '';
                    break;
                case "list":
                    startTag = item.data.style === "unordered" ? '<ul>' : '<ol>'
                    endTag = startTag === '<ul>' ? '</ul>' : '</ol>'
                    for (let i = 0; i < item.data.items.length; i++) {
                        content += `<li>${item.data.items[i]}</li>`;
                    }
                    break;
                default:
                    break;
            }

            resultHTML += startTag + content + caption + endTag
        });

        return resultHTML;
    }

    else return "";

}

export default editorjsParser
