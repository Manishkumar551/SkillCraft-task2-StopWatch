import React, { useEffect, useRef, useState } from 'react'

const Stopwatch = () => {



  const [isRunning,setIsRunning]=useState(false);

  const [elapsedTime,setElapsedTime]=useState(0);

  const intervalIdRef=useRef(null);

  const startTimeRef=useRef(0);

  useEffect(()=>{

    if(isRunning){
      intervalIdRef.current=setInterval(()=>{
        setElapsedTime(Date.now() - startTimeRef.current);
      },10)
    }

    return ()=>{
      clearInterval(intervalIdRef.current);
    }

  },[isRunning])

  function start(){
     setIsRunning(true);
     startTimeRef.current=Date.now() - elapsedTime;
  }

  function stop(){
     setIsRunning(false);
  }

  function reset(){

    setElapsedTime(0);
    setIsRunning(false);

  }

  function formatTime(){

    let hours=Math.floor(elapsedTime / (1000*60*60));
    let minutes=Math.floor(elapsedTime/ (1000*60) %60);
    let seconds=Math.floor(elapsedTime/(1000)%60 );
    let milliseconds=Math.floor((elapsedTime % 1000)/10);

 
    hours=String(hours).padStart(2,"0");
    minutes=String(minutes).padStart(2,"0");
    seconds=String(seconds).padStart(2,"0");
    milliseconds=String(milliseconds).padStart(2,"0");

    return `${minutes}:${seconds}:${milliseconds}`;

  }

  return (

    <div className='grid place-items-center h-screen'>

    <div className=' w-full flex flex-col justify-center lg:w-1/2  items-center pt-20 pb-20 border-8 border-black rounded-full'>
         
       <div className=' text-8xl   bold  font-mono  '  > {formatTime()} </div>

       <div className=' pt-10 pb-10 text-4xl font-semibold   flex gap-4'>

           <button onClick={start} className='  py-2 px-2 rounded-full bg-white bg-gradient-to-r from-green-600 to-green-900  cursor-pointer  '>Start</button>

           <button onClick={stop} className='
            py-2 px-2 bg-gradient-to-r from-red-500 to-red-900 rounded-full curser-pointer'>Stop</button>
                                    
           <button onClick={reset} className='
           py-2 px-2 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-900   rounded-full
           '>Reset</button>
       </div>

    </div>
    </div>
  )
}

export default Stopwatch