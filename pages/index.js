import Head from 'next/head';
import { useEffect, useState } from 'react';

const ResData = (props) => {
  const { residents } = props;
  const [residentsFullData, setResidentsFullData] = useState(null);

  async function fetchAllResidentsData() {
    const allResidentsIds = residents.map((resident) => {
      return resident.split('/')[5];
    });

    const string = allResidentsIds.join(',');

    // We shouldn't send a request for 0 residents
    if (allResidentsIds.length === 0) {
      setResidentsFullData([]);
    } else {
      const characterReq = await fetch(
        `${baseUrl}/character/${allResidentsIds.join(',')}`,
      );
      const allCharactersData = await characterReq.json();

      if (Array.isArray(allCharactersData)) {
        // If we requested multiple characters the data is an array
        setResidentsFullData(allCharactersData);
      } else {
        // If we requested only one character the data returned from the server is not an array
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
          console.log('data', data);
          const { id, name, image, status } = data;
          return (
            <li className="m-auto border p-2 m-2 rounded" key={id}>
              <img className="m-auto" src={image} alt={name} />
              <h3 className="flex justify-center">{name}</h3>
              <p className="flex justify-center">{status}</p>
            </li>
          );
        })
      ) : (
        <>Loading...</>
      )}
    </ul>
  );
};

export default function NickandMorty({ locJson, baseUrl }) {
  const { results } = locJson;
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
      <div>
        <ul className="grid grid-cols-3 gap-4 m-auto w-3/4 pt-16 pb-16 ">
          {locations.map((loc) => {
            const { id, name, type, residents } = loc;
            return (
              <>
                <span key={id} className="border-2 p-3">
                  <li className="flex justify-center">Planet Name: {name} </li>
                  <li className="flex justify-center">Planet Type:{type}</li>
                  <ResData residents={residents} />
                </span>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}

const baseUrl = 'https://rickandmortyapi.com/api';

export async function getServerSideProps(context) {
  const locChar = await fetch(`${baseUrl}/location`);
  const locJson = await locChar.json();

  return {
    props: { locJson, baseUrl },
  };
}
