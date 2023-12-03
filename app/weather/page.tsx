import Header from "../Header"
import Clock from "../components/Clock/Clock"
import Weather from "./Weather"

const weatherApi = process.env.NEXT_PUBLIC_WEATHER_API
export default async function Page(){

  return(
    <>
      <main className="min-h-screen bg-cover bg-no-repeat bg-left-top bg-[url('../public/img/background.jpg')]">
        <Header />
        <div className="grid grid-cols-2 h-full relative">
          <div className="relative -bottom-[38rem] -left-9">
            <Clock />
          </div>
          <div className="flex justify-center items-center text-white font-semibold text-xl text-shadow mt-20">
            <Weather />
          </div>
        </div>
      </main>
    </>
  )
}