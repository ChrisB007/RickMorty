import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ResData = (props) => {
  const { residents } = props;
  const [residentsFullData, setResidentsFullData] = useState(null);

  async function fetchAllResidentsData() {
    // Getting all residents ID's
    const allResidentsIds = residents.map((resident) => {
      return resident.split('/')[5];
    });

    // Shouldn't send a request for 0 residents
    if (allResidentsIds.length === 0) {
      setResidentsFullData([]);
    } else {
      const characterReq = await fetch(
        `${baseUrl}/character/${allResidentsIds.join(',')}`,
      );

      const allCharactersData = await characterReq.json();

      // If characters data is an array
      if (Array.isArray(allCharactersData)) {
        // If character's location.url is EQUAL to the url of the current location push character to residentsFullData array
        setResidentsFullData(allCharactersData);
      } else {
        // If requesting only one character and the data returned from the server is not an array
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
          const { url } = data.location;
          return (
            <>
              <div>
                <Link href={`/resident/${id}`} key={id}>
                  <a>
                    <li className="m-auto border p-2 m-2 rounded" key={id}>
                      <img className="m-auto" src={image} alt={name} />
                      <h3 className="flex justify-center">{name}</h3>
                      <p className="flex justify-center">{status}</p>
                    </li>
                  </a>
                </Link>
              </div>
            </>
          );
        })
      ) : (
        <>Loading...</>
      )}
    </ul>
  );
};

export default function Locations({ locationByIdData }) {
  const [locationId, setLocationId] = useState([locationByIdData]);

  return (
    <>
      <Head>
        <title>Rick and Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center ">
        <Link href={`/`}>
          <a>
            <div>
              <h1 className="flex justify-center text-center text-7xl font-extrabold mt-3">
                Rick and Morty
              </h1>
            </div>
          </a>
        </Link>
      </div>
      <div className="flex flex-row">
        {locationId.map((result) => (
          <ResData key={result.id} residents={result.residents} />
        ))}
      </div>
    </>
  );
}

const baseUrl = 'https://rickandmortyapi.com/api';

export async function getServerSideProps({ query }) {
  const { id } = query;
  const characters = await fetch(`${baseUrl}/character`);
  const characterData = await characters.json();
  const locations = await fetch(`${baseUrl}/location`);
  const locationData = await locations.json();
  const locationById = await fetch(`${baseUrl}/location/${id}`);
  const locationByIdData = await locationById.json();

  return {
    props: { locationData, characterData, locationByIdData },
  };
}
