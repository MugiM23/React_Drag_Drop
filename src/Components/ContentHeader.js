import React, { useState } from 'react'
import { Select } from 'antd';
import { DownOutlined, UploadOutlined, FilterFilled } from '@ant-design/icons';

import { strings, candidateStatusArray, sortingArray } from '../Constants/Strings'

const { Option } = Select

export default function ContentHeader() {
    const [selectedStatus, setSelectedStatus] = useState(candidateStatusArray[0])
    const [selectedSortOption, setSelectedSortOption] = useState(sortingArray[0])

    const onChange = (value, type) => {
        if (type === 'status') {
            setSelectedStatus(value)
        }
        else if (type === 'sorting') {
            setSelectedSortOption(value)
        }
    }

    return <div className='p-2 d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
            <label className='font-black'>{strings.global.ALL_CANDIDATES}</label>
            <label className='font-black px-1'>{' - '}</label>
            <Select
                value={selectedStatus}
                onChange={(value) => onChange(value, 'status')}
                bordered={false}
                size='small'
                suffixIcon={<DownOutlined className='extra_font_small' />}
            >
                {candidateStatusArray.map(value => (
                    <Option key={value}>
                        <label className='font_small light-gray' >{`${value} (${Math.floor(Math.random() * 50)})`}</label>
                    </Option>
                ))}
            </Select>
            <div className='px-3'>
                <label className='font-black'>{strings.global.SORT_BY}</label>
                <Select
                    value={selectedSortOption}
                    onChange={value => onChange(value, 'sorting')}
                    bordered={false}
                    size='small'
                    suffixIcon={<DownOutlined className='extra_font_small' />}
                >
                    {sortingArray.map(value => (
                        <Option key={value}>
                            <label className='font_small light-gray' >{value}</label>
                        </Option>
                    ))}
                </Select>
            </div>
        </div>
        <div className='d-flex justify-content-between align-items-center'>
            <div className='px-2'>
                <img src='images/menu-button-of-three-horizontal-lines.png' alt='hamburger' className='smallIcon' />
            </div>
            <FilterFilled className='px-2' style={{color:'#63747e'}} />
            <UploadOutlined className='px-2' style={{color:'#63747e'}} />
        </div>

    </div>
}