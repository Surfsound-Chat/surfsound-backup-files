import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
    query,
    orderBy,
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../firebase/config";
let toastId;
const initialState = {
    posts: [],
    error: "",
    statusAddPost: "idle",
    statusAllPost: "idle",
    statusEditPost: "idle",
    statusDeletePost: "idle",
    statusLikePost: "idle",
    statusDislikePost: "idle",
    statusAddBookmark:"idle",
    statusRemoveBookmark:"idle",
}
export const addPost = createAsyncThunk("post/addPost", async (postData, { rejectWithValue }) => {
    try {
        const postRef = await addDoc(collection(db, "posts"), {
            ...postData,
            likes: [],
            comments: [],
            bookmark:[],
        });
        await updateDoc(postRef, { id: postRef.id });
        const postSnap = await getDoc(postRef);
        const post = postSnap.data();
        const userSnap = await getDoc(doc(db, "users", post.userId));
        return { ...post, id: postSnap.id, user: userSnap.data() };
    } catch (error) {
        return rejectWithValue(error.code);
    }
});

export const getAllPosts = createAsyncThunk("post/getAllPosts", async (_, { rejectWithValue }) => {
    try {
        const postQuery = query(
            collection(db, "posts"),
            orderBy("createdAt", "desc")
        );
        let posts = [];
        const allPostsSnap = await getDocs(postQuery);
        for await (const post of allPostsSnap.docs) {
            const postData = post.data();
            const usersnap = await getDoc(doc(db, "users", postData.userId));
            posts = [...posts, { user: usersnap.data(), ...postData }];
        }
        return posts;
    } catch (error) {
        return rejectWithValue(error.code);
    }
});

export const editPost = createAsyncThunk("post/editPost", async (postData, { rejectWithValue }) => {
    const postDataRef = doc(db, "posts", postData.id);
    try {
        await updateDoc(postDataRef, postData);
        const docRef = await getDoc(postDataRef);
        const editedData = { ...docRef.data(), id: postDataRef.id };
        return editedData;
    } catch (error) {
        return rejectWithValue(error.code);
    }
});

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (postId, { rejectWithValue }) => {
        const postDeleteRef = doc(db, "posts", postId);
        try {
            await deleteDoc(postDeleteRef);
            return postDeleteRef.id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const likePost = createAsyncThunk(
    "post/likePost",
    async ({id,currentUserId},{ rejectWithValue }) => {

        try {
            const postDocumentRef = doc(db, "posts", id);
            const postRef = await updateDoc(postDocumentRef, {
                likes: arrayUnion(currentUserId),
            });
            return { postId:id, userId: currentUserId };
        } catch (error) {
            return rejectWithValue(error.code);
        }
    }
);

export const dislikePost = createAsyncThunk(
    "post/dislikePost",
    async ({id,currentUserId},{ rejectWithValue }) => {

        try {
            const postDocumentRef = doc(db, "posts", id);
            const postRef = await updateDoc(postDocumentRef, {
                likes:arrayRemove(currentUserId),
            });
            return { postId:id, userId: currentUserId };
        } catch (error) {
            return rejectWithValue(error.code);
        }
    }
);

export const addToBookmark = createAsyncThunk(
    "post/addToBookmark",
    async ({id,currentUserId},{ rejectWithValue }) => {

        try {
            const postDocumentRef = doc(db, "posts", id);
            const postRef = await updateDoc(postDocumentRef, {
                bookmark:arrayUnion(currentUserId),
            });
            return { postId:id, userId: currentUserId };
        } catch (error) {
            return rejectWithValue(error.code);
        }
    }
);
export const removeFromBookmark = createAsyncThunk(
    "post/removeFromBookmark",
    async ({id,currentUserId},{ rejectWithValue }) => {

        try {
            const postDocumentRef = doc(db, "posts", id);
            const postRef = await updateDoc(postDocumentRef, {
                bookmark: arrayRemove(currentUserId),
            });
            return { postId:id, userId: currentUserId };
        } catch (error) {
            return rejectWithValue(error.code);
        }
    }
);
export const addComment = createAsyncThunk(
    "post/addComment",
    async ({postId,comment},{ rejectWithValue }) => {

        try {
            const postDocumentRef = doc(db, "posts", postId);
            const postRef = await updateDoc(postDocumentRef, {
                comments:arrayUnion(comment),
            });
            return { postId:postId,comment:comment};
        } catch (error) {
            return rejectWithValue(error.code);
        }
    }
);

export const deleteComment = createAsyncThunk(
    "post/deleteComment",
    async ({postId,comment},{ rejectWithValue }) => {
        try {
            const postDocumentRef = doc(db, "posts", postId);
            const postRef = await updateDoc(postDocumentRef, {
                comments:arrayRemove(comment),
            });
            return { postId:postId,commentId:comment.commentId};
        } catch (error) {
            return rejectWithValue(error.code);
        }
    }
);

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: {
        [addPost.pending]: (state, action) => {
            state.statusAddPost = "loading";
            state.error = "";
            toastId = toast.loading("adding post...");

        },
        [addPost.fulfilled]: (state, action) => {
            state.statusAddPost = "Success";
            state.posts.unshift(action.payload);
            toast.success("Post added !!", {
                id: toastId,
            });
        },
        [addPost.rejected]: (state, action) => {
            state.statusAddPost = "failed";
            state.error = action.payload;
            console.log(action.payload);
                toast.error(`${action.payload}`, {
                    id: toastId,
                });
        },
        [getAllPosts.pending]: (state, action) => {
            state.statusAllPost = "loading";
            state.error = "";

        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.statusAllPost = "Success";
            state.posts = action.payload;
        },
        [getAllPosts.rejected]: (state, action) => {
            state.statusAllPost = "failed";
            state.error = action.payload;
            toast.error("Some error occured. Try Again:(", {
                id: toastId,
            });

        },
        [editPost.pending]: (state, action) => {
            state.statusEditPost = "loading";
            state.error = "";

        },
        [editPost.fulfilled]: (state, action) => {
            state.statusEditPost = "Success";
             state.posts = state.posts.map((post) => post.id === action.payload.id ? { ...post, ...action.payload } : post);
            toast.success("Post updated", {
                id: toastId,
            });
        },
        [editPost.rejected]: (state, action) => {
            state.statusEditPost = "failed";
            state.error = action.payload;
            toast.error("Some error occured in updating post. Try Again:(", {
                id: toastId,
            });

        },
        [deletePost.pending]: (state, action) => {
            state.statusDeletePost = "loading";
            state.error = "";

        },
        [deletePost.fulfilled]: (state, action) => {
            state.statusDeletePost = "Success";
            state.posts = state.posts.filter((post) => post.id != action.payload);
            toast.success("post Deleted !!", {
                id: toastId,
            });
        },
        [deletePost.rejected]: (state, action) => {
            state.statusDeletePost = "failed";
            state.error = action.payload;

        },

        [likePost.pending]: (state, action) => {
            state.statusLikePost = "loading";
            state.error = "";

        },
        [likePost.fulfilled]: (state, action) => {
            state.statusLikePost = "Success";
            state.posts = state.posts.map((post) => post.id === action.payload.postId ? { ...post, likes: post.likes.concat(action.payload.userId) } : post)
            toast.success("post Liked !!", {
                id: toastId,
            });
        },
        [likePost.rejected]: (state, action) => {
            state.statusLikePost = "failed";
            state.error = action.payload;

        },

        [dislikePost.pending]: (state, action) => {
            state. statusDislikePost = "loading";
            state.error = "";

        },
        [dislikePost.fulfilled]: (state, action) => {
            state. statusDislikePost = "Success";
            state.posts = state.posts.map((post) => post.id === action.payload.postId ? { ...post, likes: post.likes.filter((id)=>id!==action.payload.userId) } : post)
            toast.success("post disLiked !!", {
                id: toastId,
            });
        },
        [dislikePost.rejected]: (state, action) => {
            state. statusDislikePost = "failed";
            state.error = action.payload;

        },
        [addToBookmark.pending]: (state, action) => {
            state.statusAddBookmark = "loading";
            state.error = "";

        },
        [addToBookmark.fulfilled]: (state, action) => {
            state.statusAddBookmark = "Success";
            state.posts = state.posts.map((post) => post.id === action.payload.postId ? { ...post, bookmark: post.likes.concat(action.payload.userId) } : post)
            toast.success("post saved !!", {
                id: toastId,
            });
        },
        [addToBookmark.rejected]: (state, action) => {
            state.statusAddBookmark = "failed";
            state.error = action.payload;

        },

        [removeFromBookmark.pending]: (state, action) => {
            state.statusRemoveBookmark = "loading";
            state.error = "";

        },
        [removeFromBookmark.fulfilled]: (state, action) => {
            state.statusRemoveBookmark = "Success";
            state.posts = state.posts.map((post) => post.id === action.payload.postId ? { ...post, bookmark: post.likes.filter((id)=>id!==action.payload.userId) } : post)
            toast.success("post removed from bookmark list !!", {
                id: toastId,
            });
        },
        [removeFromBookmark.rejected]: (state, action) => {
            state.statusRemoveBookmark = "failed";
            state.error = action.payload;

        },
        [addComment.pending]: (state, action) => {
            state.error = "";

        },
        [addComment.fulfilled]: (state, action) => {
            state.posts = state.posts.map((post) => post.id === action.payload.postId ? { ...post, comments: post.comments.concat(action.payload.comment) } : post)
        },
        [addComment.rejected]: (state, action) => {
            state.error = action.payload;

        },
        [deleteComment.pending]: (state, action) => {
            state.error = "";

        },
        [deleteComment.fulfilled]: (state, action) => {
            state.posts = state.posts.map((post) => post.id === action.payload.postId ? { ...post, comments: post.comments.filter((comment)=>comment.commentId!==action.payload.commentId) } : post)
        },
        [deleteComment.rejected]: (state, action) => {
            state.error = action.payload;

        }
    }

})

export const postReducer = postSlice.reducer;  