import { Layout, theme, Space, Typography, Card } from 'antd';
import { SelectOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import useApiRequest from '../../hooks/useApiRequest';
import moneyFormat from '../../utils/MoneyFormatUtil';
const { Sider, Content } = Layout;
const { Title } = Typography;
const { Meta } = Card;

const ProductSection = ({ id }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { data, error, loading } = useApiRequest(`http://localhost:8000/product/${id}`);

    return (
        <Sider
            width={320}
            style={{
                background: { colorBgContainer },
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            <Content style={{ margin: '0px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Title level={3} style={{ color: 'white' }}>PRODUCT</Title>
                <hr style={{ width: '100%', color: 'white' }} />
            </Content>

            <Content style={{ marginBottom: '20px', display: "flex", justifyContent: "center", wordBreak: 'break-word', wordWrap: 'break-word' }}>
                <Space direction="vertical" size={20}>
                    {data && data.map((item) => (
                        item.productList.map((product) => (
                            <Card
                                style={{ width: '260px' }}
                                cover={<img alt={product.name} src={product.imageLink} />}
                                actions={[
                                    <a href={product.link} key={product.link} target="_blank" style={{ color: 'black', fontSize: '16px' }}>
                                        <ShoppingCartOutlined /> Buy!
                                    </a>,
                                ]}
                            >
                                <Meta title={DisplayName(product.name)} description={DisplayPrice(product.price)} />
                            </Card>
                        ))
                    ))}
                </Space>
            </Content>

        </Sider>
    );
};

const DisplayPrice = (price) => {
    return (
        <span style={{ color: 'black' }}><b>Price:</b> Rp.{moneyFormat(price)}</span>
    )
}

const DisplayName = (name) => {
    return (
        <div style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
            {name}
        </div>
    )
}
        
export default ProductSection;