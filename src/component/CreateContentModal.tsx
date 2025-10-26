import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum contentType{
    Youtube = "Youtube",
    Twitter = "Twitter",
    Linkedin = "Linkedin"
}
export function CreateContentModal({open, onClose}: any){
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [type, setType] = useState(contentType.Youtube);
    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        },{
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
        onClose()
        window.location.reload();
        
    }
    return <div>
        {open && <div className=" w-screen h-screen bg-slate-500/50 fixed top-0 left-0 backdrop-blur-none flex justify-center items-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 rounded-md p-4">
                    <div className="flex justify-end">
                        <div onClick={onClose}>
                        <CrossIcon size="md"/>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Input ref={titleRef} placeholder={"Title"} type={"text"}/>
                        <Input ref={linkRef} placeholder={"Link"} type={"text"} />
                        
                    </div>
                    <div className="flex justify-center p-2 space-x-4 flex-1">
                        <Button  variant={type === contentType.Youtube ? "primary" : "secondary"} size={"sm"} text={"YouTube"} onClick={()=>{
                            setType(contentType.Youtube)
                        }} />
                        <Button variant={type === contentType.Twitter ? "primary" : "secondary"} size={"sm"} text={"Twitter"} onClick={()=>{
                            setType(contentType.Twitter)
                        }} />
                        <Button variant={type === contentType.Linkedin ? "primary" : "secondary"} size={"sm"} text={"Linkedin"} onClick={()=>{
                            setType(contentType.Linkedin)
                        }} />
                    </div>
                    <div className="flex justify-center">
                    <Button fullWidth={true} onClick={addContent} variant="primary" size="sm" text="Submit"/>
                    </div>
                </span>
            </div>    
        </div>}
        
    </div>
}
