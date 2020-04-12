import React from 'react';
export default class MyMusicPage extends React.Component {

  render() {
    return (
      <div className="w-full h-full flex flex-col items-start px-8 py-4">



        <h1 className="text-4xl border-gray-800 border-b text-white font-bold tracking-tight">My Music</h1>

        <div className="mt-12 flex items-center flex-wrap">

          <div className="w-1/6 flex ml-3 leading-tight flex-col items-center ">
            <img className="rounded-lg" alt="Album cover" src="https://i.pinimg.com/originals/d9/0d/59/d90d59e74df03ae53756476e990fd425.jpg" />
            <h2 className="mt-2 text-gray-100 font-bold text-lg ">Song Name</h2>
            <h3 className="text-gray-100 text-xs">Some Amazing Artist</h3>
          </div>

        </div>

      </div>

    );
  }

}
