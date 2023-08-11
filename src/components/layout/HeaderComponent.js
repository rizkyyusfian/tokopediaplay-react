import { Layout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';

const { Header } = Layout;
const HeaderComponent = () => {
    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div className="demo-logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ minWidth: 0, flex: "auto" }}
            >
                <Menu.Item key="1" icon={<HomeOutlined />}>
                   <Link href="/tes">Home</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    Profile
                </Menu.Item>
                <Menu.Item key="3" icon={<SearchOutlined />}>
                    Search
                </Menu.Item>
            </Menu>
            <Menu
                theme="dark"
                mode="horizontal"
                selectable={false}
                style={{ minWidth: 0, flex: "auto", justifyContent: "flex-end" }}
            >
                <Menu.Item>Sign In</Menu.Item>
                <Menu.Item>Sign Up</Menu.Item>
            </Menu>
        </Header>
    );
};
export default HeaderComponent;