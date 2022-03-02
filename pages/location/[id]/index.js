import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ResData = (props) => {
  const { residents, locUrl } = props;
  const [residentsFullData, setResidentsFullData] = useState(null);

  async function fetchAllResidentsData() {
    const allResidentsIds = residents.map((resident) => {
      return resident.split('/')[5];
    });

    // We shouldn't send a request for 0 residents
    if (allResidentsIds.length === 0) {
      setResidentsFullData([]);
    } else {
      const characterReq = await fetch(
        `${baseUrl}/character/${allResidentsIds.join(',')}`,
      );

      const allCharactersData = await characterReq.json();

      // If characters data is an array
      if (Array.isArray(allCharactersData)) {
        // Filter through allCharactersData array
        allCharactersData.filter((character) => {
          const { url } = character.location;
          //     If character's location.url is EQUAL to the url of the current location
          url === locUrl ? setResidentsFullData(allCharactersData) : null;
        });
      } else {
        // If requesting only one character the data returned from the server is not an array
        setResidentsFullData([allCharactersData]);
      }
    }
  }

  useEffect(() => {
    fetchAllResidentsData();
  }, []);

  return (
    <ul>
      {residentsFullData ? (
        residentsFullData.map((data) => {
          const { id, name, image, status } = data;
          return (
            <Link href={`/resident/${id}`} key={id}>
              <a>
                <li className="m-auto border p-2 m-2 rounded" key={id}>
                  <img className="m-auto" src={image} alt={name} />
                  <h3 className="flex justify-center">{name}</h3>
                  <p className="flex justify-center">{status}</p>
                </li>
              </a>
            </Link>
          );
        })
      ) : (
        <>Loading...</>
      )}
    </ul>
  );
};

export default function Locations({ locationData }) {
  const { results } = locationData;

  const [locations, setLocations] = useState(results);
  return (
    <>
      <Head>
        <title>Nick and Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center ">
        <div>
          <h1 className="flex justify-center text-center text-7xl font-extrabold mt-3">
            Nick and Morty
          </h1>
        </div>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6"
      >
        {locations.map((result) => {
          const { id, url, name, residents } = result;
          return (
            <>
              <li
                key={id}
                className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
              >
                <div className="flex-1 flex flex-col p-8">
                  <h3>{name}</h3>
                  <ResData
                    className="h-auto"
                    residents={residents}
                    locUrl={url}
                  />
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

const baseUrl = 'https://rickandmortyapi.com/api';

export async function getServerSideProps({ query }) {
  const { id } = query;
  const singleChar = await fetch(`${baseUrl}/character/${id}`);
  const characterJson = await singleChar.json();
  const characters = await fetch(`${baseUrl}/character`);
  const characterData = await characters.json();
  const locations = await fetch(`${baseUrl}/location`);
  const locationData = await locations.json();

  return {
    props: { locationData, characterData },
  };
}
