class ChatEngine {
  constructor(chatBoxId, userEmail) {
    this.chatBoxId = $(`#${chatBoxId}`);
    this.userEmail = userEmail;

    this.socket = io.connect("https://socialapp-frri.onrender.com", {
      transports: ["websocket"],
    });

    if (this.userEmail) {
      this.connectionHandler();
    }
  }
  connectionHandler() {
    let self = this;

    this.socket.on("connect", function () {
      console.log("Connection is established with sockets...!");

      self.socket.emit("join_room", {
        user_email: self.userEmail,
        chatRoom: "socialApp",
      });

      self.socket.on("user_joined", function (data) {
        console.log("a user joined!", data);
      });
    });

    $("#send-message").click(function (e) {
      e.preventDefault();
      let msg = $("#chat-message-input").val();

      if (msg != "") {
        self.socket.emit("send_message", {
          message: msg,
          user_email: self.userEmail,
          chatRoom: "socialApp",
        });
      }
    });

    self.socket.on("receive_message", function (data) {
      console.log("message received", data.message);

      let newMessage = $("<div>");
      let newDiv = $("<div>");

      let messageType = "other-message";

      if (data.user_email == self.userEmail) {
        messageType = "media-chat-reverse self-message";
      }

      newDiv.append(`<p> ${data.message} </p>`);

      // newDiv.append(`<sub>${data.user_email}</sub>`);

      newDiv.addClass("media-body");
      newMessage.append(newDiv);
      newMessage.addClass(`media media-chat ${messageType}`);

      $("#user-chat-box").append(newMessage);
    });
  }
}
