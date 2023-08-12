import { useState, useEffect } from 'react';
import { Layout, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import HeaderComponent from '../components/layout/HeaderComponent';
import FooterComponent from '../components/layout/FooterComponent';
import VideoCard from '../components/homePageComponent/VideoCard';
import useApiRequest from '../hooks/useApiRequest';
const { Content } = Layout;

function HomePage() {
    const { data } = useApiRequest('http://localhost:8000/');

    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState(null);


    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchQuery = async (event) => {
        try {
            const response = await fetch('http://localhost:8000/search?q=' + searchQuery);
            if (response.ok) {
                const data = await response.json();
                setVideos(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSearchQuery();
    });


    return (
        <Layout>
            <HeaderComponent />
            <div style={{
                background: '#28282F',
                display: 'flex',
                justifyContent: 'center',
                padding: '20px 0px',
            }}>
                <Input name='search' onChange={handleSearch} value={searchQuery} size="large" placeholder="large size" prefix={<SearchOutlined />} allowClear style={{ width: '500px' }} />
            </div>
            <Content style={{
                padding: 24,
                background: '#28282F',
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}>
                    {searchQuery ?
                        videos && videos.videoList.map((video) => (
                            <VideoCard
                                id={video._id}
                                key={video._id}
                                title={video.title}
                                image={video.imageThumbnailUrl}
                                link={video.videoUrl}
                            />
                        ))
                        :
                        data && data.videoList.map((video) => (
                            <VideoCard
                                id={video._id}
                                key={video._id}
                                title={video.title}
                                image={video.imageThumbnailUrl}
                                link={video.videoUrl}
                            />
                        ))
                    }
                </div>
            </Content>
            <FooterComponent />
        </Layout>
    );
}

export default HomePage;