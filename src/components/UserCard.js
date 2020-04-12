import React from 'react';

export default class UserCardComponent extends React.Component {

    render() {
        return (
            <div className="mt-4 mr-4 bg-gray-900 text-gray-200 rounded-full shadow-lg flex items-center">
                <img className="h-10 w-10 rounded-full object-fit" src="https://png.pngtree.com/element_our/png/20181206/users-vector-icon-png_260862.jpg"/>
                <div className="ml-2 mr-3">Johnny GoldFish</div>
            </div>
        );
    }

}
