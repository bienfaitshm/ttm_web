import React from 'react';

interface StepInfoContainerProps{

}
const StepInfoContainer = React.forwardRef<any, StepInfoContainerProps>((props, ref) => {
    return (
        <div>
            <h1>More info</h1>
        </div>
    )
})

export default React.memo(StepInfoContainer);
