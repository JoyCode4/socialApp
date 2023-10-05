const nodemailer = require("nodemailer");
const inquirer = require('inquirer');




async function sendMail(){
    const questions = [
        {
          type: 'input',
          name: 'name',
          message: "Enter Mail ID ?",
        },
      ];
      
      let mailid = "";
      await inquirer.prompt(questions).then(answers => {
          mailid=answers.name;
        console.log(`Hi ${answers.name}!`);
      });
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"codingninjas2k16@gmail.com",
            pass:"slwvvlczduktvhdj",
            // pass:"fuidznkchlxrwpup"
        },
    })

    const mailOptions = {
        from:"joywadhonkar4@gmail.com",
        to:mailid,
        subject:"Hello World",
        text:"This message is send by using nodemailer.js package"
    };

    try{
        const result =  await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    }catch(err){
        console.log("Error : "+err);
    }

}

sendMail();


