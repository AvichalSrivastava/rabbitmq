let amqp = require('amqplib/callback_api');
let rabbitmq_config={
        username: "guest",
        password: "guest",
        hostname: "0.0.0.0",
        port: 5672,
        protocol: 'amqp'
    };
module.exports = mqconnect=()=>
{
    amqp.connect(rabbitmq_config,(err,connection)=>
    {
        if(err)
        {   
            console.log("connection error ",err.message);
            throw err;
        }else
        {
            connection.createChannel((err,channel)=>
            {
                if(err)
                    throw err;
                else
                {
                    let data=
                    {
                        queue:"first_login",
                        message:"congrats!! 50% off"
                    }
                    channel.assertQueue(data.queue,{durable:false});
                    channel.sendToQueue(data.queue,Buffer.from(data.message));
                    console.log(data);
                    setTimeout(()=>
                    {
                        connection.close();
                    },1000);
                }
            })
        }
    })
}