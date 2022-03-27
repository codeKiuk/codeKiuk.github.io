import Link from 'next/link'
import { BLOG_OWNER } from '../lib/constants'

const Header = () => {
    return (
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
            <Link href="/">
                <a className="hover:underline">{BLOG_OWNER}</a>
            </Link>
            .
        </h2>
    )
}

export default Header
