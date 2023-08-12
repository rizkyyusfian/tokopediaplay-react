import { Layout, Menu, Avatar } from 'antd';
import { HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const { Header } = Layout;
const HeaderComponent = () => {
    const { logout } = useAuth();
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
                color: 'white',
            }}
        >
            <h1 style={{ margin: 0, color: 'white' }}>Tokopedia Play</h1>
            <Menu
                theme="dark"
                mode="horizontal"
                selectable={false}

                style={{ minWidth: 0, flex: "auto" }}
            >
                <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
            </Menu>
            {!sessionStorage.getItem('user') ?
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectable={false}
                    style={{ minWidth: 0, flex: "auto", justifyContent: "flex-end" }}
                >
                    <Menu.Item key={1}><Link to="/login">Login</Link></Menu.Item>
                </Menu>
                :
                <>
                    <Menu
                        theme='dark'
                        mode='horizontal'
                        selectable={false}
                        style={{ minWidth: 0, flex: "auto", justifyContent: "flex-end" }}
                        items={[
                            {
                                label: 'Welcome, ' + JSON.parse(sessionStorage.getItem('user')).userName,
                                key: 'SubMenuLogin',
                                children: [
                                    {
                                        label: <Link to="/logout">Log out</Link>,
                                        key: 'Log Out',
                                        icon: <LoginOutlined />,
                                    }
                                ],
                            }
                        ]}
                    />
                    <Avatar size="large" src={<img src="http://localhost:8000/public/images/profilepicture/foto1.jpeg" alt="avatar" />} />
                </>
            }
        </Header>
    );
};

export default HeaderComponent;