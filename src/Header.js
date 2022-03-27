import React, { useContext } from 'react'
import { Input, Space, Button } from 'antd';
import { PlusOutlined, GiftOutlined } from '@ant-design/icons';
import _debounce from 'lodash/debounce'

import { strings } from './Constants/Strings'
import ProfileIcon from './Components/CommonUI/ProfileIcon';
import { AppContext } from './Components/Context';

const { Search } = Input;

export default function Header() {

  const { setSearchText, searchText } = useContext(AppContext)
  
  const onSearch = _debounce((keyword) => {
    setSearchText(keyword)
  }, 500)

  return (
    
    <div className='d-flex p-2 justify-content-between align-items-center small_bottomBorder' >
      <div>
        <img src='images/user_icon.png' className='mediumIcon' alt='' />
        <label className='px-2'>{strings.global.COMP_TITLE}</label>
      </div>
      <div className='d-flex align-items-center'>
        <Space direction="vertical">
          <Search
            placeholder="search text"
            onSearch={onSearch}
            size='small'
            bordered={false}
            className='bg-white gray_bottom_border'
          />
        </Space>
        <div className='px-2'>
          <Button
            type="primary"
            className='d-flex align-items-center default_bg p-2 no_border'
            size='small'
            icon={<PlusOutlined size='small m-0 p-0' className='font_small' />}
            loading={false}
          // onClick={() => this.enterLoading(1)}
          >
            <label className='font_small px-1'>{strings.global.ADD_NEW}</label>
          </Button>
        </div>

        <GiftOutlined />
        <ProfileIcon containerClassName='rounded_Icon' label='s' labelClassName='text-white' />
      </div>

    </div>
  )
}
