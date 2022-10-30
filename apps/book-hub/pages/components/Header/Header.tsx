import Link from 'next/link'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export const Header: React.FC = () => {
  const { data: session, status } = useSession()

  // eslint-disable-next-line no-console
  console.log(session, status)

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl text-primary">
          <span>Book</span>
          <span className="text-base-content">Hub</span>
        </Link>
        <Link href="/author" className="btn btn-ghost normal-case">
          <span>Author</span>
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered" />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src="https://placeimg.com/80/80/people" alt="avatar" width={40} height={40} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/api/auth/signin">
                <span>Log in</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
