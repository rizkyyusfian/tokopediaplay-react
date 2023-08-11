import FooterComponent from '../components/layout/FooterComponent';
import HeaderComponent from '../components/layout/HeaderComponent';
import CommentSection from '../components/detailPageComponent/CommentSection';
import ProductSection from '../components/detailPageComponent/ProductSection';
import { Layout } from 'antd';
import { useEffect, useState, useContext } from 'react';
import VideoDataContext from '../contexts/VideoDataContext';
import { useLocation } from 'react-router-dom';
const { Content } = Layout;

function DetailPage() {
    const location = useLocation();
    const {id, title, image, link} = location.state;
    const videoId = link.substring(link.lastIndexOf('/') + 1)

    return (
        <Layout style={{ height: '100vh', width: '100vw' }}>
            <HeaderComponent />
            <Layout>
                <ProductSection
                    id={id}
                />
                <Content style={{
                    padding: 24,
                    minHeight: 380,
                    background: '#28282F',
                    // height: 40, // this is for testing purpose
                }}>
                    <h1 style={{ color: 'white' }}>{title}</h1>
                    <iframe
                        width="100%"
                        height="90%"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </Content>
                <CommentSection
                    id={id}
                />
            </Layout>

            <FooterComponent />
        </Layout>
    );
};
export default DetailPage;