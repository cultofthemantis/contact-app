"use client";

import Login from "@/components/Login";
import Register from "@/components/Register";
import Contacts from "@/components/Contacts";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        

        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col gap-6">
          
          <h1 className="text-3xl font-bold text-center">
            
          </h1>

          <div className="bg-gray-700 p-4 rounded-xl">
            <Register />
          </div>

          <div className="bg-gray-700 p-4 rounded-xl">
            <Login />
          </div>

        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          
          <h1 className="text-3xl font-bold mb-4 text-center">
            <Contacts />
          </h1>



        </div>

      </div>
    </div>
  );
}