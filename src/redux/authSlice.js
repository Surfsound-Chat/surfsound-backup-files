import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
    doc,
    setDoc,
    collection,
    query,
    where,
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
    authStatus: "",
    isLoading: false,
    error: "",
    isLoggedIn: localStorage.getItem("userId") === null ? false : true,
    user: {},
    token:localStorage.getItem("userId") ?? "",
    allUsers: [],
    userProfileDetails: {},
    getUsersStatus: "idle",
    getCurrentUserStatus:"idle",
}

export const SignUpUser = createAsyncThunk(
    "auth/SignUpUser",
    async ({ firstName, lastName, userName, email, password, profileImg }, { rejectWithValue }) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", user.uid), {
                firstName,
                lastName,
                fullName: firstName + " " + lastName,
                userName,
                email,
                bio: "",
                website: "",
                followers: [],
                following: [],
                id: user.uid,
                profileImg: (profileImg || "https://res.cloudinary.com/dgomw715r/image/upload/v1654585086/ProjectImages/avatar2_cpccbi.png"),
            });
            localStorage.setItem("userId", user.uid);
            return user.uid;

        } catch (error) {
            return rejectWithValue(error.code);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
        try {
            const data = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, "users", data.user.uid));
            localStorage.setItem("userId", userDoc.data().id);
            return userDoc.data();
        } catch (error) {
            return rejectWithValue(error.code);
        }
    }
)

export const getAllUsers=createAsyncThunk(
    "auth/getAllUsers",async(_, { rejectWithValue })=>{
        try {
            const q = query(collection(db, "users"));
            const querySnapshot = await getDocs(q);
             const users= querySnapshot.docs.map(doc =>({
              ...doc.data(),
              id:doc.id
            }));
            return users;
          } catch (error) {
            return rejectWithValue(error.code);
          }
        } 
)

export const getUserData = createAsyncThunk(
    "auth/getUserData",
    async (_, { rejectWithValue }) => {
      try {
        const UserId = localStorage.getItem("userId");
        if (UserId) {
          const userRef = await getDoc(doc(db, "users", UserId));
          return userRef.data();
        } else {
          return false;
        }
      } catch (error) {
        return rejectWithValue(error.code);
      }
    }
  );

  export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (userData, {rejectWithValue}) => {
      const currentUserId=localStorage.getItem("userId");
      try {
        const userRef = doc(db, "users", currentUserId);
        await updateDoc(userRef,userData);
        const updatedUser = await getDoc(userRef);
        return updatedUser.data();
      } catch (error) {
        return rejectWithValue(error.code);
      }
    }
  );

  export const followUser = createAsyncThunk(
    "auth/followUser",
    async ({followuserId,currentUserId},{rejectWithValue}) => {
      try {
        const userRef = doc(db, "users", currentUserId);
        await updateDoc(userRef, {
          following: arrayUnion(followuserId),
        });
        const followerUserRef = doc(db, "users", followuserId);
        await updateDoc(followerUserRef, {
          followers: arrayUnion(currentUserId),
        });
        return { followuserId, userId: currentUserId };
      } catch (error) {
        return rejectWithValue(error.code);
      }
    }
  );
  export const unfollowUser = createAsyncThunk(
    "auth/unfollowUser",
    async ({followuserId,currentUserId},{rejectWithValue}) => {
      try {
        const userDataRef = doc(db, "users", currentUserId);
         await updateDoc(userDataRef, {
          following: arrayRemove(followuserId),
        });
        const followerUserRef = doc(db, "users", followuserId);
        await updateDoc(followerUserRef, {
          followers: arrayRemove(currentUserId),
        });
        return { followuserId, userId: currentUserId };
      } catch (error) {
        return rejectWithValue(error.code);
      }
    }
  );
  
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            localStorage.removeItem("userId");
            state.allUsers = [];
            state.token="";
            state.userProfileDetails = {}

        }
    }, extraReducers: {
        [SignUpUser.pending]: (state, action) => {
            state.authStatus = "loading";
            state.isLoading = true;
            state.error = "";
            toastId = toast.loading("creating account...");

        },
        [SignUpUser.fulfilled]: (state, action) => {
            state.authStatus = "Success";
            state.isLoading = false;
            state.isUserLoggedIn = true;
            state.token=action.payload;
            toast.success("Account created successfully", {
                id: toastId,
            });
        },
        [SignUpUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.authStatus = "failed";
            state.error = action.payload;
            toast.error("Some error occured in Signup. Try Again:(", {
                id: toastId,
            });

        },
        [loginUser.pending]: (state, action) => {
            state.authStatus = "loading";
            state.isLoading = true;
            state.error = "";
            toastId = toast.loading("logging in...");

        },
        [loginUser.fulfilled]: (state, action) => {
            state.authStatus = "success";
            state.isLoading = false;
            state.isUserLoggedIn = true;
            state.token=action.payload.id;
            state.user = action.payload;
            toast.success(`Hello, ${state.user.firstName}. Welcome back!`, {
                id: toastId,
                icon: "👋",
            });
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false;
            state.authStatus = "failed";
            state.error = action.payload;
            toast.error("Some error occured in login. Try Again:(", {
                id: toastId,
            });

        },
        
        [getAllUsers.pending]: (state, action) => {
            state.getUsersStatus="loading";
        },

        [getAllUsers.fulfilled]: (state, action) => {
            state.getUsersStatus="success";
            state.allUsers = action.payload;
        },
        [getAllUsers.rejected]: (state, action) => {
            state.getUsersStatus="failed";
            state.error = action.payload;
        },
        [updateUser.pending]: (state, action) => {
          state.error ="";
      },

      [updateUser.fulfilled]: (state, action) => {
          state.user = action.payload;
          state.allUsers=state.allUsers.map((user)=>user.id===action.payload.id?action.payload:user);
      },
      [updateUser.rejected]: (state, action) => {
          state.error = action.payload;
      },
        [getUserData.pending]: (state) => {
            state.getCurrentUserStatus="pending";
        },

        [getUserData.fulfilled]: (state, action) => {
            state.getCurrentUserStatus="success";
            if(action.payload){
                state.isLoggedIn=true;
              state.user={...action.payload}
            }else{
                state.isLoggedIn=false;
                state.user={};
            }
        },
        [getUserData.rejected]: (state, action) => {
            state.getCurrentUserStatus="failed",
            state.error = action.payload;
        },
        [followUser.pending]: (state) => {
            state.error="";
        },

        [followUser.fulfilled]: (state, action) => {
            state.user.following=state.user.following.concat(action.payload.followuserId);
            state.allUsers=state.allUsers.map((user)=>user.id===action.payload.userId?{...user,following:[...user.following,action.payload.followuserId]}:user);
            state.allUsers=state.allUsers.map((user)=>user.id===action.payload.followuserId?{...user,followers:[...user.followers,action.payload.userId]}:user);
        },
        [followUser.rejected]: (state, action) => {
            state.error = action.payload;
        },
        [unfollowUser.pending]: (state) => {
            state.error="";
        },

        [unfollowUser.fulfilled]: (state, action) => {
             state.user.following=state.user.following.filter((userId)=>userId!==action.payload.followuserId);
             state.allUsers=state.allUsers.map((user)=>user.id===action.payload.userId?{...user,following:user.following.filter((id)=>id!==action.payload.followuserId)}:user);
             state.allUsers=state.allUsers.map((user)=>user.id===action.payload.followuserId?{...user,followers:user.followers.filter((id)=>id!==action.payload.userId)}:user);
        },
        [unfollowUser.rejected]: (state, action) => {
            state.error = action.payload;
        },


    }
});

export const { logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;