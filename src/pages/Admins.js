import React from 'react'

function Admins() {
    const style = {
        height: '100px',
        border: '2px solid',
        width: 900
    }

    const arr = new Array(5).fill(1);

    return (
    <>
        <div >
            <div>
                <div>Admins</div>
                <div style={{height: '95vh', overflowY:'auto', width: 900}}>
                {arr.map((e,i) => {
                    return (
                    <div style={style} key={i} >
                        <div>
                            <h3>Mr Amen Christ</h3>
                            <p>Role: Subscriber</p>
                        </div>
                    </div>
                    )})
                }        
                </div> 
            </div>
        </div>
    </>
    )

}

export default Admins