/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import ReactSpeedometer from "react-d3-speedometer";
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";

class Main extends React.Component {
    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
               <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                        let values = {
                            current: 470,
                            target: 470,
                            minAllowed: 450,
                            maxAllowed: 490,
                            min: 0,
                            max: 700
                        }
                        return (
                           <div className={'my-extension'}>
                                Measuring material A3R4BX9
                                <ReactSpeedometer
                                    value={values.current}
                                    minValue={values.min}
                                    maxValue={values.max}
                                    maxSegmentLabels={5}
                                    customSegmentStops={[values.min, values.minAllowed, values.maxAllowed, values.max]}
                                    segmentColors={['firebrick','#138808','firebrick']}
                                    needleColor="#000080"
                                />

                                <ReactSpeedometer
                                    value={100*values.current/values.target}
                                    minValue={0}
                                    maxValue={200}
                                    valueFormat="d"
                                    maxSegmentLabels={5}
                                    customSegmentStops={[0, 100*values.minAllowed/values.target, 
                                                        100*values.maxAllowed/values.target, 200]}
                                    segmentColors={['firebrick','#138808','firebrick']}
                                    needleColor="#000080"
                                    currentValueText="%"
                                />
                           </div>
                        )
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(<Main />, app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action") {
        toggle();
      }
   }
);

function toggle(){
   if(app.style.display === "none"){
     app.style.display = "block";
   }else{
     app.style.display = "none";
   }
}