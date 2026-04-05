import React from 'react'


interface ContainerProps{
    height : number
    width: number
}

const Container = (props: ContainerProps): React.ReactElement =>{
return(
    <div style={{height: props.height, width: props.width}}>
    </div>
)
}

export default Container