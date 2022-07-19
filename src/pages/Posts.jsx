import React, {useEffect, useRef, useState} from "react";
import '../styles/App.css'
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../components/utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/pagination/Pagination";
import Loader from "../components/UI/Loader/Loader";
import PostService from "../API/PostService";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    // const [posts, setPosts] = useState([
    //     {id: 1, title: 'JavaScript', body: '1 Description'},
    //     {id: 2, title: 'a JavaScript 2', body: '4 Description'},
    //     {id: 3, title: 'b JavaScript 3', body: '2 Description'},
    // ])

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [model, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts((posts.filter(p => p.id !== post.id)))
    }

    const changePage = (page) => {
        setPage(page)
    }

    return (
        <div className="App">
            {/*<Counter></Counter>*/}
            {/*<ClassCounter></ClassCounter>*/}
            {/*<PostItem post={{id: 1, title: 'JavaScript', body: 'Description'}}></PostItem>*/}
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={model} setVisible={setModal}>
                <PostForm create={createPost}></PostForm>
            </MyModal>
            <hr style={{margin: '15px 0'}}></hr>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать всё'},
                ]}
            />
            {postError &&
                <h1>Произошла ошибка %{postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"></PostList>
            <div ref={lastElement} style={{height: 20, background: 'red'}}/>
            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                    <Loader/>
                </div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
