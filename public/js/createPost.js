var quill = new Quill("#editor-container", {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ color: [] }, { background: [] }],
      ["image", "code-block"],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      [{ align: [] }],
    ],
  },
  placeholder: "Compose an epic...",
  theme: "snow", // or 'bubble'
});

var form = document.querySelector("form");
form.onsubmit = function () {
  // Populate hidden form on submit
  var content = document.querySelector("input[name=content]");
  content.value = JSON.stringify(quill.getContents());
};
