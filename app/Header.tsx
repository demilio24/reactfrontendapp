import { locationData } from "./locationData";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun } from "@fortawesome/free-solid-svg-icons";

export default function Header(){

  return(
    <>
      <header className="flex justify-between items-center bg-black bg-opacity-30">
        <div className="flex items-center gap-2">
          
            <h1 className="text-5xl text-neutral-300 p-5"><Link href={"/"}>Emilio Arias</Link></h1>
          
          <Link href={"/weather"}><FontAwesomeIcon icon={faCloudSun} size="2x" className="text-white" /></Link>
        </div>
        <ul className="flex font-bold text-white pt-6 pr-12 justify-center gap-1 text-lg">
          {locationData.map((loc, index) => {
            return (
              <>
                  <li key={index}><Link href={`/?id=${loc.id}`}>{loc.cityName}</Link></li>
                  <span key={index}
                    className={index >= locationData.length - 1 ? "hidden" : ""}
                  >
                    {"|"}
                  </span>
              </>
            );
          })}
        </ul>
      </header>
    </>
  )

}