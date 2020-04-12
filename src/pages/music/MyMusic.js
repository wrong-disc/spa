import React from 'react';
export default class MyMusicPage extends React.Component {

  render() {
    return (
      <div className="w-full h-full flex flex-col items-start px-4 py-4">

        <h1 className="ml-4 text-4xl border-gray-800 border-b text-white font-bold tracking-tight">My Music</h1>
        
        <div className="mt-8 flex items-center justify-between flex-wrap">

          {[...Array(18)].map((e, i) => (

            <div className="mx-4 my-4 w-1/6 flex flex-col items-center leading-tight" key={i}>
              <img className="shadow-lg rounded-lg" alt="Album cover" src="https://i.pinimg.com/originals/d9/0d/59/d90d59e74df03ae53756476e990fd425.jpg" />
              <h2 className="mt-2 text-gray-100 font-bold text-lg">Song Name</h2>
              <h3 className="text-gray-100 text-xs">Some Amazing Artist</h3>
            </div>

          ))}

          {/* Fake elements to pad out flex-grid when <5 elements in grid */}
          {[...Array(4)].map((e, i) => <div className="mx-4 my-4 w-1/6" key={i} />)}

        </div>

      </div>

    );
  }

}
