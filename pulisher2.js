const amqp = require("amqplib")

const message = {
    description : "bu bir test mesajıdır. tşk"
};

connect_rabbitmq();

async function connect_rabbitmq() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672");
        const channel    = await connection.createChannel();
        const assertion  = await channel.assertQueue("jobsQueue");
        setInterval(() => {
            message.description = new Date().getTime()
            channel.sendToQueue("jobsQueue", Buffer.from(JSON.stringify(message)));
            console.log("Mesaj", message);
        }, 1000);

    } catch (e) {
        console.log("Error", Error);
    }
}
