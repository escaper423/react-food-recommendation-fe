import React, {useState} from 'react'
import noImage from '../resources/icons/noimage.jpg'
const FoodListItem = () => {
    const [foodData, setFoodData] = useState(null);
    return (
        <div style={{display: 'flex', 
        lineHeight: '1.3em',
        width: '300px', 
        height: '50px', 
        border: '1px white solid', 
        position: 'relative'}}>
            <div styles={{width: '50px' , height: '50px', position:'relative'}}>
                <img src={noImage} style={{height: '100%', width: '100%'}}></img>
            </div>

            <div style={{textAlign:'none', marginLeft: '4px'}}>
                <h3>No Name</h3>
                <p>No Features</p>
            </div>
        </div>
    )
}

export default FoodListItem
