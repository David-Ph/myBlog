var quill = new Quill("#editor-container", {
  theme: "bubble", // or 'bubble'
});

window.addEventListener("load", async () => {
  const href = window.location.href.split("/")[4];
  const post = await fetch(`http://localhost:3000/posts/getdata/${href}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log(error));

  const delta = JSON.parse(post.data.content);

  quill.enable(false);
  quill.setContents(delta);

  // delete btn handler
  const deleteBtn = document.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", async () => {
    const response = await fetch(
      `http://localhost:3000/posts/${post.data._id}`,
      {
        method: "DELETE",
      }
    ).then((response) => window.location.replace("/posts"));
  });
});
