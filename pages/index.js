import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('../components/Navbar'));

export default function Home() {

  return (
    <>
      <Navbar/>
    </>
  )
}
