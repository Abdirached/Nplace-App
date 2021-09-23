import Navbar from "../components/Navbar";
import CountryPost from "../components/post/countrypost/Index";
import Sidebar from "../components/Sidebar";
export default function HomeCountry() {
  return (
    <>
      <Navbar />
      <div className="relative sm:grid sm:grid-cols-4">
        <div className=" sm:h-full sm:fixed sm:w-3/5 md:w-full">
          <Sidebar />
        </div>
        <CountryPost />
      </div>
    </>
  );
}
