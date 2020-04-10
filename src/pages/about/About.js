import React from 'react';

export default class AboutPage extends React.Component {

  render () {
    return (
      <div className="w-full h-full flex items-center justify-center">
                    
          <div className="text-center">
              <h1 className="text-6xl font-bold tracking-tight">Wrong Disc</h1>
              <hr/>
              <p className="mt-2 text-md tracking-tight">Developed by</p>
              <p className="text-2xl font-light tracking-tight">Pedro Vinha & Toby Selway</p>
          </div>

      </div>
    );
  }

}
