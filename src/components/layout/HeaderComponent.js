import { Layout, Menu } from 'antd';
import { HomeOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const { Header } = Layout;
const HeaderComponent = () => {
    const { user, logout } = useAuth();
    console.log(user);
    console.log(sessionStorage.getItem('user'));
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
            <div className="demo-logo" />
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
                    <Menu.Item key={2}><Link to="/">Signup</Link></Menu.Item>

                </Menu>
                : <Menu
                    theme="dark"
                    mode="horizontal"
                    selectable={false}
                    style={{ minWidth: 0, flex: "auto", justifyContent: "flex-end" }}
                >

                    <Menu.Item key={1} icon={<LoginOutlined />}>Welcome, {JSON.parse(sessionStorage.getItem('user')).userName}</Menu.Item>
                    <Menu.Item key={2} icon={<LoginOutlined />}> <Link to="/logout">{logout()}</Link></Menu.Item>

                </Menu>
            }
        </Header>
    );
};
export default HeaderComponent;