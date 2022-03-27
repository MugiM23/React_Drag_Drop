import React from 'react'
import { StarOutlined } from '@ant-design/icons';

export default function FiveStarUI() {
    let count = [1, 2, 3, 4, 5]
    return <div className='d-flex align-items-center'>
        {
            count.map((item) => {
                return <div key={item} >
                    <StarOutlined />
                </div>
            })
        }
    </div>
}