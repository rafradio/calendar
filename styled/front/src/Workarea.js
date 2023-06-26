import { useState, useEffect, useRef } from 'react';
import {Frame, Day, Header, Button, Body, Column, WorkBlock, Hours, BodyWork} from "./StComponents"

function Workarea(props) {
    const wrapperRef = props.giveRef;
    const workBgrnd = props.workBgrnd;
    const data = props.data;
    

    return (
        <Body workarea>
            <Hours>
                {Array(23)
                    .fill(null)
                    .map((element, index) => {
                            let str = (index < 9) ? "0" + String(index+1): String(index+1);
                            return (
                                <WorkBlock hours key={index.toString()}>
                                    {str + ".00"}
                                </WorkBlock>
                            );
                    })
                }
            </Hours>
            <BodyWork ref={wrapperRef}>
                {Array(168)
                    .fill(null)
                    .map((element, index) => 
                            <WorkBlock key={index.toString()} onClick={() => workBgrnd(index, data)}>
                            
                            </WorkBlock>
                    )
                }
            </BodyWork>
        </Body>
    )
}

export default Workarea;