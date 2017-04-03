"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax = require("sax");
const state_1 = require("./state");
const parse_close_tag_1 = require("./parse-close-tag");
const parse_open_tag_1 = require("./parse-open-tag");
const parse_text_1 = require("./parse-text");
const html_1 = require("./tags/html");
exports.HtmlTag = html_1.default;
const jsx_1 = require("./tags/jsx");
exports.JsxTag = jsx_1.default;
const empty_1 = require("./tags/empty");
exports.EmptyTag = empty_1.default;
exports.default = (xmlString, settings = {}) => new Promise((resolve, reject) => {
    const state = new state_1.default(settings);
    const parser = sax.parser(true, {});
    parser.onopentag = parse_open_tag_1.default(state);
    parser.ontext = parse_text_1.default(state);
    parser.onclosetag = parse_close_tag_1.default(state);
    parser.onerror = (e) => reject(e);
    parser.onend = () => resolve(state);
    parser.write(xmlString).close();
});
