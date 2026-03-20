import Image from "next/image";
import Login from "@/components/Login";
import Register from "@/components/Register";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Login />
        <Register />
        
    </div>
  );
}
