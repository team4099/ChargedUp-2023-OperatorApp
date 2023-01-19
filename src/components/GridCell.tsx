import { NetworkTablesTopic } from 'ntcore-ts-client'i

interface GridProps {
    message: string,
    isCone?: boolean,
    topic: NetworkTablesTopic<string>
}

export function GridCell(props: GridProps){

    if (props.isCone){
        var color = "bg-yellow-200"
    }
    else {
        var color = "bg-purple-200"
    }

    return (
        <button className={`w-full h-24 ${color} text-center active:bg-green-400 text-xl font-semibold`} onClick={setNT} onMouseUp={releaseNT}>
            {props.message}
        </button>
    )

    function setNT(){
        props.topic.setValue(props.message)
    }

    function releaseNT(){
        props.topic.setValue("none")
    }
}