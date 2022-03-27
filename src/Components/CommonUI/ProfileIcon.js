import React from 'react'



export default function ProfileIcon({
    containerClassName = '',
    label = '',
    labelClassName='text-white'
}) {
    return <div className='d-flex align-items-center justify-content-start px-2'>
        <div className={containerClassName}>
        <label className={labelClassName}>{label}</label>
        </div>
    </div>
}