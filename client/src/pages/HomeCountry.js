import Navbar from "../components/Navbar";
import CountryPost from "../components/post/countrypost/Index";
import Sidebar from "../components/Sidebar";
export default function HomeCountry() {
  return (
    <>
      <Navbar />
      <div className="relative w-full h-full flex bg-white">
        <CountryPost />
        <div
          className=" h-full fixed left-2/3 hidden md:inline-block"
          style={{ width: "32%" }}
        >
          <Sidebar />
        </div>
      </div>
    </>
  );
}
