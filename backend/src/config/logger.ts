import { createLogger, format,transport, transports } from "winston";
const logger =createLogger({
    level:'info',
    format:format.combine(
        format.timestamp(),
        format.printf(({timestamp, level, message})=>{
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports :[
        new transports.Console(),
        new transports.File({filename:'app.log'}),
        new transports.File({
            filename: 'src/logs/combined.log'
        }),
    
        new transports.File({ filename:'src/logs/error.log' , level:'error'})
    ]
});
export default logger