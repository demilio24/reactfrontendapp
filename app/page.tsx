import { getTomorrowDate } from "@/utils/tomorrowDate";
import Header from "./Header";
import SuntrackTable from "./components/SuntrackTable/SuntrackTable";
import SuntrackTableNavigator from "./components/SuntrackTable/SuntrackTableClient";
import { locationData } from "./locationData";
import { LocationResponse } from "./typings";
import { redirect } from "next/navigation";
import Clock from "./components/Clock/Clock";

type Props = {
  searchParams?: { id: number };
};

export default async function Home({ searchParams }: Props) {
  if (!searchParams?.id) {
    return (
      <main className="min-h-screen bg-cover bg-no-repeat bg-left-top bg-[url('../public/img/background.jpg')]">
        <Header />
        <div className="grid grid-cols-2 h-full relative">
          <div className="relative -bottom-[38rem] -left-9">
            <Clock />
          </div>
          <div className="flex flex-col justify-center items-center w-5/6 relative -right-10 mt-20 p-4 bg-opacity-25 rounded-lg border border-gray-400 bg-gray-500 text-stone-300 font-semibold">
            <SuntrackTableNavigator />
          </div>
        </div>
      </main>
    );
  }
  const location = locationData.find(
    (location) =>{
      return location.id == searchParams.id
    }
  );
  if(!location){
    redirect("/");
  }

  return (
    <>
      <main className="min-h-screen bg-cover bg-no-repeat bg-left-top bg-[url('../public/img/background.jpg')]">
        <Header />
        <div className="grid grid-cols-2 h-full relative">
          <div className="relative -bottom-[38rem] -left-9">
            <Clock />
          </div>
          <div className="flex flex-col justify-center items-center w-5/6 relative -right-10 mt-20 p-4 bg-opacity-25 rounded-lg border border-gray-400 bg-gray-500 text-stone-300 font-semibold">
            <SuntrackTable location={location} />
          </div>
        </div>
      </main>
    </>
  );
}
