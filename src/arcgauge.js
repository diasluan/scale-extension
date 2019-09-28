/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import { ArcGauge } from '@progress/kendo-react-gauges';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import "./content.css";

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0,
            showTicks: true,
            ticksColor: '#f44ad2',
            rangeSize: 15,
            rangeLineCap: 'round',
            rangePlaceholderColor: '#e6e5e5'
        };
    }

    componentDidMount() {
        setInterval(
            () => {
                this.setState({
                    value: 50
                });
            },
            1000);
    }

    render() {
        const colors = [
            { from: 0, to: 25, color: 'red' },
            { from: 25, to: 100, color: 'lime' }
        ];

        const {
            value, showTicks, ticksColor, rangeSize, rangeLineCap,
            rangePlaceholderColor } = this.state;

        const arcCenterRenderer = (value, color) => {
            return (<h3 style={{ color: color }}>{value}kg</h3>);
        };
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")} ></link>]}> 
               <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                        
                        return (
                           <div className={'my-extension'}>
                                Hi!
                                <ArcGauge 
                                    value={value}
                                    transitions={false}
                                    scale={{
                                        majorTicks: { visible: showTicks, color: ticksColor },
                                        minorTicks: { visible: showTicks, color: ticksColor },
                                        ticksColor,
                                        rangeSize,
                                        rangeLineCap,
                                        rangePlaceholderColor,
                                }}
                                    arcCenterRender={arcCenterRenderer} 
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