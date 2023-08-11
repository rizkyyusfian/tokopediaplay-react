import { useState } from 'react';
import { Card } from 'antd';
import {Link} from 'react-router-dom';

const { Meta } = Card;
const VideoCard = ({ id, title, image, link }) => {
    const [videoDetail, setVideoDetail] = useState({id: id, title: title, image: image, link: link});

    return (
        <Link to={`/video/${id}`} state={videoDetail} >
            <Card
                hoverable={true}
                loading={false}
                style={{
                    width: 340,
                    margin: '10px',
                }}
                cover={<img alt={title} src={image} />}
            >
                <Meta title={DisplayName(title)} style={{ textAlign: 'center', fontWeight: 'bold', wordWrap: 'break-word', wordBreak: 'break-word' }} />
            </Card>
        </Link>
    )
}

const DisplayName = (name) => {
    return (
        <div style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
            {name}
        </div>
    )
}
export default VideoCard;