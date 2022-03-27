import React, { useState } from 'react'
import { RightOutlined ,DownOutlined} from '@ant-design/icons';
import { Select } from 'antd';

import { strings, candidateArray, publishArry } from '../Constants/Strings'


const { Option } = Select
export default function ContentTitle() {
    const [candidate, setCandidate] = useState(candidateArray[0]);
    const [published, setPublished] = useState(publishArry[0]);

    const onChange = (value, type) => {
        if (type === 'candidate') {
            setCandidate(value)
        }
        else if (type === 'publish') {
            setPublished(value)
        }
    }

    return <div className='d-flex align-items-center p-2 light-bg justify-content-between'>
        <div className='d-flex align-items-center'>
            <div className='px-2'>
                <img src='/images/briefcase.png' alt='briefcase' className='smallIcon' />
            </div>
            <label className='font-light'>{strings.global.JOBS}</label>
            <RightOutlined className='extra_font_small px-2' />
            <label className='font-light'>{strings.global.FULL_STACK_ENGINEER}</label>
            <label className='extra_font_small mx-1 mt-1 rounded px-2 border align-self-center'>{strings.global.VIEW_JOB_DETAILS}</label>
        </div>
        <div className='d-flex align-items-center'>
            <Select
                value={candidate}
                onChange={(value) => onChange(value, 'candidate')}
                size='small'
            >
                {candidateArray.map(label => (
                    <Option key={label}>{label}</Option>
                ))}
            </Select>
            <div className='px-2'>
                <Select
                    value={published}
                    onChange={(value) => onChange(value, 'publish')}
                    size='small'
                    className='default_bg text-white'
                    dropdownClassName='p-1'
                    suffixIcon={<DownOutlined className='extra_font_small text-white'/>}
                >
                    {publishArry.map(label => (
                        <Option  key={label}>{label}</Option>
                    ))}
                </Select>
            </div>
        </div>

    </div>
}