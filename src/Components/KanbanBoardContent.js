import React, { useState } from 'react'
import { Layout } from 'antd';

import Header from '../Header'
import ContentTitle from './ContentTitle';
import ContentHeader from './ContentHeader';
import ContentBody from './ContentBody';
import { AppContext } from './Context';

const { Content } = Layout;


export default function KanbanBoardContent() {

    const [searchText, setSearchText] = useState('wewewewe')

    return <Layout className=" w-100 bg-white" >
        <AppContext.Provider value={{ searchText, setSearchText }}>
            <Header />
            <ContentTitle />
            <Content className='content-bg' >
                <ContentHeader />
                <div className="site-layout-background">
                    <ContentBody />
                </div>
            </Content>
        </AppContext.Provider>
    </Layout>
}