import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Locations({ locData, imageData }) {
  const { results } = locData;
  console.log(Array.isArray(imageData.results));
  return (
    <>
      <Head>
        <title>Rick and Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center ">
        <div>
          <h1 className="flex justify-center text-center text-7xl font-extrabold mt-3">
            Rick and Morty
          </h1>
        </div>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6"
      >
        {results.map((result) => {
          return (
            <li
              key={result.id}
              className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="flex-1 flex flex-col p-8">
                <Link href={`/location/${result.id}`}>
                  <a>
                    <h3 className="mt-6 text-gray-900 text-5xl font-medium">
                      {result.name}
                    </h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                      <dt className="sr-only">Title</dt>
                      <dd className="text-gray-500 text-sm">{result.title}</dd>
                      <dt className="sr-only">Role</dt>
                      <dd className="mt-3">
                        <span className="px-2 py-1 text-gray-800 text-xs font-medium bg-gray-100 rounded-full">
                          {result.type}
                        </span>
                      </dd>
                    </dl>
                  </a>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const baseUrl = 'https://rickandmortyapi.com/api';

export async function getServerSideProps({ query }) {
  const { id } = query;
  const locChar = await fetch(`${baseUrl}/location/${id}`);
  const locJson = await locChar.json();
  const location = await fetch(`${baseUrl}/location`);
  const locData = await location.json();
  const charData = await fetch(`${baseUrl}/character`);
  const imageData = await charData.json();

  return {
    props: { locJson, locData, imageData },
  };
}
