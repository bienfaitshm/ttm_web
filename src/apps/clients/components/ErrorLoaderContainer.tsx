import React from 'react'

interface ErrorLoaderContainerProps{
    loading : boolean;
    error :any;
    data :any;
    children :(e:any)=>React.ReactNode
}

const ErrorLoaderContainer:React.FC<ErrorLoaderContainerProps> = ({
    children,
    data,
    error,
    loading
}) => {
    if(loading) return <div>loading...</div>;
    if(error) return <div>Error !</div>
    return (
        <div>
            {children(data)}
        </div>
    )
}

export default ErrorLoaderContainer;
