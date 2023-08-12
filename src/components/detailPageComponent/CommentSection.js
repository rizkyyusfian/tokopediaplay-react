import { useState, useEffect } from 'react';
import { Layout, theme, Input, Button, Space, Typography, Card, Alert } from 'antd';
import useApiRequest from '../../hooks/useApiRequest';
import CommentDateFormatUtil from '../../utils/CommentDateFormatUtil';
const { Sider, Content } = Layout;
const { TextArea } = Input;
const { Title } = Typography;

const CommentSection = ({ id }) => {
    const { token: { colorBgContainer } } = theme.useToken();
    const { data, refetch } = useApiRequest(`http://localhost:8000/comment/${id}`);
    const [comments, setComments] = useState(null);
    const [response, setResponse] = useState(null);
    const [form, setForm] = useState({
        userName: '',
        comment: ''
    });
    console.log(data);

    useEffect(() => {
        if (data) {
            setComments(data);
            console.log(comments);
        }
    }, [data]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(form);
    }, [form]);

    const handleNewCommentSubmit = async (values) => {
        try {
            const response = await fetch(`http://localhost:8000/comment/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                refetch();
                const data = await response.json();
                console.log(data);
                setResponse(data);

            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleForm = (event) => {
        event.preventDefault();
        console.log(form);
        handleNewCommentSubmit(form);
        handleClearForm();
    };

    const handleClearForm = () => {
        setForm({
            userName: '',
            comment: ''
        });
    };

    const clearResponse = () => {
        setResponse(null);
    };

    useEffect(() => {
        if (response) {
            const timeout = setTimeout(clearResponse, 2000); // Set the duration in milliseconds (e.g., 5000 ms = 5 seconds)
            return () => clearTimeout(timeout); // Cleanup the timeout to avoid memory leaks
        }
    }, [response]);


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
                <Title level={3} style={{ color: 'white' }}>COMMENT</Title>
                <hr style={{ width: '100%', color: 'white' }} />
            </Content>

            <Content style={{ margin: '0px 20px' }}>
                {response && (
                    <Alert
                        message="Success"
                        description={response}
                        type="success"
                        showIcon
                        style={{ marginBottom: '10px' }}
                    />
                )}
                <form style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end' }} onSubmit={handleForm}>
                    <Input id='userName' name="userName" placeholder="Input your name" value={form.userName} onChange={handleChange} allowClear style={{ marginBottom: '10px' }} />
                    <TextArea id='comment' name="comment" placeholder="Share your comment" value={form.comment} onChange={handleChange} allowClear autoSize={{ minRows: 2, }} />
                    <Space style={{ marginTop: '10px' }} size='small'>
                        {form && form.userName && form.comment && <Button ghost onClick={handleClearForm}>Clear</Button>}
                        {(form && form.userName && form.comment) ? <Button type="primary" htmlType="submit">Submit</Button> : <Button type="primary" htmlType="submit" disabled style={{ color: 'white' }}>Submit</Button>}
                    </Space>
                </form>
            </Content>

            <Content style={{ margin: '20px 20px 0px 20px', display: 'flex', justifyContent: 'center' }}>
                <Space direction="vertical" size={20}>
                    {comments && comments.commentList.map((comment) => (
                        <Card size="small" style={{ width: 260 }}>
                            <span style={{ fontWeight: 'bold', wordWrap: 'break-word', whiteSpace: 'normal' }}>{comment.userName}</span>
                            <span style={{ float: 'right', fontSize: '10px' }}>{CommentDateFormatUtil(comment.createdAt)}</span>
                            <hr />
                            <span style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{comment.comment}</span>
                        </Card>
                    ))}
                </Space>
            </Content>
        </Sider>
    );
};
export default CommentSection;