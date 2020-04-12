import React from 'react';
export default class MyMusicPage extends React.Component {

  render () {
    return (
      <div className="w-full h-full flex justify-left">

      <div className="mx-5">
        <div>
          <h1 className="text-4xl text-white font-bold tracking-tight">My Music</h1>
          <hr className="w- border-gray-800 " />
        </div>
        <div className="mt-20 items-center">
          <div className="w-32 absolute">
            <img className="absolute h-32  rounded-lg" alt="Album cover" src="https://i.pinimg.com/originals/d9/0d/59/d90d59e74df03ae53756476e990fd425.jpg" />
          </div>

          <div className="ml-3 leading-tight mx- flex ">
            <h3 className="font-medium text-md ">Artist</h3>
            <h2 className="font-bold text-xl">Name of Song</h2>
          </div>

        </div>
        
      </div>
      </div>

    );
  }

}
