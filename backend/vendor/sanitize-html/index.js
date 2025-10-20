const { JSDOM } = require('jsdom');

const DEFAULT_ALLOWED_TAGS = ['span', 'br'];
const DEFAULT_ALLOWED_ATTRIBUTES = { span: ['class'] };

function sanitizeHtml(html, options = {}) {
    if (typeof html !== 'string') {
        return '';
    }

    const allowedTags = Array.isArray(options.allowedTags) && options.allowedTags.length
        ? options.allowedTags.map((tag) => String(tag).toLowerCase())
        : DEFAULT_ALLOWED_TAGS;
    const allowedAttributes = options.allowedAttributes || DEFAULT_ALLOWED_ATTRIBUTES;

    const dom = new JSDOM('<!DOCTYPE html><body></body>');
    const { document, Node } = dom.window;
    const container = document.createElement('div');
    container.innerHTML = html;

    const cleanse = (node) => {
        let child = node.firstChild;
        while (child) {
            const next = child.nextSibling;
            if (child.nodeType === Node.ELEMENT_NODE) {
                const tagName = child.tagName.toLowerCase();
                if (!allowedTags.includes(tagName)) {
                    while (child.firstChild) {
                        node.insertBefore(child.firstChild, child);
                    }
                    node.removeChild(child);
                } else {
                    const permittedAttrs = allowedAttributes[tagName] || [];
                    for (const attr of Array.from(child.attributes)) {
                        const name = attr.name.toLowerCase();
                        const value = attr.value || '';
                        if (!permittedAttrs.includes(name) || /^on/i.test(name) || /javascript:/i.test(value)) {
                            child.removeAttribute(attr.name);
                        }
                    }
                    cleanse(child);
                }
            } else if (child.nodeType === Node.COMMENT_NODE) {
                node.removeChild(child);
            }
            child = next;
        }
    };

    cleanse(container);
    return container.innerHTML;
}

sanitizeHtml.defaults = {
    allowedTags: DEFAULT_ALLOWED_TAGS,
    allowedAttributes: DEFAULT_ALLOWED_ATTRIBUTES
};

module.exports = sanitizeHtml;
