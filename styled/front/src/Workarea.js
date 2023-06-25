import { useState, useEffect, useRef } from 'react';
import {Frame, Day, Header, Button, Body, Column, WorkBlock, Hours, BodyWork} from "./StComponents"

function Workarea(props) {
    const wrapperRef = props.giveRef;
    const workBgrnd = (index) => {
        let childrens = Array.from(wrapperRef.current.children);
        childrens[index].style.backgroundColor = "#bcc9fa";
    }

    return (
        <Body workarea>
            <Hours>
                {Array(23)
                    .fill(null)
                    .map((_, index) => {
                            let str = (index < 9) ? "0" + String(index+1): String(index+1);
                            return (
                                <WorkBlock hours key={index}>
                                    {str + ".00"}
                                </WorkBlock>
                            );
                    })
                }
            </Hours>
            <BodyWork ref={wrapperRef}>
                {Array(168)
                    .fill(null)
                    .map((_, index) => 
                            <WorkBlock key={index} onClick={() => workBgrnd(index)}>
                            
                            </WorkBlock>
                    )
                }
            </BodyWork>
        </Body>
    )
}

export default Workarea;