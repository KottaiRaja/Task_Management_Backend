const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const sendTaskCreationEmail = (task) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: task.email,
    subject: `New Task Created: ${task.title}`,
    html: `
      <h1>New Task Assigned to You</h1>
      <p>Hi there,</p>
      <p>A new task titled "<strong>${task.title}</strong>" has been created and assigned to you.</p>
      <p><strong>Description:</strong> ${task.description || 'No description provided.'}</p>
      <p><strong>Due Date:</strong> ${new Date(task.due_date).toLocaleDateString()}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <p>Thank you!</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending creation email:', error);
    }
    console.log('Creation email sent: ' + info.response);
  });
};


const sendTaskUpdateEmail = (task) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: task.email,
    subject: `Task Updated: ${task.title}`,
    html: `
      <h1>A Task Assigned to You Has Been Updated</h1>
      <p>Hi there,</p>
      <p>The task titled "<strong>${task.title}</strong>" has been updated.</p>
      <p><strong>New Status:</strong> ${task.status}</p>
      <p><strong>New Due Date:</strong> ${new Date(task.due_date).toLocaleDateString()}</p>
      <p>Please review the changes in the TaskMaster app.</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending update email:', error);
    }
    console.log('Update email sent: ' + info.response);
  });
};


const sendReminderEmail = (task) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: task.email,
        subject: `Reminder: Task "${task.title}" is due tomorrow`,
        html: `
            <h1>Task Reminder</h1>
            <p>Hi there,</p>
            <p>This is a friendly reminder that the task "<strong>${task.title}</strong>" is due tomorrow, <strong>${new Date(task.due_date).toLocaleDateString()}</strong>.</p>
            <p>Thank you!</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(`Error sending reminder for task ${task.id}:`, error);
        }
        console.log(`Reminder sent for task ${task.id}: ` + info.response);
    });
};

module.exports = {
  sendTaskCreationEmail,
  sendTaskUpdateEmail,
  sendReminderEmail,
};