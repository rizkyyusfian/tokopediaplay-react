import { useState, useEffect } from 'react';
import { Layout, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import HeaderComponent from '../components/layouts/HeaderComponent';
import FooterComponent from '../components/layouts/FooterComponent';
import VideoCard from '../components/homePageComponent/VideoCard';
import useApiRequest from '../hooks/useApiRequest';
import '../styles/pages/homepage.css';
const { Content } = Layout;

function HomePage() {
    const { data } = useApiRequest('https://tokopediaplay.up.railway.app/');
    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState(null);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchQuery = async () => {
        try {
            const response = await fetch('https://tokopediaplay.up.railway.app/search?q=' + searchQuery);
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
            <div className='content-search'>
                <Input name='search' onChange={handleSearch} value={searchQuery} size="large" placeholder="large size" prefix={<SearchOutlined />} allowClear style={{ width: '500px' }} />
            </div>
            <Content className='content-content'>
                <div className='content-content-card'>
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
        </Layout >
    );
}

export default HomePage;