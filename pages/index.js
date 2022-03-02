import Head from 'next/head';
import Link from 'next/link';

export default function Locations({ locData }) {
  const { results } = locData;
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
        {results.map((result) => (
          <li
            key={result.id}
            className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="flex-1 flex flex-col p-8">
              <Link href={`/location/${result.id}`}>
                <a>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-32 w-32 mx-auto rounded-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-6 text-gray-900 text-sm font-medium">
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
        ))}
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

  return {
    props: { locJson, locData },
  };
}
