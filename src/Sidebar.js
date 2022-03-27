import React, { useState } from "react";
import { Layout, Menu } from 'antd';
import {
	DesktopOutlined,
	FileOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

export default function Sidebar() {
	const [collapsed, setCollapsed] = useState(false)

	const onCollapse = collapsed => {
		setCollapsed(collapsed)
	};

	return <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
		<div className="logo" />
		<Menu theme="dark" defaultSelectedKeys={['1']} 
		mode="inline" 
		className="d-flex flex-column align-items-center"  >
			<Menu.Item key="1" icon={<img src="/images/user_icon.png" alt="" className="smallIcon" />} />
			<div className="d-flex flex-column justify-content-between" >
				<div>
					<Menu.Item key="2" icon={<DesktopOutlined />} />
					<Menu.Item key="9" icon={<FileOutlined />} />
				</div>
				<div>
					<Menu.Item key="2" icon={<DesktopOutlined />} />
					<Menu.Item key="9" icon={<FileOutlined />} />
				</div>
			</div>
		</Menu>
	</Sider>
}