import React from 'react';

const ListGroup = ({ items, textProperty, valueProperty, selectedItem, onItemSelect }) => {
    return (
        <ul className="list-group">
            {items.map(genre => <li key={genre[valueProperty]} onClick={() => onItemSelect(genre)} className={genre === selectedItem ? "list-group-item active" : 'list-group-item'}>{genre[textProperty]}</li>)}
        </ul>
    );
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;