'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaArrowsRotate } from "react-icons/fa6";
import { PiUsers } from "react-icons/pi";

type RepostTypes = {
children: React.ReactNode; 
onRepost: (id: string, aud: string) => void;
id: string;
}
const RepostDialog = ({children, onRepost, id}:RepostTypes) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild >
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share this content</DialogTitle>
            <DialogDescription className="" >
             {/* <div className="text hidden"></div> */}
            </DialogDescription>
          </DialogHeader>
          <div className="text">
            <button onClick={() => onRepost(id, 'public')} className="text flex gap-2 w-full py-5 hover:bg-gray-100 px-3 items-center"> <FaArrowsRotate/> Repost(Public)</button>
            <button onClick={() => onRepost(id, 'private')} className="text flex border-t gap-2 w-full py-5 hover:bg-gray-100 px-3 items-center"> <PiUsers/> Repost with Community</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RepostDialog;
