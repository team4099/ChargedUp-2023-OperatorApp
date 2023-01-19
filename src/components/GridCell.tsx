import { NetworkTablesTopic } from 'ntcore-ts-client'

interface GridProps {
    message: string,
    isCone?: boolean,
    topic: any
}

export function GridCell(props: GridProps){

    if (props.isCone){
        var color = "bg-yellow-200"
    }
    else {
        var color = "bg-purple-200"
    }

    const setNT = ()=>{
        console.log("setNT")
        props.topic(props.message)
    }

    const releaseNT = ()=>{
        console.log("releaseNT")
        props.topic("none")
    }

    return (
        <button className={`w-full h-24 ${color} text-center active:bg-green-400 text-xl font-semibold`} onMouseDown={setNT} onClick={releaseNT}>
            {props.message}
        </button>
    )
}