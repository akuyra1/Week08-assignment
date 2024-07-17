import headerStyles from '@/app/ComponentStyles/Header.css'
import Link from 'next/link'

export default function Header(props) {
 


  return (

    <>
        <div className='header-links'>

            <Link href="/">Home</Link>
            <Link href="/posts/1">Post</Link>
            <Link href="/posts/1/1">All Posts</Link>
        </div>


    </>
  )
}
