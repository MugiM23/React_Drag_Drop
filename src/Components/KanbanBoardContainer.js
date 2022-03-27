import React from 'react'
import { Layout} from 'antd';

import Sidebar from '../Sidebar';
import KanbanBoardContent from './KanbanBoardContent';



export default class KanbanBoardContainer extends React.Component {
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }} className='w-100'>
                <Sidebar />
                <KanbanBoardContent />
            </Layout>
        );
    }
}
