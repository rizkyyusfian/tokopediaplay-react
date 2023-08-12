import { Layout } from 'antd';
import HeaderComponent from '../components/layout/HeaderComponent';
import FooterComponent from '../components/layout/FooterComponent';
import VideoCard from '../components/homePageComponent/VideoCard';
import useApiRequest from '../hooks/useApiRequest';
const { Content } = Layout;

function HomePage() {
    const { data } = useApiRequest('http://localhost:8000/');

    return (
        <Layout>
            <HeaderComponent />
            <Content style={{
                padding: 24,
                minHeight: 380,
                background: '#28282F',
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>

                    {data && data.videoList.map((video) => (
                        <VideoCard
                            id={video._id}
                            key={video._id}
                            title={video.title}
                            image={video.imageThumbnailUrl}
                            link={video.videoUrl}
                        />
                    ))}
                </div>
            </Content>
            <FooterComponent />
        </Layout>
    );
}

export default HomePage;