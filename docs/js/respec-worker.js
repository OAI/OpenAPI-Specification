// ReSpec Worker v0.1.1
"use strict";
try {
  importScripts("https://www.w3.org/Tools/respec/respec-highlight.js");
  hljs.configure({
    tabReplace: "  ", // 2 spaces
    languages: ["abnf", "css", "http", "javascript", "json", "markdown", "xml"],
  });
} catch (err) {
  console.error("Network error loading/configuring highlighter", err);
}

self.addEventListener("message", ({ data: originalData }) => {
  const data = Object.assign({}, originalData);
  switch (data.action) {
    case "highlight":
      const { code } = data;
      const langs = data.languages.length ? data.languages : undefined;
      try {
        const { value, language } = self.hljs.highlightAuto(code, langs);
        Object.assign(data, { value, language });
      } catch (err) {
        console.error("Could not transform some code?", err);
        // Post back the original code
        Object.assign(data, { value: code, language: "" });
      }
  }
  self.postMessage(data);
});
