import { connect } from "mongoose";
import dotenv from 'dotenv'

dotenv.config();


const BD = process.env.BD;

const toConnectToBd = async ()=>{
    try{
        await connect(BD)
        console.log(`The BD is up and connect`)
    }catch(e){
        console.log(`The BD had issues`,e)
    }
}

export default toConnectToBd;