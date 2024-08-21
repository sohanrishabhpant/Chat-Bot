import {connect,disconnect} from 'mongoose'
async function connecttodb(){
    try{
        await connect(process.env.MONGODB_URL)
    }
    catch(error){
        console.log(error)
        console.log(1)
        throw new Error("Cannot Connect to mongodb")
    }
}
async function disconnecttodb(){
    try{
        await disconnect()
    }
    catch(error){
        console.log(error)
        throw new Error("Could not Disconnect from Mongodb")
    }
}
export {connecttodb,disconnecttodb}