import React, {useRef, useState}  from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    // один объект
    const [post, setPost] = useState({title: '', body: ''})

    {/*Неуправляемый компонент (не рекомендуется)*/
    }
    // const bodyInputRef = useRef()

    const addNewPost = (e) => {
        e.preventDefault()

        {/*Неуправляемый компонент (не рекомендуется)*/
        }
        // console.log(bodyInputRef.current.value)

        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({title: '', body: ''})
    }

    return (
        <div>
            <form>
                {/*Управляемый компонент*/}
                <MyInput
                    value={post.title}
                    onChange={e => setPost({...post, title: e.target.value})}
                    type="text"
                    placeholder="Название поста"
                />
                {/*Неуправляемый компонент (не рекомендуется)*/}
                {/*<MyInput*/}
                {/*    ref={bodyInputRef}*/}
                {/*    type="text"*/}
                {/*    placeholder="Описание поста"*/}
                {/*/>*/}
                <MyInput
                    value={post.body}
                    onChange={e => setPost({...post, body: e.target.value})}
                    type="text"
                    placeholder="Описание поста"
                />
                <MyButton onClick={addNewPost}>Создать пост</MyButton>
            </form>
        </div>
    );
};

export default PostForm;