import Link from 'next/link'
import { BLOG_OWNER_ID } from '../lib/constants'
const ProfileImg = '/assets/blog/authors/FIRE.jpeg'

const Avatar = () => {
    return (
        <div className="flex items-center">
            <img src={ProfileImg} className="w-12 h-12 rounded-full mr-4" />
            <Link href="https://github.com/codeKiuk">
                <div className="text-xl font-bold">
                    <a style={{ color: 'black' }}>{BLOG_OWNER_ID}</a>
                </div>
            </Link>
        </div>
    )
}

export default Avatar
