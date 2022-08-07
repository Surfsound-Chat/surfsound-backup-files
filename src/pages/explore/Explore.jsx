import { Navbar, Sidebar, Highlights, Postcard, Loader } from "../../components";
import { MainContainer } from "../mainContainer/MainContainer";
import "./explore.scss";
import { useSelector } from "react-redux";
export const Explore = () => {

    const { posts, statusAllPost } = useSelector((state) => state.post);
    return (
        <div className="explore">
            <Navbar />

            <MainContainer leftchild={<Sidebar />} mainchild={
                <section className="explore-section">
                    {statusAllPost === "loading" ? <Loader /> :
                        <>
                            {posts?.map((posts) => (
                                <Postcard key={posts.id} allPost={posts} />
                            ))}
                        </>}
                </section>
            } rightchild={<Highlights />} />

        </div>
    )
}