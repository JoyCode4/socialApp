{
  // method to submit the form data for new post using AJAX
  let createPost = () => {
    let newPostForm = $("#new-post-form");

    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "/posts/create",
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          console.log(newPost);
          $("#posts-list").prepend(newPost);
          deletePost(" .delete-post-button", newPost);
        },
        error: function (error) {
          console.log(error.responseText);
        },
      });
    });
  };

  //   method to create a post in DOM
  let newPostDom = (post) => {
    return $(`
    <li id="post-${post._id}">
    <div class="upper">
        <p>
            ${post.content}
        </p>

            <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fa-solid fa-trash"></i></a>
   
    </div>
    <p>Post By : ${post.user.name}
            </str>
            <div class="comment-list">
                <h4 class="comment-header">Comments : </h4>
                
            </div>
            <form action="/comments/create" method="POST">
                <div class="add-comment">
                    <input type="text" name="content" placeholder="comment here">
                    <input type="hidden" name="post" value="<%= post._id %>">
                    <button id="input-comment">Send Comment</button>
                </div>
            </form>
</li>
    `);
  };

  //   method to delete a post from the DOM

  let deletePost = (deleteLink) => {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "GET",
        url: $(deleteLink).prop("href"),
        success: (data) => {
          $(`#post-${data.data.post_id}`).remove();
        },
        error: (error) => {
          console.log(error.responseText);
        },
      });
    });
  };
  createPost();
}
