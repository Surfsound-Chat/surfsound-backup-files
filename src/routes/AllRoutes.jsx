import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import { Login, Bookmark,Feed, Profile,Explore,Error404 } from "../pages/index";
import { ProtectedRoutes } from "./ProtectedRoutes";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mock" element={<Mockman />} />
      <Route path="/feed" element={
        <ProtectedRoutes>
          <Feed />
        </ProtectedRoutes>
      } />
      <Route path="/explore" element={
        <ProtectedRoutes>
          <Explore />
        </ProtectedRoutes>
      } />
      <Route path="/bookmark" element={
        <ProtectedRoutes>
          <Bookmark />
        </ProtectedRoutes>
      } />
      <Route path="/profile/:userId" element={
        <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      } />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  )
}