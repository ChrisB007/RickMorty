import Head from 'next/head';
import Link from 'next/link';

export default function NickandMorty({ CharJson }) {
  console.log(CharJson);
  const { name, image, status, species, origin, location, gender } = CharJson;
  console.log(origin);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Got submitted');
  };

  return (
    <>
      <Head>
        <title>Nick and Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center ">
        <div>
          <Link href={`/`}>
            <a>
              <h1 className="flex justify-center text-center text-7xl font-extrabold mt-3">
                Nick and Morty
              </h1>
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="flex justify-center text-2xl">Resident Details</h2>
        {<img className="m-auto" src={image} alt={name} />}
        <h3 className="flex justify-center">Name: {name}</h3>
        <p className="flex justify-center">Status: {status}</p>
        <p className="flex justify-center">Species: {species}</p>
        <p className="flex justify-center">Origin: {origin.name}</p>
        <p className="flex justify-center">Location: {location.name}</p>
        <p className="flex justify-center"> Gender: {gender} </p>
      </div>
      <form onSubmit={handleSubmit} className="relative w-2/5 m-auto pt-3">
        <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500">
          <label htmlFor="comment" className="sr-only">
            Add your note about this character
          </label>
          <textarea
            rows={3}
            name="comment"
            id="comment"
            className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm p-4"
            placeholder="Add your note about this character..."
            defaultValue={''}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
}

const baseUrl = 'https://rickandmortyapi.com/api';

export async function getServerSideProps({ query }) {
  const { id } = query;
  const Char = await fetch(`${baseUrl}/character/${id}`);
  const CharJson = await Char.json();

  return {
    props: { CharJson },
  };
}
