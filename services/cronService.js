const cron = require('node-cron');
const pool = require('../config/db');
const { sendReminderEmail } = require('./emailService');

const checkDueDatesAndSendReminders = async () => {
  console.log('Running cron job: Checking for upcoming due dates...');
  try {

    const sql = "SELECT * FROM tasks WHERE due_date = CURDATE() + INTERVAL 1 DAY AND status = 'Pending'";
    
    const [tasksToRemind] = await pool.query(sql);

    if (tasksToRemind.length > 0) {
      console.log(`Found ${tasksToRemind.length} task(s) due tomorrow. Sending reminders...`);
      tasksToRemind.forEach(task => {
        sendReminderEmail(task);
      });
    } else {
      console.log('No tasks due tomorrow.');
    }
  } catch (error) {
    console.error('Error in cron job:', error);
  }
};

const startReminderService = () => {
  cron.schedule('0 8 * * *', checkDueDatesAndSendReminders, {
    scheduled: true,
    timezone: "Asia/Kolkata"
  });
  console.log('Cron job for due date reminders has been scheduled to run every day at 8:00 AM.');
};

module.exports = { startReminderService };