import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import UseUser from "../hooks/UseUser";
import Navbar from "../components/Navbar";
export default function Profile() {
  const { currentUser } = UseUser();
  const currentUserInfo = useSelector((state) => state.user);
  console.log(currentUserInfo);
  return (
    <>
      <Navbar />
      <div className="h-screen relative top-2 sm:grid sm:grid-cols-3 md:grid-cols-4">
        <div className="w-full flex sm:flex-col sm:relative sm:top-8">
          <div className="ml-4 w-36 sm:flex sm:justify-center lg:w-4/5 sm:w-full">
            {currentUserInfo.user ? (
              <img
                className="rounded-full h-24 w-24 object-fill sm:h-32 sm:w-32"
                alt={`${currentUserInfo.user.firstName} profile`}
                src={currentUserInfo.user.avatar}
              />
            ) : (
              <Skeleton circle height={150} width={150} count={1} />
            )}
          </div>
          <div className="ml-3 flex flex-col w-full">
            <div className="relative flex top-4 sm:top-4 sm:justify-center lg:w-4/5 sm:w-full">
              <p className="text-xl font-bold">
                {currentUserInfo.user?.firstName}
              </p>
              <p className="text-xl font-bold ml-1">
                {currentUserInfo.user?.lastName}
              </p>
            </div>
            <div className="flex relative top-7 sm:top-8 w-20  sm:justify-center lg:w-4/5 sm:w-full">
              <button
                type="submit"
                className="bg-blue-medium text-white w-full rounded h-8 font-bold sm:w-20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="relative top-8 flex-col sm:col-span-2 md:col-span-3">
          <h2 className="font-bold p-4">Market Contributions</h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {!currentUserInfo.posts
              ? new Array(3)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} width={300} height={50} />)
              : currentUserInfo.posts.length > 0
              ? currentUserInfo.posts.map((post) => (
                  <div
                    key={post.postId}
                    className="relative w-full flex justify-center"
                  >
                    <audio controls src={post.video} className="bg-gray-100" />
                  </div>
                ))
              : null}
          </div>
          {currentUserInfo.posts?.length === 0 && (
            <p className="text-center text-2xl">No Posts Yet</p>
          )}
        </div>
      </div>
    </>
  );
}
